import type { LessonInput } from "@/lib/content/types";

/**
 * Career and Group Discussion Preparation.
 *
 * A placement-readiness course covering professional communication, resume
 * fundamentals, personal introductions, group discussion technique, and
 * interview preparation. None of this course's subject matter is code --
 * every exercise instead models a real, structural, rule-based check about
 * communication technique as a small deterministic JavaScript function
 * (does a STAR answer have all four fields filled in, does a resume bullet
 * start with an approved action verb and include a number, does a GD
 * contribution acknowledge the prior speaker before disagreeing), the same
 * pattern this platform's PostgreSQL course uses for non-code decisions
 * (see content/lessons/postgresql.ts's simulateLostUpdate). No exercise or
 * quiz on this platform proctors, scores, or certifies a learner's real
 * communication skill, personality, or employability -- every check verifies
 * concrete, visible, rule-based structural criteria the learner can read for
 * themselves, framed honestly as self-practice.
 */
export const careerAndGdPreparationLessons: LessonInput[] = [
  {
    id: "cgd-professional-communication-basics",
    slug: "professional-communication-basics",
    title: "Professional Communication Basics",
    description:
      "How tone, clarity, and conciseness separate professional written communication from casual messaging.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 0,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: [],
    objectives: [
      "Distinguish casual register from professional register in a written message",
      "Rewrite a wordy or hedging sentence into a concise, direct one",
      "Identify the structural parts of a professional email and why each one matters",
    ],
    skills: ["career-readiness", "professional-tone"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["professional tone", "email etiquette", "clarity", "conciseness", "register"],
    explanation: `Every message you send at work carries two layers of meaning: what you say, and how you say it. That second layer is **register** — the level of formality your words and tone convey. The same request can sound completely different depending on register: "hey can u send me that file asap thx" and "Hi Priya, could you please send me the file by end of day? Thank you." ask for exactly the same thing, but only one of them reads as professional.

Professional register isn't about sounding stiff or using big words. It's about three habits: **clarity**, **conciseness**, and **appropriate tone**.

- **Clarity** means the reader can understand your request on the first read, without guessing. State what you need, and by when, directly.
- **Conciseness** means you say it in as few words as the message actually needs — no padding, no repeating the same point three different ways, no long windups before you get to the point.
- **Appropriate tone** means matching the formality of your audience and channel. A message to a hiring manager, a professor, or a client should not use texting shorthand ("u", "asap", "thx"), should not be typed in all lowercase or ALL CAPS, and should not rely on slang.

A useful mental model is the casual-to-professional slider. Casual language is built for speed between people who already share context — friends texting, or a group chat. Professional language is built to be understood correctly by someone who may not share your context, and who may be judging your competence partly by how clearly you communicate. Slang, heavy abbreviation, and unclear pronouns ("send me that thing") all cost the reader time and can read as careless.

Most professional written messages, especially emails, share a predictable shape:

- A **greeting** that names the recipient ("Hi Dr. Alvarez," rather than "Hey,")
- A **body** that states the purpose in the first sentence or two
- A **closing** ("Thank you," "Best regards,") followed by your name

Skipping any of these pieces doesn't just look informal — it can genuinely confuse the reader about who you are, what you want, or whether the message is even finished. A one-line message with no greeting and no sign-off can read as curt even when that isn't the intent, simply because the reader has no structural cues about your tone.

None of this means professional communication has to be cold. You can be warm, even a little informal, in tone while still being clear, structured, and respectful of the reader's time — the two are not opposites. The skill this lesson builds is recognizing the concrete, checkable habits (a proper greeting, a clear direct request, no slang, no shouting in all caps) that separate a message a professional reader can act on quickly from one that makes them do extra work to understand what you're actually asking for.`,
    visual: {
      kind: "table",
      title: "Anatomy of a professional email",
      description:
        "Greeting (names the recipient) leads to Body (states the purpose in the first sentence) leads to Closing (a sign-off phrase) leads to Name — removing any part makes the message harder for the reader to parse quickly.",
    },
    example: {
      language: "javascript",
      description:
        "Checks whether a message's opening line avoids a set of casual greeting openers before treating it as professional in tone.",
      code: `function hasProfessionalGreeting(greeting) {
  if (typeof greeting !== "string") return false;
  const trimmed = greeting.trim();
  if (trimmed.length === 0) return false;
  const casualOpeners = ["hey", "yo", "sup", "hiya"];
  const firstWord = trimmed.split(/\\s+/)[0].toLowerCase().replace(/[^a-z]/g, "");
  return !casualOpeners.includes(firstWord);
}
// Example: hasProfessionalGreeting("Hey Sam,") -> false`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-1-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isConciseProfessionalSentence(sentence) that returns true only if the sentence (a string) is professional-register-appropriate by two rules: (1) it contains 20 words or fewer, and (2) it does not contain any of these filler/hedging phrases, checked case-insensitively: 'just wanted to', 'sort of', 'kind of', 'i guess', 'no big deal'. Return false for an empty or whitespace-only string, and false if either rule is violated.",
      starterCode: `function isConciseProfessionalSentence(sentence) {
  // TODO: return false for an empty or whitespace-only string
  // TODO: return false if the sentence has more than 20 words
  // TODO: return false if the sentence contains any filler phrase from the list (case-insensitive)
  // TODO: otherwise return true
}
`,
      solutionCode: `function isConciseProfessionalSentence(sentence) {
  if (typeof sentence !== "string" || sentence.trim().length === 0) return false;
  const words = sentence.trim().split(/\\s+/);
  if (words.length > 20) return false;
  const fillerPhrases = ["just wanted to", "sort of", "kind of", "i guess", "no big deal"];
  const lower = sentence.toLowerCase();
  for (const phrase of fillerPhrases) {
    if (lower.includes(phrase)) return false;
  }
  return true;
}`,
      harness: `
        try { window.__report('t1', isConciseProfessionalSentence("Could you send the report by Friday?") === true, 'a short, direct sentence with no filler should return true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isConciseProfessionalSentence("I just wanted to sort of ask if maybe you could kind of possibly send the report sometime whenever you get a chance no rush at all really") === false, 'a long sentence full of filler phrases should return false'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isConciseProfessionalSentence("   ") === false, 'a whitespace-only string should return false'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Accepts a short, clear sentence with no filler", hidden: false },
        {
          id: "t2",
          description: "Rejects a sentence that's too long and full of filler phrases",
          hidden: false,
        },
        { id: "t3", description: "Rejects a whitespace-only string", hidden: true },
      ],
      hints: [
        "Start by handling the edge case: trim the string and check whether anything real is left.",
        "Split the trimmed sentence on whitespace to count words, and compare that count to the 20-word limit.",
        "For the filler-phrase check, lowercase the whole sentence once, then check whether it includes each banned phrase as a substring.",
        "If either check fails, return false immediately; only return true once both checks have passed.",
      ],
    },
    independentExercise: {
      id: "cgd-1-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write passesToneCheck(message) where message is an object { greeting: string, body: string }. Return true only if all of these hold: (1) body is non-empty after trimming; (2) greeting's first word (case-insensitive, punctuation stripped) is not one of 'hey', 'yo', 'sup'; (3) body does not contain the substring '!!'; (4) body is not written entirely in uppercase letters (ignoring non-letter characters) when body contains more than 3 letters. Return false if any rule is violated.",
      starterCode: `function passesToneCheck(message) {
  // TODO: fail if body is empty/whitespace-only
  // TODO: fail if greeting's first word (lowercased, punctuation stripped) is 'hey', 'yo', or 'sup'
  // TODO: fail if body contains '!!'
  // TODO: fail if body has more than 3 letters and is entirely uppercase letters
  // TODO: otherwise return true
}
`,
      solutionCode: `function passesToneCheck(message) {
  const greeting = message.greeting;
  const body = message.body;
  if (typeof body !== "string" || body.trim().length === 0) return false;

  const casualOpeners = ["hey", "yo", "sup"];
  const firstWord =
    typeof greeting === "string"
      ? greeting.trim().split(/\\s+/)[0].toLowerCase().replace(/[^a-z]/g, "")
      : "";
  if (casualOpeners.includes(firstWord)) return false;

  if (body.includes("!!")) return false;

  const lettersOnly = body.replace(/[^a-zA-Z]/g, "");
  if (lettersOnly.length > 3 && lettersOnly === lettersOnly.toUpperCase()) return false;

  return true;
}`,
      harness: `
        try { window.__report('t1', passesToneCheck({ greeting: "Hello Dr. Kim,", body: "Please find the attached report." }) === true, 'a proper greeting and calm body should pass'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', passesToneCheck({ greeting: "Hey,", body: "Please find the attached report." }) === false, 'a casual greeting opener should fail the check'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', passesToneCheck({ greeting: "Hello Dr. Kim,", body: "PLEASE SEND THIS NOW!!" }) === false, 'a shouted, double-punctuated body should fail the check'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', passesToneCheck({ greeting: "Hello,", body: "" }) === false, 'an empty body should fail the check even with a fine greeting'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Accepts a properly greeted, calm message", hidden: false },
        { id: "t2", description: "Rejects a casual greeting opener", hidden: false },
        { id: "t3", description: "Rejects a shouted, double-punctuated body", hidden: false },
        {
          id: "t4",
          description: "Rejects an empty body even with an otherwise fine greeting",
          hidden: true,
        },
      ],
      hints: [
        "Handle the body-emptiness check first, since nothing else matters if there's no real body text.",
        "For the greeting check, isolate just the first word, lowercase it, and strip out any punctuation before comparing it to the casual-openers list.",
        "For the shouting check, strip out everything except letters first, so punctuation and spaces don't interfere with the uppercase comparison.",
        "Treat each rule as an independent guard clause that returns false on its own; only reach the final 'true' once none of them have triggered.",
      ],
    },
    commonMistakes: [
      "Using the same casual tone in professional emails as in texting friends (e.g., 'hey', 'u', 'asap', no capitalization or punctuation).",
      "Writing overly long, hedging sentences that bury the actual request under filler phrases.",
      "Skipping a clear greeting or sign-off, which removes the structural cues a reader normally uses to judge tone.",
      "Confusing 'professional' with 'stiff or robotic' — professional tone can still be warm and direct at the same time.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Which version of a request best demonstrates professional register while asking for the same thing?",
        choices: [
          '"hey can u send me that file asap thx"',
          '"SEND ME THE FILE NOW"',
          '"Hi Priya, could you please send me the file by end of day? Thank you."',
          '"file? need it"',
        ],
        correctIndex: 2,
        explanation:
          "It states the request clearly, uses a proper greeting and closing, and avoids texting shorthand or shouting.",
      },
      {
        id: "q2",
        prompt: "What does 'conciseness' mean in professional writing?",
        choices: [
          "Using the fewest words the message actually needs, without padding or repetition",
          "Never using more than five words per sentence",
          "Avoiding all punctuation",
          "Writing only in bullet points",
        ],
        correctIndex: 0,
        explanation:
          "Conciseness is about cutting unnecessary padding and repetition, not an arbitrary word limit or format.",
      },
      {
        id: "q3",
        prompt:
          "A one-line professional message with no greeting and no sign-off is most likely to be perceived as what, even if that isn't the sender's intent?",
        choices: [
          "Efficient and welcome",
          "Curt, due to missing structural cues about tone",
          "Impossible to send",
          "Automatically flagged as spam",
        ],
        correctIndex: 1,
        explanation:
          "Missing structural cues like a greeting and closing removes signals the reader normally uses to judge tone, which can make a message read as abrupt.",
      },
    ],
    takeaway:
      "Professional communication is a set of learnable, concrete habits — clear requests, appropriate tone, and a complete greeting-body-closing structure — not an innate talent.",
    summary:
      "Professional register is built from clarity, conciseness, and appropriate tone, and shows up structurally in a proper greeting, a direct body, and a closing. Casual shorthand, shouting, and hedging filler all undercut a message's professionalism, regardless of how reasonable the underlying request is.",
    nextLessonSlug: "resume-fundamentals",
  },
  {
    id: "cgd-resume-fundamentals",
    slug: "resume-fundamentals",
    title: "Resume and Profile Fundamentals",
    description:
      "How to structure a resume and write achievement-oriented bullet points that quantify real results.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 1,
    difficulty: "beginner",
    estimatedMinutes: 20,
    prerequisites: ["cgd-professional-communication-basics"],
    objectives: [
      "Structure a resume into the standard sections employers expect, in order",
      "Write an achievement-oriented bullet point using action verb + task + quantifiable result",
      "Identify content that should be left off a resume",
    ],
    skills: ["career-readiness", "resume-bullets"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["resume", "bullet points", "action verbs", "quantified results", "resume sections"],
    explanation: `A resume has one job: let a busy reader understand, in under a minute, whether you're worth a longer conversation. That means structure matters as much as content. Most effective resumes follow a predictable section order:

- **Contact information** — name, email, phone, and a professional profile link if relevant. Kept short, at the top.
- **Summary** (optional but common) — two or three sentences positioning who you are and what you're aiming for.
- **Experience** — your work history, most recent first, each role described with achievement-oriented bullet points.
- **Education** — degree, institution, and graduation year (or expected year).
- **Skills** — a focused list of concrete, relevant skills, not a generic list of buzzwords.

The section that separates a forgettable resume from a strong one is Experience, and the unit that matters most there is the individual bullet point. A weak bullet describes a duty: "Responsible for handling customer complaints." A strong bullet describes an **achievement**, using a simple formula: **action verb + task + quantifiable result**. For example: "Resolved an average of 25 customer complaints per week, improving satisfaction scores by 15%." The second version tells the reader what you actually did, how much of it, and what changed because of it — three things the first version leaves out entirely.

Good action verbs are specific and active: "Led," "Built," "Reduced," "Automated," "Negotiated." Weak openers to avoid include "Responsible for," "Helped with," and "Worked on" — they describe an assignment, not an outcome, and they make every bullet on the page sound the same.

Quantifying a result doesn't always require a business metric. "Trained 4 new hires in their first month" or "Reduced page load time from 3.2 seconds to 1.1 seconds" both work because a number gives the reader a concrete sense of scale, something "helped improve performance" never can.

Equally important is knowing what to **leave out**. Resumes in most professional contexts should not include a photo, age, marital status, religion, or other personal characteristics unrelated to job qualifications — including them can invite bias and simply wastes limited space. Hobbies belong only if genuinely relevant or distinctive enough to spark a real conversation; a generic "reading, traveling" line rarely earns its place. Full home addresses are increasingly unnecessary; a city and a way to reach you is usually enough.

Formatting consistency matters more than people expect: mixing past and present tense across bullets, or switching bullet punctuation style halfway down the page, reads as carelessness even when the content itself is strong. Because a resume is often read for a matter of seconds before a decision to keep reading (or not) is made, every one of these structural choices is doing real work.`,
    visual: {
      kind: "table",
      title: "Standard resume section order",
      description:
        "Contact Information leads to Summary (optional) leads to Experience (achievement-oriented bullets, most recent first) leads to Education leads to Skills — matching this order helps a fast reader find what they're looking for.",
    },
    example: {
      language: "javascript",
      description:
        "Checks whether a resume bullet opens with an approved action verb and includes a quantified result.",
      code: `function bulletHasActionVerbAndNumber(bullet) {
  const actionVerbs = ["Led", "Built", "Reduced", "Increased", "Managed", "Designed", "Launched", "Resolved", "Automated", "Improved"];
  const firstWord = bullet.trim().split(/\\s+/)[0];
  const startsWithVerb = actionVerbs.includes(firstWord);
  const hasNumber = /\\d/.test(bullet);
  return startsWithVerb && hasNumber;
}
// Example: bulletHasActionVerbAndNumber("Reduced onboarding time by 30%") -> true`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-2-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isStrongBullet(bullet) that returns true only if: (1) bullet's first word exactly matches one of these approved action verbs: 'Led', 'Built', 'Designed', 'Reduced', 'Increased', 'Launched', 'Automated', 'Negotiated', 'Trained', 'Streamlined'; and (2) bullet contains at least one digit character. Return false otherwise, including for an empty string.",
      starterCode: `function isStrongBullet(bullet) {
  // TODO: return false for an empty/whitespace-only bullet
  // TODO: check that the first word is in the approved action verb list
  // TODO: check that the bullet contains at least one digit
  // TODO: return true only if both checks pass
}
`,
      solutionCode: `function isStrongBullet(bullet) {
  if (typeof bullet !== "string" || bullet.trim().length === 0) return false;
  const actionVerbs = [
    "Led", "Built", "Designed", "Reduced", "Increased",
    "Launched", "Automated", "Negotiated", "Trained", "Streamlined",
  ];
  const firstWord = bullet.trim().split(/\\s+/)[0];
  const startsWithApprovedVerb = actionVerbs.includes(firstWord);
  const hasDigit = /\\d/.test(bullet);
  return startsWithApprovedVerb && hasDigit;
}`,
      harness: `
        try { window.__report('t1', isStrongBullet("Led a team of 6 engineers to launch a new feature 2 weeks early") === true, 'an approved verb plus a digit should pass'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isStrongBullet("Responsible for managing the team") === false, 'an unapproved opener with no digit should fail'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isStrongBullet("Led the team") === false, 'an approved verb with no digit should still fail'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts an approved verb paired with a quantified result",
          hidden: false,
        },
        {
          id: "t2",
          description: "Rejects a weak opener like 'Responsible for' with no number",
          hidden: false,
        },
        {
          id: "t3",
          description: "Rejects an approved verb that's missing any quantifiable number",
          hidden: true,
        },
      ],
      hints: [
        "Split the bullet into words and compare only the first word against the approved list — exact match, since resume verbs are usually capitalized consistently.",
        "A digit check can be done with a simple regular expression that tests for any character 0-9 anywhere in the string.",
        "Both conditions need to be true at once — a great verb with no number, or a number with a weak verb, should each still fail.",
      ],
    },
    independentExercise: {
      id: "cgd-2-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write classifyResumeContent(itemType) that takes a string label and returns the resume section it belongs on. Use this mapping: 'job-title' and 'company-name' -> 'Experience'; 'degree' and 'graduation-year' -> 'Education'; 'programming-language' -> 'Skills'; 'email-address' and 'phone-number' -> 'Contact'. For 'marital-status', 'age', and 'photo', return the string 'omit' (these should not appear on a resume at all). For any other, unrecognized itemType, return null.",
      starterCode: `function classifyResumeContent(itemType) {
  // TODO: map known resume-appropriate item types to their section name
  // TODO: map known should-not-appear item types to 'omit'
  // TODO: return null for anything else
}
`,
      solutionCode: `function classifyResumeContent(itemType) {
  const sectionMap = {
    "job-title": "Experience",
    "company-name": "Experience",
    degree: "Education",
    "graduation-year": "Education",
    "programming-language": "Skills",
    "email-address": "Contact",
    "phone-number": "Contact",
  };
  const omitTypes = ["marital-status", "age", "photo"];

  if (sectionMap[itemType]) return sectionMap[itemType];
  if (omitTypes.includes(itemType)) return "omit";
  return null;
}`,
      harness: `
        try { window.__report('t1', classifyResumeContent("degree") === "Education", "degree should map to the Education section"); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', classifyResumeContent("marital-status") === "omit", "marital-status should be classified as omit"); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', classifyResumeContent("phone-number") === "Contact", "phone-number should map to the Contact section"); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
        try { window.__report('t4', classifyResumeContent("favorite-color") === null, 'an unrecognized item type should return null, not omit'); } catch (e) { window.__report('t4', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Maps 'degree' to the Education section", hidden: false },
        { id: "t2", description: "Classifies 'marital-status' as 'omit'", hidden: false },
        { id: "t3", description: "Maps 'phone-number' to the Contact section", hidden: false },
        { id: "t4", description: "Returns null for an unrecognized item type", hidden: true },
      ],
      hints: [
        "A plain object mapping known item-type strings to their section name handles most of this in one lookup.",
        "Keep the 'should not appear at all' item types in a separate list from the section mapping, since they return a different kind of value.",
        "Check the section mapping first, then the omit list, and only fall through to null if the item type matches neither.",
      ],
    },
    commonMistakes: [
      "Writing generic, duty-focused bullets ('Responsible for...') instead of achievement-focused ones with a concrete result.",
      "Leaving results unquantified ('helped improve performance') when a specific number would make the same claim far more concrete.",
      "Including irrelevant personal information (age, marital status, a photo) that most professional contexts don't expect on a resume.",
      "Mixing verb tense (past for old roles, present for the current one, inconsistently) or bullet punctuation style across the page.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Which bullet point best follows the action-verb-plus-quantifiable-result formula?",
        choices: [
          '"Responsible for handling customer complaints"',
          '"Helped with various support tasks"',
          '"Resolved an average of 25 customer complaints per week, improving satisfaction scores by 15%"',
          '"Worked on the support team"',
        ],
        correctIndex: 2,
        explanation:
          "It opens with a specific action verb, states the task, and quantifies the result — the other options describe a duty with no measurable outcome.",
      },
      {
        id: "q2",
        prompt:
          "Which of the following is generally appropriate to leave off a resume in most professional contexts?",
        choices: [
          "Job title and employer for each role",
          "A photo, age, or marital status",
          "Degree and graduation year",
          "Relevant technical skills",
        ],
        correctIndex: 1,
        explanation:
          "Personal characteristics unrelated to qualifications are typically left off resumes, since they can invite bias and don't help evaluate fit for the role.",
      },
      {
        id: "q3",
        prompt: "What is the main problem with opening a bullet point with 'Responsible for'?",
        choices: [
          "It's grammatically incorrect",
          "It describes an assignment rather than an outcome, making every bullet sound the same",
          "It's too short",
          "It cannot be used with quantified results",
        ],
        correctIndex: 1,
        explanation:
          "'Responsible for' describes a duty rather than what was actually achieved, which is why action-verb-plus-result bullets read as stronger.",
      },
    ],
    takeaway:
      "A resume's Experience section is judged bullet by bullet — action verb, specific task, quantified result — and every piece of unrelated personal information you leave out makes room for one that actually matters.",
    summary:
      "Resumes follow a predictable section order (Contact, Summary, Experience, Education, Skills), and the strongest section is Experience, built from achievement-oriented bullets using an action verb, a specific task, and a quantifiable result. Personal characteristics unrelated to qualifications are generally left off.",
    nextLessonSlug: "elevator-pitch",
  },
  {
    id: "cgd-elevator-pitch",
    slug: "elevator-pitch",
    title: "Crafting a Personal Introduction",
    description:
      "How to structure a concise self-introduction and adapt its length and emphasis to different contexts.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 2,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["cgd-resume-fundamentals"],
    objectives: [
      "Structure a self-introduction using the who / relevant background / goal framework",
      "Adapt the length of an introduction to a specific context",
      "Identify which component is missing from an incomplete self-introduction",
    ],
    skills: ["career-readiness", "elevator-pitch"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["elevator pitch", "self-introduction", "networking", "personal branding"],
    explanation: `A personal introduction — sometimes called an elevator pitch — answers one implicit question the listener always has: why should I keep listening? Whether you have thirty seconds at a networking event or two minutes opening an interview, a strong introduction follows the same three-part shape:

1. **Who you are** — your name and current role or status, stated plainly.
2. **Relevant background** — the one or two pieces of experience that matter for this listener, not your entire history.
3. **What you're looking for** — a clear, specific goal, so the listener knows what to do with the information you just gave them.

Here's a worked example for someone introducing themselves at a career fair: "Hi, I'm Dana — I've spent the last two years as a support engineer, where I got hands-on with debugging customer-reported issues and started picking up scripting to speed up repetitive fixes. I'm looking to move into a full-time software engineering role where I can build on that scripting experience." Notice the shape: a plain statement of who Dana is, background chosen specifically because it's relevant to a software engineering audience (not every detail of her job), and a specific, actionable goal.

A common mistake is treating the introduction as a fixed script to recite identically everywhere. The content of "who you are" barely changes, but the emphasis of your background and the length of the whole pitch should adapt to context. A thirty-second version at a crowded networking event should be tighter than a two-minute version opening a one-on-one interview, where the interviewer actually has time to hear more detail and likely wants it. Giving the career-fair-length pitch in an interview can come across as underprepared; giving the interview-length pitch to someone you just met in a hallway can lose their attention before you reach the point.

Length is not the only variable — relevance is too. The same person might lead with different background details depending on the room: emphasizing technical projects when talking to an engineering manager, and emphasizing communication or leadership examples when talking to a program manager. This isn't dishonesty; it's choosing which true things about yourself are most useful for this particular listener to know first.

A pitch that's missing any of the three components tends to fail in a specific, recognizable way. Missing "who you are" leaves the listener unsure whom they're talking to. Missing relevant background makes the goal sound unearned. Missing the goal is the most common gap — people often describe themselves at length and then simply stop, leaving the listener to guess what they should do next: introduce you to someone, keep you in mind for a role, or just make conversation.`,
    visual: {
      kind: "diagram",
      title: "Three-part introduction structure",
      description:
        "Who you are leads to Relevant background (chosen for this listener) leads to What you're looking for — shortened or lengthened as a whole depending on context, but rarely missing a part.",
    },
    example: {
      language: "javascript",
      description:
        "Checks whether a personal-introduction object has all three of its required parts filled in.",
      code: `function hasThreePitchComponents(pitch) {
  const fields = ["who", "background", "goal"];
  return fields.every((f) => typeof pitch[f] === "string" && pitch[f].trim().length > 0);
}
// Example: hasThreePitchComponents({ who: "I'm Dana, a data analyst.", background: "", goal: "Looking for a BI role." }) -> false`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-3-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isCompletePitch(pitch) where pitch is an object { who: string, background: string, goal: string }. Return true only if: (1) all three fields are non-empty after trimming; and (2) the combined word count across all three fields (splitting on whitespace) is between 15 and 90 words, inclusive. Return false otherwise.",
      starterCode: `function isCompletePitch(pitch) {
  // TODO: check that who, background, and goal are all present and non-empty
  // TODO: count the total words across all three fields combined
  // TODO: return true only if the total is between 15 and 90 words, inclusive
}
`,
      solutionCode: `function isCompletePitch(pitch) {
  const fields = ["who", "background", "goal"];
  for (const f of fields) {
    if (typeof pitch[f] !== "string" || pitch[f].trim().length === 0) return false;
  }
  const combined = fields.map((f) => pitch[f].trim()).join(" ");
  const wordCount = combined.split(/\\s+/).filter((w) => w.length > 0).length;
  return wordCount >= 15 && wordCount <= 90;
}`,
      harness: `
        try {
          const r1 = isCompletePitch({
            who: "I'm Dana, a data analyst.",
            background: "I've spent two years turning messy spreadsheets into dashboards leadership actually uses.",
            goal: "I'm looking for a data analyst role on a product team.",
          });
          window.__report('t1', r1 === true, 'a complete pitch with all three fields and a reasonable word count should return true');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r2 = isCompletePitch({
            who: "I'm Dana, a data analyst.",
            background: "I've spent two years turning messy spreadsheets into dashboards leadership actually uses.",
            goal: "",
          });
          window.__report('t2', r2 === false, 'a pitch missing the goal field should return false');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const longBackground = new Array(100).fill("word").join(" ");
          const r3 = isCompletePitch({ who: "I'm Dana.", background: longBackground, goal: "Looking for a role." });
          window.__report('t3', r3 === false, 'a pitch whose combined word count exceeds 90 words should return false');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts a complete pitch with a reasonable combined word count",
          hidden: false,
        },
        { id: "t2", description: "Rejects a pitch missing the goal field", hidden: false },
        {
          id: "t3",
          description: "Rejects a pitch that's far too long once all fields are combined",
          hidden: true,
        },
      ],
      hints: [
        "Check field presence first — if any of who/background/goal is missing or blank, you can return false immediately without counting words.",
        "Combine the three fields into one string (joined by spaces) before splitting on whitespace, so you're counting total words across all of them, not each field separately.",
        "Filter out any empty strings your split might produce (for example, from extra whitespace) before counting, so the word count is accurate.",
      ],
    },
    independentExercise: {
      id: "cgd-3-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write pitchFitsContext(pitch, context) where pitch is { who, background, goal } and context is one of the fixed strings 'elevator', 'networking-event', or 'interview-opening', each with its own target word-count range (using the same combined-word-count approach as before, inclusive on both ends): 'elevator' = 20-50 words, 'networking-event' = 30-75 words, 'interview-opening' = 50-120 words. Return true only if all three pitch fields are non-empty AND the combined word count falls within that context's range. Return false for an unrecognized context.",
      starterCode: `function pitchFitsContext(pitch, context) {
  // TODO: define the word-count range for each valid context
  // TODO: return false immediately for an unrecognized context
  // TODO: check that all three pitch fields are present
  // TODO: return true only if the combined word count falls within the context's range
}
`,
      solutionCode: `function pitchFitsContext(pitch, context) {
  const ranges = {
    elevator: { min: 20, max: 50 },
    "networking-event": { min: 30, max: 75 },
    "interview-opening": { min: 50, max: 120 },
  };
  const range = ranges[context];
  if (!range) return false;

  const fields = ["who", "background", "goal"];
  for (const f of fields) {
    if (typeof pitch[f] !== "string" || pitch[f].trim().length === 0) return false;
  }
  const combined = fields.map((f) => pitch[f].trim()).join(" ");
  const wordCount = combined.split(/\\s+/).filter((w) => w.length > 0).length;
  return wordCount >= range.min && wordCount <= range.max;
}`,
      harness: `
        const samplePitch = {
          who: "I'm Dana, a data analyst.",
          background: "I've spent two years turning messy spreadsheets into dashboards leadership actually uses.",
          goal: "I'm looking for a data analyst role on a product team.",
        };
        try { window.__report('t1', pitchFitsContext(samplePitch, "elevator") === true, 'a 28-word pitch should fit the elevator context range of 20-50 words'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', pitchFitsContext(samplePitch, "interview-opening") === false, 'the same pitch is too short for the interview-opening range of 50-120 words'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', pitchFitsContext(samplePitch, "unknown-context") === false, 'an unrecognized context should always return false'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts a pitch whose length fits the elevator range",
          hidden: false,
        },
        {
          id: "t2",
          description: "Rejects the same pitch when checked against a longer context's range",
          hidden: false,
        },
        { id: "t3", description: "Rejects an unrecognized context string", hidden: true },
      ],
      hints: [
        "Store each context's min/max as an object keyed by the context string, the same pattern as a lookup table.",
        "If the context string isn't a key in your lookup, return false right away instead of trying to compute a range.",
        "Reuse the same combined-word-count logic from the completeness check, just compare the result against the range that matches the given context instead of a single fixed range.",
      ],
    },
    commonMistakes: [
      "Reciting the exact same introduction, at the exact same length, regardless of the audience or setting.",
      "Describing background at length while never stating a clear goal, leaving the listener unsure what to do next.",
      "Opening with generic filler ('So, um, I guess I'll start...') instead of a direct statement of who you are.",
      "Choosing background details that are true but irrelevant to the specific listener, instead of the one or two that matter most to them.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Which three components make up the personal-introduction structure taught in this lesson?",
        choices: [
          "Who you are, relevant background, what you're looking for",
          "Your name, your age, your hobbies",
          "A joke, a fact, a question",
          "Your resume, your references, your salary expectations",
        ],
        correctIndex: 0,
        explanation:
          "The structure is who you are, the background relevant to this listener, and a specific goal.",
      },
      {
        id: "q2",
        prompt:
          "Why might the same person give a shorter introduction at a crowded networking event than at the start of a one-on-one interview?",
        choices: [
          "Because networking events don't allow talking",
          "Because the interview version should always be memorized word for word",
          "Because the interviewer has more time and likely wants more detail, while a crowded event rewards brevity",
          "Because introductions are not used in interviews",
        ],
        correctIndex: 2,
        explanation:
          "Length should adapt to context — an interviewer typically has time and interest for more detail than someone you just met briefly.",
      },
      {
        id: "q3",
        prompt:
          "A pitch that describes background at length but never states a goal is missing which component, and what problem does that typically cause?",
        choices: [
          "The 'who you are' component, causing confusion about identity",
          "The 'what you're looking for' component, leaving the listener unsure what to do next",
          "The 'relevant background' component, making the goal sound unearned",
          "No component; length alone is the only issue",
        ],
        correctIndex: 1,
        explanation:
          "Without a stated goal, the listener has no clear next step, even if the rest of the pitch was strong.",
      },
    ],
    takeaway:
      "A strong personal introduction keeps the same three-part shape everywhere, but adapts its length and emphasis to who's actually listening.",
    summary:
      "A personal introduction structures around who you are, background relevant to the listener, and a specific goal. The same core content should be lengthened or shortened depending on context, and dropping the goal is the most common way an otherwise strong introduction falls flat.",
    nextLessonSlug: "gd-fundamentals",
  },
  {
    id: "cgd-gd-fundamentals",
    slug: "gd-fundamentals",
    title: "Group Discussion Fundamentals",
    description:
      "What a group discussion is designed to evaluate, its common formats, and how to enter one appropriately.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 3,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["cgd-elevator-pitch"],
    objectives: [
      "Explain what a group discussion is designed to evaluate",
      "Distinguish topic-based GD scenarios from case-based ones",
      "Identify an appropriate way to enter an ongoing discussion",
    ],
    skills: ["career-readiness", "gd-formats"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["group discussion", "gd formats", "case-based discussion", "topic-based discussion"],
    explanation: `A group discussion (GD) puts several candidates together to discuss a topic or scenario, typically with no single leader assigned. It's a deliberately unstructured format, and that's the point: unlike a one-on-one interview, a GD is designed to reveal how you actually behave in a group under mild pressure — whether you can express a view clearly, listen while others are speaking, and contribute constructively without dominating or disappearing.

What evaluators are generally paying attention to isn't who "wins" the argument. It's a cluster of observable behaviors: do you speak up at a reasonable point, do you stay on topic, do you build on what others say, and do you let other people finish. A candidate who says one sharp, relevant thing and listens well often reads better than one who talks the most but never engages with anyone else's point.

GD prompts generally fall into two broad formats:

- **Topic-based discussions** present an open-ended statement or question with no single correct answer — for example, a debate-style prompt about a general policy or social issue. These reward clear reasoning and the ability to consider multiple angles.
- **Case-based discussions** present a short business or organizational scenario, often with specific numbers or constraints, and ask the group to work through a decision. These reward reading the given information carefully and reasoning from the specific facts in front of you, rather than general opinion.

Confusing the two is a common early mistake: treating a case with real numbers as if it were a free-form opinion topic means ignoring information the group was specifically given to work with.

**Entering the discussion** appropriately is its own skill. Jumping in mid-sentence to interrupt another speaker reads as poor listening, no matter how good the point is. The more reliable pattern is to wait for a natural pause — a speaker finishing a sentence or thought — and then enter with a short transition phrase that signals you're joining the existing conversation rather than starting a new one, such as "Building on that point," or "I'd like to add a different angle here." If the group opens in silence, someone has to be willing to start; waiting indefinitely for someone else to go first is its own common failure mode.

Over the course of a discussion, participants often settle into loose, informal roles — someone who opens the topic, someone who tends to summarize where the group has gotten to, someone who draws out quieter members. These roles aren't assigned and aren't required; they're simply patterns that tend to emerge naturally in a functioning group, and being aware of them helps you recognize when a discussion needs one (for example, when it's gotten repetitive and needs someone to summarize and move it forward).`,
    visual: {
      kind: "table",
      title: "GD formats compared",
      description:
        "Topic-based: an open-ended statement or question, rewards broad reasoning and multiple angles. Case-based: a scenario with specific data or constraints, rewards reasoning from the given facts.",
    },
    example: {
      language: "javascript",
      description:
        "Checks whether entering a discussion followed the recommended structural pattern: waiting for a pause, not interrupting, and using a transition phrase.",
      code: `function isAppropriateEntry(entry) {
  return (
    entry.waitedForNaturalPause === true &&
    entry.interruptedSpeaker === false &&
    typeof entry.transitionPhrase === "string" &&
    entry.transitionPhrase.trim().length > 0
  );
}
// Example: isAppropriateEntry({ waitedForNaturalPause: true, interruptedSpeaker: false, transitionPhrase: "Building on that point," }) -> true`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-4-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write classifyGdFormat(scenario) where scenario is an object { hasCompanyContext: boolean, isOpenEndedOpinion: boolean }. Return 'case-based' if hasCompanyContext is true. Otherwise, return 'topic-based' if isOpenEndedOpinion is true. Otherwise, return 'unclear'.",
      starterCode: `function classifyGdFormat(scenario) {
  // TODO: if hasCompanyContext is true, return 'case-based'
  // TODO: else if isOpenEndedOpinion is true, return 'topic-based'
  // TODO: otherwise return 'unclear'
}
`,
      solutionCode: `function classifyGdFormat(scenario) {
  if (scenario.hasCompanyContext === true) return "case-based";
  if (scenario.isOpenEndedOpinion === true) return "topic-based";
  return "unclear";
}`,
      harness: `
        try { window.__report('t1', classifyGdFormat({ hasCompanyContext: true, isOpenEndedOpinion: false }) === "case-based", 'a scenario with company context should classify as case-based'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', classifyGdFormat({ hasCompanyContext: false, isOpenEndedOpinion: true }) === "topic-based", 'an open-ended opinion prompt with no company context should classify as topic-based'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', classifyGdFormat({ hasCompanyContext: false, isOpenEndedOpinion: false }) === "unclear", 'a scenario matching neither signal should classify as unclear'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Classifies a company-context scenario as case-based",
          hidden: false,
        },
        {
          id: "t2",
          description: "Classifies an open-ended opinion prompt as topic-based",
          hidden: false,
        },
        {
          id: "t3",
          description: "Falls back to 'unclear' when neither signal is present",
          hidden: true,
        },
      ],
      hints: [
        "Check hasCompanyContext first, since a case-based scenario takes priority even if isOpenEndedOpinion also happens to be true.",
        "This is a simple priority-ordered set of checks, similar to an if/else if/else chain rather than a lookup table.",
        "Make sure the fallback case explicitly returns 'unclear' rather than leaving the function to return undefined.",
      ],
    },
    independentExercise: {
      id: "cgd-4-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write chooseEntryStrategy(discussionState) where discussionState is { isSilenceAtStart: boolean, currentSpeakerPausedNaturally: boolean }. Return 'initiate' if isSilenceAtStart is true. Otherwise return 'build-on-point' if currentSpeakerPausedNaturally is true. Otherwise return 'wait'.",
      starterCode: `function chooseEntryStrategy(discussionState) {
  // TODO: if isSilenceAtStart is true, return 'initiate'
  // TODO: else if currentSpeakerPausedNaturally is true, return 'build-on-point'
  // TODO: otherwise return 'wait'
}
`,
      solutionCode: `function chooseEntryStrategy(discussionState) {
  if (discussionState.isSilenceAtStart === true) return "initiate";
  if (discussionState.currentSpeakerPausedNaturally === true) return "build-on-point";
  return "wait";
}`,
      harness: `
        try { window.__report('t1', chooseEntryStrategy({ isSilenceAtStart: true, currentSpeakerPausedNaturally: false }) === "initiate", 'silence at the start of the discussion should return initiate'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', chooseEntryStrategy({ isSilenceAtStart: false, currentSpeakerPausedNaturally: true }) === "build-on-point", 'a natural pause from the current speaker should return build-on-point'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', chooseEntryStrategy({ isSilenceAtStart: false, currentSpeakerPausedNaturally: false }) === "wait", 'neither condition being true should return wait'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Returns 'initiate' when the discussion opens in silence",
          hidden: false,
        },
        {
          id: "t2",
          description: "Returns 'build-on-point' when the current speaker paused naturally",
          hidden: false,
        },
        {
          id: "t3",
          description: "Falls back to 'wait' when neither condition applies",
          hidden: true,
        },
      ],
      hints: [
        "Check isSilenceAtStart first — starting the discussion takes priority over building on an existing point.",
        "This follows the same priority-ordered if/else if/else pattern as the GD-format classifier, just with different fields and outcomes.",
        "Only fall through to the default 'wait' outcome once both earlier conditions have been checked and failed.",
      ],
    },
    commonMistakes: [
      "Treating a case-based prompt with real numbers as if it were a pure opinion topic and ignoring the given data.",
      "Interrupting a speaker mid-sentence instead of waiting for a natural pause to enter the discussion.",
      "Waiting indefinitely for someone else to start when the group opens in silence.",
      "Assuming GD roles like 'summarizer' are formally assigned, rather than patterns that emerge naturally as needed.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What is a group discussion primarily designed to reveal about a candidate?",
        choices: [
          "Their typing speed",
          "How they behave in a group under mild pressure — expressing views, listening, and contributing without dominating",
          "Their exact IQ score",
          "Whether they can memorize a script",
        ],
        correctIndex: 1,
        explanation:
          "GDs are an unstructured format specifically because they reveal real group behavior rather than a rehearsed individual answer.",
      },
      {
        id: "q2",
        prompt: "What distinguishes a case-based GD prompt from a topic-based one?",
        choices: [
          "Case-based prompts have no correct answer at all",
          "Case-based prompts include a scenario with specific data or constraints to reason from, while topic-based prompts are more open-ended",
          "Topic-based prompts always involve numbers",
          "There is no real difference between the two",
        ],
        correctIndex: 1,
        explanation:
          "Case-based prompts give specific facts or numbers to work from; topic-based prompts are broader and more opinion-driven.",
      },
      {
        id: "q3",
        prompt: "What is the recommended way to enter an ongoing group discussion?",
        choices: [
          "Interrupt as soon as you have a point, regardless of the current speaker",
          "Wait for a natural pause and use a transition phrase that connects to the existing conversation",
          "Wait until every other participant has spoken at least twice",
          "Raise your hand and wait to be called on by a moderator",
        ],
        correctIndex: 1,
        explanation:
          "Waiting for a natural pause and signaling you're building on the conversation avoids the poor-listening impression that interrupting creates.",
      },
    ],
    takeaway:
      "A group discussion evaluates how you participate in a group, not just what you say — recognizing the prompt's format and entering appropriately are both part of that.",
    summary:
      "Group discussions reveal behavior under mild group pressure rather than testing who 'wins' an argument. Prompts are generally topic-based (open-ended opinion) or case-based (a scenario with specific data), and entering appropriately means waiting for a natural pause and signaling you're joining the existing conversation.",
    nextLessonSlug: "gd-structuring-arguments",
  },
  {
    id: "cgd-gd-structuring-arguments",
    slug: "gd-structuring-arguments",
    title: "Structuring and Delivering GD Arguments",
    description:
      "How to structure a single contribution using claim, reasoning, and evidence, and how to build on others' points.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 4,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["cgd-gd-fundamentals"],
    objectives: [
      "Structure a spoken point using claim, reasoning, and evidence",
      "Identify when a contribution merely repeats a claim instead of supporting it",
      "Recognize what it means to build on another participant's point rather than restate your own",
    ],
    skills: ["career-readiness", "gd-argument-structure"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["claim reasoning evidence", "argument structure", "on-topic", "building on points"],
    explanation: `A group discussion rewards contributions that are easy to follow and clearly connected to what's already been said. The most reliable structure for a single point is claim, reasoning, evidence (sometimes written CRE):

- **Claim** — the position you're stating, in one clear sentence.
- **Reasoning** — why that claim is true or worth considering; the logical connection.
- **Evidence** — a concrete example, fact, or illustration that supports the reasoning.

For example: "Remote work increases productivity for focused tasks" (claim), "because employees lose less time to commuting and office interruptions, leaving longer uninterrupted blocks for deep work" (reasoning), "our team's internal survey after switching to remote work showed a measurable increase in completed tickets per week" (evidence). Each piece does different work: the claim tells the group what you think, the reasoning tells them why, and the evidence gives them something concrete to evaluate rather than just take your word for it.

A claim without reasoning is just an opinion stated loudly. Reasoning without evidence is a plausible-sounding argument no one can verify. Dropping either one weakens the whole point, even if the claim itself is reasonable — because the group has no way to evaluate why you believe it.

A related mistake is offering "reasoning" that simply restates the claim in different words — for example, following "remote work increases productivity" with "because people are more productive when remote." That sentence adds no new information; it just says the same thing twice. Genuine reasoning introduces a mechanism — commuting time, interruption frequency, focus — that explains why the claim would be true.

**Staying on topic** matters just as much as structure. It's easy, especially under mild pressure, to drift toward a related but different topic you feel more prepared to discuss. A point about remote work productivity that wanders into a broader argument about company culture in general may be interesting, but it stops being a contribution to this discussion, and it can read as changing the subject to more comfortable ground.

Finally, a discussion is a group activity, not a set of parallel monologues. **Building on another participant's point** — rather than simply repeating your own point in slightly different words — is what makes a contribution feel like part of a conversation. Building on a point means explicitly referencing what was just said ("Building on what Sam raised about cost...") and then adding something new: a counterpoint, an extension, a different piece of evidence. A group where everyone restates their own opening position every time they speak, without ever engaging with what anyone else said, doesn't function as a discussion at all — it functions as five separate short speeches.`,
    visual: {
      kind: "diagram",
      title: "Claim, reasoning, evidence",
      description:
        "Claim (your position) leads to Reasoning (why it's true) leads to Evidence (a concrete example or fact supporting the reasoning) — each link strengthens the one before it.",
    },
    example: {
      language: "javascript",
      description: "Checks whether a GD point object has all three CRE fields filled in.",
      code: `function hasClaimReasonEvidence(point) {
  const fields = ["claim", "reasoning", "evidence"];
  return fields.every((f) => typeof point[f] === "string" && point[f].trim().length > 0);
}
// Example: hasClaimReasonEvidence({ claim: "Public transit funding should increase.", reasoning: "", evidence: "Ridership rose 18% last year." }) -> false`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-5-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isCompleteArgument(point) where point is { claim: string, reasoning: string, evidence: string }. Return true only if: (1) all three fields are non-empty after trimming; and (2) reasoning is not the same as claim when compared case-insensitively after trimming (reasoning must add something beyond just repeating the claim). Return false otherwise.",
      starterCode: `function isCompleteArgument(point) {
  // TODO: check claim, reasoning, and evidence are all present and non-empty
  // TODO: check that reasoning isn't just the claim restated (case-insensitive, trimmed comparison)
  // TODO: return true only if both checks pass
}
`,
      solutionCode: `function isCompleteArgument(point) {
  const fields = ["claim", "reasoning", "evidence"];
  for (const f of fields) {
    if (typeof point[f] !== "string" || point[f].trim().length === 0) return false;
  }
  const claimNormalized = point.claim.trim().toLowerCase();
  const reasoningNormalized = point.reasoning.trim().toLowerCase();
  if (claimNormalized === reasoningNormalized) return false;
  return true;
}`,
      harness: `
        try {
          const r1 = isCompleteArgument({
            claim: "Remote work increases productivity.",
            reasoning: "Employees waste less time commuting and have more focused hours.",
            evidence: "A 2021 internal survey showed a 12% output increase.",
          });
          window.__report('t1', r1 === true, 'a claim with distinct reasoning and evidence should return true');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r2 = isCompleteArgument({
            claim: "Remote work increases productivity.",
            reasoning: "Remote work increases productivity.",
            evidence: "Some data.",
          });
          window.__report('t2', r2 === false, 'reasoning that just repeats the claim should return false');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const r3 = isCompleteArgument({ claim: "Remote work increases productivity.", reasoning: "", evidence: "Some data." });
          window.__report('t3', r3 === false, 'a missing reasoning field should return false');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts a claim with distinct reasoning and evidence",
          hidden: false,
        },
        { id: "t2", description: "Rejects reasoning that just repeats the claim", hidden: false },
        { id: "t3", description: "Rejects a point with a missing reasoning field", hidden: true },
      ],
      hints: [
        "Loop over the three field names and confirm each one is a non-empty string after trimming, before doing anything else.",
        "Normalize both claim and reasoning the same way (trim, then lowercase) before comparing them, so differences in capitalization or spacing don't matter.",
        "The 'repeats the claim' check should compare the whole normalized strings for equality, not just check if one contains the other.",
      ],
    },
    independentExercise: {
      id: "cgd-5-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write buildsOnPreviousPoint(contribution) where contribution is { acknowledgesPriorPoint: boolean, isTopicRelevant: boolean, repeatsPriorPointVerbatim: boolean }. Return true only if acknowledgesPriorPoint is true AND isTopicRelevant is true AND repeatsPriorPointVerbatim is false. Return false otherwise.",
      starterCode: `function buildsOnPreviousPoint(contribution) {
  // TODO: return true only if acknowledgesPriorPoint is true,
  // isTopicRelevant is true, and repeatsPriorPointVerbatim is false
}
`,
      solutionCode: `function buildsOnPreviousPoint(contribution) {
  return (
    contribution.acknowledgesPriorPoint === true &&
    contribution.isTopicRelevant === true &&
    contribution.repeatsPriorPointVerbatim === false
  );
}`,
      harness: `
        try { window.__report('t1', buildsOnPreviousPoint({ acknowledgesPriorPoint: true, isTopicRelevant: true, repeatsPriorPointVerbatim: false }) === true, 'a contribution that acknowledges, stays relevant, and adds something new should return true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', buildsOnPreviousPoint({ acknowledgesPriorPoint: false, isTopicRelevant: true, repeatsPriorPointVerbatim: false }) === false, 'a contribution that never acknowledges the prior point should return false'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', buildsOnPreviousPoint({ acknowledgesPriorPoint: true, isTopicRelevant: true, repeatsPriorPointVerbatim: true }) === false, 'a contribution that just repeats the prior point verbatim should return false'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description:
            "Accepts a contribution that acknowledges, stays relevant, and adds something new",
          hidden: false,
        },
        {
          id: "t2",
          description: "Rejects a contribution that never acknowledges the prior point",
          hidden: false,
        },
        {
          id: "t3",
          description: "Rejects a contribution that just repeats the prior point verbatim",
          hidden: true,
        },
      ],
      hints: [
        "This is a straightforward combination of three boolean conditions joined with logical AND.",
        "Watch the polarity carefully: two fields need to be true, but repeatsPriorPointVerbatim needs to be false.",
        "Write out the three conditions on separate lines first so it's easy to check each one's expected value before combining them.",
      ],
    },
    commonMistakes: [
      "Stating an opinion with no reasoning or evidence behind it, treating the claim alone as sufficient.",
      "Offering 'reasoning' that just restates the claim in different words instead of explaining a real mechanism.",
      "Drifting into a related but different, more comfortable topic instead of staying on the discussion's actual subject.",
      "Repeating your own earlier point in different words instead of engaging with what other participants have said.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What are the three parts of the claim-reasoning-evidence structure for a GD point?",
        choices: [
          "Introduction, body, conclusion",
          "Claim, reasoning, evidence",
          "Opinion, fact, question",
          "Situation, task, result",
        ],
        correctIndex: 1,
        explanation:
          "A well-structured point states a claim, explains the reasoning behind it, and supports that reasoning with evidence.",
      },
      {
        id: "q2",
        prompt: "What's wrong with reasoning that simply restates the claim in different words?",
        choices: [
          "Nothing; restating strengthens the point",
          "It adds no new information and doesn't explain why the claim is true",
          "It's technically not allowed in a GD",
          "It automatically counts as evidence",
        ],
        correctIndex: 1,
        explanation:
          "Genuine reasoning introduces a mechanism or explanation; restating the claim just repeats it without adding why it's true.",
      },
      {
        id: "q3",
        prompt:
          "What does it mean to 'build on' another participant's point rather than just repeating your own?",
        choices: [
          "Speaking louder than they did",
          "Explicitly referencing what they said and then adding something new, like a counterpoint or extension",
          "Waiting for them to finish and then changing the subject entirely",
          "Repeating their point back to them word for word",
        ],
        correctIndex: 1,
        explanation:
          "Building on a point means engaging with what was actually said and extending it, rather than delivering an unrelated pre-planned point.",
      },
    ],
    takeaway:
      "A GD contribution is only as strong as its weakest link — a claim with no reasoning, or reasoning with no evidence, leaves the group nothing to actually evaluate.",
    summary:
      "A well-structured GD point states a claim, explains the reasoning behind it, and supports that reasoning with concrete evidence, while staying on the discussion's actual topic. Building on another participant's point — referencing what they said and adding something new — is what keeps a discussion functioning as a conversation rather than parallel monologues.",
    nextLessonSlug: "gd-etiquette-listening",
  },
  {
    id: "cgd-gd-etiquette-listening",
    slug: "gd-etiquette-listening",
    title: "GD Etiquette, Active Listening, and Rebuttal",
    description:
      "How to signal active listening, disagree respectfully, and avoid interrupting or dominating a discussion.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 5,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["cgd-gd-structuring-arguments"],
    objectives: [
      "Identify structural signals of active listening in a response",
      "Structure a respectful disagreement that addresses the argument, not the person",
      "Count interruptions in a sequence of discussion turns",
    ],
    skills: ["career-readiness", "gd-etiquette"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["active listening", "rebuttal", "interruption", "respectful disagreement"],
    explanation: `Speaking well in a group discussion is only half the skill; the other half is demonstrating that you're genuinely listening. Active listening has observable signals: not interrupting, referencing what a previous speaker actually said before responding, and giving credit to a point before disagreeing with it.

The most reliable structure for disagreeing respectfully has three parts:

1. **Summarize** the other person's point accurately, in your own words, before responding — "If I understand you correctly, you're saying the deadline should move because the client testing phase is taking longer than planned."
2. **Acknowledge** what's reasonable about it, if anything is — this isn't flattery, it's showing you actually processed the argument rather than just waiting for your turn to talk.
3. **Counter** with your own reasoning, directed at the argument, not the person — "I'd actually keep the current deadline, since the client demo is already scheduled and moving it risks a larger contract."

Skipping the summary step is the single most common etiquette failure in a disagreement. Jumping straight to "I disagree, because..." without first showing you understood the other person's point can make the exchange feel adversarial even when the disagreement itself is entirely reasonable — the missing step is what makes it feel personal rather than substantive.

**Interruption** is a related but distinct problem. Interrupting doesn't just cut off a sentence; it signals that your point matters more than finishing theirs. A single interruption in a long discussion is rarely fatal, but a pattern of consistently starting to speak before another participant has finished reads as dominating the floor rather than participating in it — and it tends to shut quieter participants out entirely, since they're competing for the same gap you just claimed.

The flip side of not interrupting is not disappearing either — genuinely active listening is not the same as passive silence. A participant who never contributes isn't demonstrating restraint; from the outside, silence and disengagement look identical. The goal isn't to speak as little as possible, it's to make sure that when you do speak, it clearly connects to what came before.

Disagreement itself is not a problem — in fact, a discussion where everyone simply agrees with everything said rarely goes anywhere useful. The skill is in how the disagreement is delivered: addressing the reasoning ("the evidence for that seems limited because...") rather than the person ("that's a naive way to look at it"). The first invites a continued exchange of ideas; the second tends to end the exchange and put the other participant on the defensive instead.`,
    visual: {
      kind: "table",
      title: "Structure of a respectful rebuttal",
      description:
        "Summarize the other point accurately leads to Acknowledge what's reasonable in it leads to Counter with your own reasoning, aimed at the argument, not the person.",
    },
    example: {
      language: "javascript",
      description:
        "Checks whether a response includes both a summary of the other point and a stated disagreement.",
      code: `function acknowledgesBeforeDisagreeing(response) {
  return (
    typeof response.summary === "string" && response.summary.trim().length > 0 &&
    typeof response.disagreement === "string" && response.disagreement.trim().length > 0
  );
}
// Example: acknowledgesBeforeDisagreeing({ summary: "So you're saying the deadline should move.", disagreement: "I'd actually keep it, since the client demo is locked in." }) -> true`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-6-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isRespectfulRebuttal(response) where response is { summarizesOtherPoint: boolean, attacksPerson: boolean, offersCounterReasoning: boolean }. Return true only if summarizesOtherPoint is true AND attacksPerson is false AND offersCounterReasoning is true. Return false otherwise.",
      starterCode: `function isRespectfulRebuttal(response) {
  // TODO: return true only if summarizesOtherPoint is true,
  // attacksPerson is false, and offersCounterReasoning is true
}
`,
      solutionCode: `function isRespectfulRebuttal(response) {
  return (
    response.summarizesOtherPoint === true &&
    response.attacksPerson === false &&
    response.offersCounterReasoning === true
  );
}`,
      harness: `
        try { window.__report('t1', isRespectfulRebuttal({ summarizesOtherPoint: true, attacksPerson: false, offersCounterReasoning: true }) === true, 'a rebuttal that summarizes, avoids attacking the person, and offers reasoning should return true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isRespectfulRebuttal({ summarizesOtherPoint: true, attacksPerson: true, offersCounterReasoning: true }) === false, 'a rebuttal that attacks the person should return false even if it summarizes and reasons'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isRespectfulRebuttal({ summarizesOtherPoint: false, attacksPerson: false, offersCounterReasoning: true }) === false, 'a rebuttal that skips summarizing the other point should return false'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts a rebuttal that summarizes, avoids attacking, and reasons",
          hidden: false,
        },
        { id: "t2", description: "Rejects a rebuttal that attacks the person", hidden: false },
        {
          id: "t3",
          description: "Rejects a rebuttal that skips summarizing the other point",
          hidden: true,
        },
      ],
      hints: [
        "This mirrors the pattern from the previous lesson: three boolean conditions combined with logical AND.",
        "Two of the fields need to be true and one needs to be false — write each comparison out explicitly rather than relying on the raw boolean value.",
        "A rebuttal that fails any single one of the three conditions should return false, not just the ones that fail two or three.",
      ],
    },
    independentExercise: {
      id: "cgd-6-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write countInterruptions(turns) where turns is an array of objects { speaker: string, startedBeforePreviousEnded: boolean }, representing a sequence of speaking turns in order. The very first turn (index 0) can never be an interruption, regardless of its flag, since there's no previous turn for it to interrupt. Return the count of turns at index 1 or later where startedBeforePreviousEnded is true.",
      starterCode: `function countInterruptions(turns) {
  // TODO: skip index 0 -- it can never count as an interruption
  // TODO: count how many remaining turns have startedBeforePreviousEnded === true
}
`,
      solutionCode: `function countInterruptions(turns) {
  let count = 0;
  for (let i = 1; i < turns.length; i++) {
    if (turns[i].startedBeforePreviousEnded === true) count++;
  }
  return count;
}`,
      harness: `
        try {
          const t1turns = [
            { speaker: "A", startedBeforePreviousEnded: false },
            { speaker: "B", startedBeforePreviousEnded: true },
            { speaker: "C", startedBeforePreviousEnded: false },
          ];
          window.__report('t1', countInterruptions(t1turns) === 1, 'exactly one turn after the first interrupts the previous speaker');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const t2turns = [
            { speaker: "A", startedBeforePreviousEnded: false },
            { speaker: "B", startedBeforePreviousEnded: false },
          ];
          window.__report('t2', countInterruptions(t2turns) === 0, 'no turn interrupts the previous speaker');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          window.__report('t3', countInterruptions([]) === 0, 'an empty turn sequence should return 0');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Counts exactly one interruption after the first turn",
          hidden: false,
        },
        {
          id: "t2",
          description: "Counts zero interruptions when no turn interrupts",
          hidden: false,
        },
        { id: "t3", description: "Returns 0 for an empty array of turns", hidden: true },
      ],
      hints: [
        "Start your loop at index 1, not index 0, since the very first turn can't interrupt anything.",
        "A simple counter incremented inside the loop, then returned at the end, is all this needs.",
        "Handle an empty array naturally — a loop that starts at index 1 on an empty array simply never executes, which already gives the right answer without a special case.",
      ],
    },
    commonMistakes: [
      "Jumping straight to disagreement without first summarizing the other person's point, which makes the exchange feel adversarial.",
      "Interrupting repeatedly, which shuts other participants out of the conversation rather than just occasionally overlapping.",
      "Responding to a straw-man version of what was said instead of what was actually said.",
      "Confusing genuinely active listening with staying passively silent — engaged listening still involves speaking up when relevant.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What is the recommended first step before disagreeing with someone in a group discussion?",
        choices: [
          "State your counterargument immediately for maximum impact",
          "Summarize their point accurately in your own words",
          "Wait for them to ask if you disagree",
          "Interrupt to correct them as soon as possible",
        ],
        correctIndex: 1,
        explanation:
          "Summarizing the other person's point first shows you understood it, which makes the disagreement that follows feel substantive rather than dismissive.",
      },
      {
        id: "q2",
        prompt:
          "What does a pattern of repeatedly starting to speak before another participant finishes typically signal?",
        choices: [
          "Strong listening skills",
          "Dominating the floor rather than participating in a shared conversation",
          "Enthusiasm that evaluators always reward",
          "Nothing significant; interruptions are neutral",
        ],
        correctIndex: 1,
        explanation:
          "A pattern of interruption tends to shut other participants out and reads as dominance rather than engagement.",
      },
      {
        id: "q3",
        prompt:
          "Why is 'that's a naive way to look at it' a weaker way to disagree than addressing the reasoning directly?",
        choices: [
          "It's too polite",
          "It attacks the person rather than engaging with their argument, which tends to end the exchange rather than continue it",
          "It uses too many words",
          "It's factually always incorrect",
        ],
        correctIndex: 1,
        explanation:
          "Personal characterizations put the other participant on the defensive, while addressing the reasoning invites continued discussion.",
      },
    ],
    takeaway:
      "Disagreement isn't the problem in a group discussion — disagreeing without first showing you listened is.",
    summary:
      "Respectful disagreement follows a summarize-acknowledge-counter structure that addresses the argument rather than the person. Interrupting repeatedly reads as dominance, while genuinely active listening means engaging with what was said, not staying passively silent.",
    nextLessonSlug: "interview-fundamentals",
  },
  {
    id: "cgd-interview-fundamentals",
    slug: "interview-fundamentals",
    title: "Interview Fundamentals",
    description:
      "The common interview formats, what each is designed to evaluate, and the basics of preparing for any of them.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 6,
    difficulty: "beginner",
    estimatedMinutes: 18,
    prerequisites: ["cgd-gd-etiquette-listening"],
    objectives: [
      "Distinguish common interview formats and what each is designed to evaluate",
      "Identify appropriate preparation steps before an interview",
      "Recognize when it's appropriate to ask questions of the interviewer",
    ],
    skills: ["career-readiness", "interview-formats"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: [
      "interview formats",
      "hr screen",
      "technical interview",
      "panel interview",
      "interview prep",
    ],
    explanation: `Not all interviews are testing the same thing, and preparing for the wrong one is a common, avoidable mistake. Three formats show up repeatedly:

- **HR or screening interviews** are usually early, shorter conversations focused on basic fit: your background, your availability, your communication, and whether your expectations (role, compensation range, location) roughly match the position. They rarely go deep on technical skill.
- **Technical interviews** focus on role-specific ability — solving a problem, explaining a past project in technical depth, or walking through your reasoning on a task related to the actual job.
- **Panel interviews** involve multiple interviewers at once, often representing different stakeholders (your future manager, a peer, someone from another team). They're evaluating the same things a one-on-one interview would, but from multiple perspectives simultaneously, which means a good panel answer often needs to work for more than one type of listener at once — technical enough for the peer, clear enough for a non-technical stakeholder in the room.

Confusing formats leads to a mismatch: giving a screening-style, high-level answer in a technical interview can read as unprepared to go deep, while treating a screening call like a technical deep-dive can waste the interviewer's limited time on details they weren't trying to evaluate yet.

Preparation basics apply across all three formats, but two matter enough to call out specifically. First, **research the organization** beyond its name — what it does, roughly how it makes money or delivers its mission, and ideally something specific enough that it couldn't apply to any other company you might be interviewing with that week. This shows up naturally in how you answer "why this role," and its absence is easy for an interviewer to spot. Second, **prepare questions to ask** the interviewer. Nearly every interview ends with some version of "do you have any questions for us?" — treating this as optional or answering "not really" is a missed opportunity to show genuine engagement, and it can even read as disinterest. Good questions are specific to the role or team, not answerable by re-reading the company's public website.

A third, quieter preparation step is reviewing your own background before you go in — not memorizing a script, but making sure you can speak specifically about your own recent work and experience without having to reconstruct it on the spot under mild pressure. Interviewers can generally tell the difference between someone speaking from genuine familiarity with their own experience and someone reconstructing it in real time.`,
    visual: {
      kind: "table",
      title: "Interview formats and their focus",
      description:
        "HR/Screening: basic fit and logistics. Technical: role-specific skill and reasoning. Panel: the same evaluation from multiple stakeholders at once.",
    },
    example: {
      language: "javascript",
      description:
        "Checks whether all three basic preparation steps for an interview have been completed.",
      code: `function hasPreparedBasics(prep) {
  return (
    prep.researchedOrganization === true &&
    prep.hasQuestionsToAsk === true &&
    prep.reviewedOwnBackground === true
  );
}
// Example: hasPreparedBasics({ researchedOrganization: true, hasQuestionsToAsk: false, reviewedOwnBackground: true }) -> false`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-7-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write identifyInterviewFocus(formatLabel) using this mapping: 'hr-screen' -> 'fit-and-communication', 'technical' -> 'role-specific-skill', 'panel' -> 'multiple-stakeholder-perspectives'. Return null for any other, unrecognized formatLabel.",
      starterCode: `function identifyInterviewFocus(formatLabel) {
  // TODO: map 'hr-screen', 'technical', and 'panel' to their respective focus strings
  // TODO: return null for any unrecognized formatLabel
}
`,
      solutionCode: `function identifyInterviewFocus(formatLabel) {
  const mapping = {
    "hr-screen": "fit-and-communication",
    technical: "role-specific-skill",
    panel: "multiple-stakeholder-perspectives",
  };
  return mapping[formatLabel] ?? null;
}`,
      harness: `
        try { window.__report('t1', identifyInterviewFocus("technical") === "role-specific-skill", "'technical' should map to role-specific-skill"); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', identifyInterviewFocus("hr-screen") === "fit-and-communication", "'hr-screen' should map to fit-and-communication"); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', identifyInterviewFocus("final-round") === null, 'an unrecognized format label should return null'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Maps 'technical' to 'role-specific-skill'", hidden: false },
        { id: "t2", description: "Maps 'hr-screen' to 'fit-and-communication'", hidden: false },
        { id: "t3", description: "Returns null for an unrecognized format label", hidden: true },
      ],
      hints: [
        "A plain object mapping each known format label to its focus string handles the three known cases in one lookup.",
        "Use the nullish coalescing operator (??) or an explicit undefined check so a missing key falls back to null rather than undefined.",
        "There's no need for an if/else chain here — a direct object lookup is simpler and less error-prone.",
      ],
    },
    independentExercise: {
      id: "cgd-7-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isReadyForInterview(prep) where prep is { researchedOrganization: boolean, preparedQuestionsCount: number, reviewedOwnBackground: boolean }. Return true only if researchedOrganization is true AND reviewedOwnBackground is true AND preparedQuestionsCount is at least 2.",
      starterCode: `function isReadyForInterview(prep) {
  // TODO: return true only if researchedOrganization is true,
  // reviewedOwnBackground is true, and preparedQuestionsCount is >= 2
}
`,
      solutionCode: `function isReadyForInterview(prep) {
  return (
    prep.researchedOrganization === true &&
    prep.reviewedOwnBackground === true &&
    prep.preparedQuestionsCount >= 2
  );
}`,
      harness: `
        try { window.__report('t1', isReadyForInterview({ researchedOrganization: true, preparedQuestionsCount: 2, reviewedOwnBackground: true }) === true, 'meeting all three criteria, including exactly 2 prepared questions, should return true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isReadyForInterview({ researchedOrganization: true, preparedQuestionsCount: 1, reviewedOwnBackground: true }) === false, 'only 1 prepared question should fail the minimum-of-2 requirement'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isReadyForInterview({ researchedOrganization: false, preparedQuestionsCount: 5, reviewedOwnBackground: true }) === false, 'skipping organization research should fail even with plenty of prepared questions'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts prep meeting all three criteria, at the question-count minimum",
          hidden: false,
        },
        {
          id: "t2",
          description: "Rejects prep with fewer than 2 prepared questions",
          hidden: false,
        },
        {
          id: "t3",
          description: "Rejects prep missing organization research, even with plenty of questions",
          hidden: true,
        },
      ],
      hints: [
        "Two of these fields are booleans that must equal true; the third is a number that must meet a minimum threshold.",
        "Use >= rather than > for the question-count comparison, since exactly 2 questions should count as meeting the requirement.",
        "Combine all three conditions with a single logical AND, the same pattern used elsewhere in this course for combined structural checks.",
      ],
    },
    commonMistakes: [
      "Walking in with zero prepared questions for the interviewer, or dismissing the question as unimportant.",
      "Giving the same generic answers regardless of format, instead of adjusting depth for HR versus technical rounds.",
      "Failing to research the organization beyond its name, which becomes obvious in a generic 'why this role' answer.",
      "Treating a panel interview as a conversation with only one person in the room, ignoring other stakeholders' likely concerns.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What do HR or screening interviews typically focus on?",
        choices: [
          "Deep technical problem-solving",
          "Basic fit: background, availability, communication, and expectations",
          "Multiple stakeholders evaluating you simultaneously",
          "Writing code under time pressure",
        ],
        correctIndex: 1,
        explanation:
          "Screening interviews are generally shorter conversations checking basic fit rather than deep technical evaluation.",
      },
      {
        id: "q2",
        prompt:
          "Why can a panel interview require a different approach than a one-on-one interview?",
        choices: [
          "Panels never ask real questions",
          "An answer often needs to work for multiple listeners with different backgrounds at once, such as a technical peer and a non-technical stakeholder",
          "Panels only evaluate appearance",
          "Panels are always shorter than one-on-one interviews",
        ],
        correctIndex: 1,
        explanation:
          "With several interviewers representing different perspectives in the room, a good answer often needs to be understandable and relevant to more than one audience simultaneously.",
      },
      {
        id: "q3",
        prompt:
          "Why does treating 'do you have any questions for us' as optional tend to backfire?",
        choices: [
          "It's a required legal question with no real purpose",
          "Skipping it can read as disinterest and wastes a chance to demonstrate genuine engagement",
          "Interviewers never actually listen to the answer",
          "It only matters in technical interviews",
        ],
        correctIndex: 1,
        explanation:
          "This question is a genuine opportunity to show engagement; treating it as skippable can come across as a lack of real interest in the role.",
      },
    ],
    takeaway:
      "Knowing which interview format you're walking into changes what you should prepare — and preparing questions to ask is not optional in any of them.",
    summary:
      "HR/screening, technical, and panel interviews evaluate different things and reward different kinds of preparation. Researching the organization, preparing genuine questions to ask, and reviewing your own background apply across all three formats.",
    nextLessonSlug: "star-method",
  },
  {
    id: "cgd-star-method",
    slug: "star-method",
    title: "The STAR Method for Behavioral Questions",
    description:
      "How to structure a behavioral interview answer using Situation, Task, Action, and Result.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 7,
    difficulty: "intermediate",
    estimatedMinutes: 22,
    prerequisites: ["cgd-interview-fundamentals"],
    objectives: [
      "Structure a behavioral answer using Situation, Task, Action, and Result",
      "Identify which STAR component is missing or underdeveloped in an incomplete answer",
      "Explain why a vague, claim-only answer fails compared to a full STAR answer",
    ],
    skills: ["career-readiness", "star-method"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["star method", "behavioral interview", "situation task action result"],
    explanation: `Behavioral interview questions ask about a past experience — "tell me about a time you handled conflict" or "describe a time you missed a deadline" — because past behavior is one of the more reliable predictors interviewers have of future behavior. The most widely used structure for answering them is STAR:

- **Situation** — the context: what was going on, briefly.
- **Task** — what you specifically needed to accomplish or were responsible for.
- **Action** — what you actually did, step by step, in your own words (not "we," specifically you).
- **Result** — what happened, ideally something concrete and, where possible, measurable.

A vague answer fails because it never actually shows the interviewer anything they can evaluate. Consider the difference between "I'm good at handling conflict, I dealt with a difficult coworker once" and a full STAR version: "A teammate and I disagreed sharply about which approach to take on a shared project with a tight deadline (Situation). I needed to get us aligned without losing more time to the disagreement (Task). I set up a short call, asked him to walk me through his reasoning fully before responding, and proposed we prototype both approaches for one day to compare results directly instead of continuing to argue in the abstract (Action). We picked his approach after the comparison, shipped on time, and he later asked me to pair with him again on a different project (Result)." The first version is a claim about yourself with no evidence. The second gives the interviewer an actual example to evaluate — specific enough to be believable, and structured enough to be easy to follow.

Each STAR component tends to fail in its own predictable way. A weak Situation either takes so long to set up that there's no time left for the interesting part, or is so vague ("there was a project once") that it gives no real context. A weak Task is missing entirely — the candidate describes what happened around them without ever stating what they specifically needed to do. A weak Action describes what "we" did as a team without isolating the candidate's individual contribution, which is exactly what the interviewer is trying to assess. A weak Result is vague ("it went well") instead of concrete ("we shipped two days early and the client renewed their contract").

Converting a vague memory into a full STAR answer is a rehearsable skill, not a talent some people have and others don't. It usually just requires deliberately asking yourself the four questions in order — what was the situation, what specifically was my task, what did I specifically do, and what specifically resulted — for a handful of real experiences before you walk into an interview, rather than trying to construct the structure for the first time out loud under pressure.`,
    visual: {
      kind: "diagram",
      title: "The STAR structure",
      description:
        "Situation (brief context) leads to Task (what you specifically needed to do) leads to Action (what you specifically did) leads to Result (what concretely happened).",
    },
    example: {
      language: "javascript",
      description:
        "Returns which STAR fields are missing or empty from a behavioral-answer object.",
      code: `function missingStarFields(answer) {
  const fields = ["situation", "task", "action", "result"];
  return fields.filter((f) => !answer[f] || answer[f].trim().length === 0);
}
// Example: missingStarFields({ situation: "A key client threatened to cancel their contract.", task: "", action: "I scheduled a call and proposed a revised delivery plan.", result: "They renewed for another year." }) -> ["task"]`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-8-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isCompleteStarAnswer(answer) where answer is { situation, task, action, result } (all strings). Return true only if all four fields are present and, after trimming, each is at least 10 characters long.",
      starterCode: `function isCompleteStarAnswer(answer) {
  // TODO: check each of situation, task, action, and result
  // TODO: each field must be a string of at least 10 characters after trimming
  // TODO: return true only if all four fields meet that bar
}
`,
      solutionCode: `function isCompleteStarAnswer(answer) {
  const fields = ["situation", "task", "action", "result"];
  for (const f of fields) {
    if (typeof answer[f] !== "string" || answer[f].trim().length < 10) return false;
  }
  return true;
}`,
      harness: `
        try {
          const valid = {
            situation: "A key client threatened to cancel their contract.",
            task: "Retain the client without missing our other deadlines.",
            action: "I scheduled a call and proposed a revised delivery plan.",
            result: "They renewed for another year.",
          };
          window.__report('t1', isCompleteStarAnswer(valid) === true, 'an answer with all four substantial fields should return true');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const missingAction = {
            situation: "A key client threatened to cancel their contract.",
            task: "Retain the client without missing our other deadlines.",
            action: "",
            result: "They renewed for another year.",
          };
          window.__report('t2', isCompleteStarAnswer(missingAction) === false, 'an answer with an empty action field should return false');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const tooShortResult = {
            situation: "A key client threatened to cancel their contract.",
            task: "Retain the client without missing our other deadlines.",
            action: "I scheduled a call and proposed a revised delivery plan.",
            result: "Fixed",
          };
          window.__report('t3', isCompleteStarAnswer(tooShortResult) === false, 'a result field under 10 characters should return false');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts an answer with all four substantial fields",
          hidden: false,
        },
        { id: "t2", description: "Rejects an answer with an empty action field", hidden: false },
        {
          id: "t3",
          description: "Rejects an answer whose result field is too short to be substantial",
          hidden: true,
        },
      ],
      hints: [
        "Loop over the four field names, the same pattern used for the CRE-completeness check in the group discussion lessons.",
        "Trim each field before measuring its length, so leading or trailing whitespace doesn't count toward the 10-character minimum.",
        "Return false as soon as any field fails the check — you don't need to check the remaining fields once one has already failed.",
      ],
    },
    independentExercise: {
      id: "cgd-8-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write identifyMissingStarField(answer) where answer is { situation, task, action, result }. Check fields in this order: situation, task, action, result. Return the name of the first field that is missing or, after trimming, shorter than 10 characters. Return null if all four fields meet the 10-character minimum.",
      starterCode: `function identifyMissingStarField(answer) {
  // TODO: check situation, task, action, result in that exact order
  // TODO: return the name of the first field under 10 characters (after trimming)
  // TODO: return null if every field meets the minimum
}
`,
      solutionCode: `function identifyMissingStarField(answer) {
  const orderedFields = ["situation", "task", "action", "result"];
  for (const f of orderedFields) {
    if (typeof answer[f] !== "string" || answer[f].trim().length < 10) return f;
  }
  return null;
}`,
      harness: `
        try {
          const missingTask = {
            situation: "valid situation text here",
            task: "",
            action: "valid action text here",
            result: "valid result text here",
          };
          window.__report('t1', identifyMissingStarField(missingTask) === "task", "with only task missing, the function should return 'task'");
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const complete = {
            situation: "valid situation text here",
            task: "valid task text here",
            action: "valid action text here",
            result: "valid result text here",
          };
          window.__report('t2', identifyMissingStarField(complete) === null, 'an answer where all four fields meet the minimum should return null');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const missingBoth = {
            situation: "",
            task: "valid task text here",
            action: "valid action text here",
            result: "valid result text here",
          };
          window.__report('t3', identifyMissingStarField(missingBoth) === "situation", 'situation should be reported first, since it comes first in the checking order');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Reports 'task' when only the task field is too short",
          hidden: false,
        },
        {
          id: "t2",
          description: "Returns null when all four fields meet the minimum",
          hidden: false,
        },
        {
          id: "t3",
          description:
            "Reports 'situation' first when both situation and a later field are missing",
          hidden: true,
        },
      ],
      hints: [
        "Keep the field names in an array in the exact order they should be checked, and iterate over that array rather than checking them in an arbitrary order.",
        "This is similar to the completeness check from the guided exercise, but instead of returning a boolean, return the field name itself as soon as one fails.",
        "The order matters for the hidden test: if two fields are both invalid, the function should report whichever one comes first in the checking order, not the last one found.",
      ],
    },
    commonMistakes: [
      "Spending so long describing the Situation that there's no time left for Action and Result.",
      "Stating the Result vaguely ('it went well') instead of describing something concrete that changed.",
      "Using 'we' throughout the Action without ever clarifying the candidate's own specific contribution.",
      "Choosing an example that's only loosely related to the actual question being asked.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What do the four letters in STAR stand for?",
        choices: [
          "Situation, Task, Action, Result",
          "Skill, Talent, Ability, Reputation",
          "Story, Topic, Answer, Reflection",
          "Strengths, Talents, Achievements, References",
        ],
        correctIndex: 0,
        explanation:
          "STAR stands for Situation, Task, Action, and Result — the four components of a complete behavioral answer.",
      },
      {
        id: "q2",
        prompt:
          "What's the main weakness of an answer like 'I'm good at handling conflict, I dealt with a difficult coworker once'?",
        choices: [
          "It's too long",
          "It's a claim about yourself with no concrete example the interviewer can actually evaluate",
          "It uses the word 'coworker' incorrectly",
          "It contains a quantifiable result",
        ],
        correctIndex: 1,
        explanation:
          "Vague answers state a claim but give the interviewer nothing specific to evaluate, unlike a full STAR example.",
      },
      {
        id: "q3",
        prompt:
          "An answer that describes what 'we' did as a team, without ever isolating the candidate's own actions, is weak in which STAR component specifically?",
        choices: ["Situation", "Task", "Action", "Result"],
        correctIndex: 2,
        explanation:
          "The Action component specifically needs to isolate what the candidate personally did, since that's what the interviewer is trying to assess.",
      },
    ],
    takeaway:
      "A complete STAR answer replaces a vague self-description with one concrete, structured example the interviewer can actually evaluate.",
    summary:
      "STAR structures a behavioral answer as Situation, Task, Action, and Result. Each component fails in its own predictable way — a bloated Situation, a missing Task, a diffuse 'we'-only Action, or a vague Result — and converting a vague memory into a full STAR answer is a rehearsable skill.",
    nextLessonSlug: "common-interview-questions",
  },
  {
    id: "cgd-common-interview-questions",
    slug: "common-interview-questions",
    title: "Preparing for Common Interview Questions",
    description:
      "The real intent behind frequently-asked interview questions, and how to answer them specifically rather than generically.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 8,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["cgd-star-method"],
    objectives: [
      "Identify the underlying intent behind a frequently-asked interview question",
      "Structure an answer to 'Tell me about yourself' that stays within a target length",
      "Distinguish a specific, honest weakness answer from a generic, evasive one",
    ],
    skills: ["career-readiness", "common-interview-questions"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: [
      "tell me about yourself",
      "greatest weakness",
      "why this role",
      "interview questions",
    ],
    explanation: `A small set of questions shows up in an enormous number of interviews, and each one is really asking something more specific than its literal wording suggests.

"**Tell me about yourself**" is rarely a request for a full biography. It's usually best answered with a present → past → future structure: where you are now professionally, the relevant experience that got you here, and what you're looking for next — essentially a slightly longer version of the personal-introduction structure from earlier in this course, adapted to open an interview specifically. A generic answer that could apply to any candidate for any job ("I'm a hard worker who's passionate about growth") wastes the one open-ended question most likely to shape the interviewer's first real impression.

"**What's your greatest weakness**" is genuinely asking about self-awareness and evidence of growth, not asking you to disguise a strength as a flaw. Answers like "I work too hard" or "I'm a perfectionist" are recognized immediately as evasive rather than honest, because they're not real weaknesses at all — they're humble-brags in disguise, and interviewers hear them constantly. A stronger answer names something specific and genuinely limiting ("I sometimes underestimate how long detailed testing will take"), paired with a concrete step you've taken to address it ("I now add a 20% time buffer to every testing estimate, which has made my timelines more accurate"). The second half — the concrete improvement step — matters as much as the honest naming of the weakness itself; naming a flaw with no evidence of addressing it just leaves the interviewer with the flaw and nothing else.

"**Why this role**" (or "why this company") is evaluating specific motivation, not generic enthusiasm. "I'm a hard worker and I'm passionate about this industry" says nothing that couldn't be copy-pasted into any other application. A specific answer connects something genuinely true about the role or organization to something genuinely true about your own background or goals — for example, connecting an organization's stated focus on a particular product area to a specific project you've already done in that space.

Across all three questions, the common thread is the same: specificity beats general positivity. An honest, particular answer — even one that admits a real weakness or a real gap — reads as more credible than a polished, generic one that could have been given by anyone. Interviewers hear the generic versions of these answers dozens of times; a specific, well-structured answer is what actually gets remembered afterward.`,
    visual: {
      kind: "table",
      title: "What common questions are really evaluating",
      description:
        "'Tell me about yourself' -> narrative fit. 'Greatest weakness' -> self-awareness and growth. 'Why this role' -> specific motivation, not generic enthusiasm.",
    },
    example: {
      language: "javascript",
      description:
        "Looks up the underlying intent behind a fixed set of common interview question labels.",
      code: `function identifyQuestionIntent(questionType) {
  const mapping = {
    "tell-me-about-yourself": "narrative-fit",
    "greatest-weakness": "self-awareness-and-growth",
    "why-this-role": "specific-motivation",
  };
  return mapping[questionType] ?? null;
}
// Example: identifyQuestionIntent("greatest-weakness") -> "self-awareness-and-growth"`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-9-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isSpecificWeaknessAnswer(answer) where answer is { weakness: string, improvementStep: string }. Return true only if: (1) weakness is non-empty after trimming AND, compared case-insensitively after trimming, is not exactly one of these generic phrases: 'i work too hard', \"i'm a perfectionist\", 'i care too much'; and (2) improvementStep is non-empty after trimming and at least 10 characters long.",
      starterCode: `function isSpecificWeaknessAnswer(answer) {
  // TODO: check weakness is present and not exactly one of the banned generic phrases
  // TODO: check improvementStep is present and at least 10 characters after trimming
  // TODO: return true only if both checks pass
}
`,
      solutionCode: `function isSpecificWeaknessAnswer(answer) {
  const genericWeaknesses = ["i work too hard", "i'm a perfectionist", "i care too much"];

  if (typeof answer.weakness !== "string" || answer.weakness.trim().length === 0) return false;
  const normalizedWeakness = answer.weakness.trim().toLowerCase();
  if (genericWeaknesses.includes(normalizedWeakness)) return false;

  if (typeof answer.improvementStep !== "string" || answer.improvementStep.trim().length < 10) return false;

  return true;
}`,
      harness: `
        try {
          const r1 = isSpecificWeaknessAnswer({
            weakness: "I sometimes underestimate how long detailed testing will take.",
            improvementStep: "I now add a 20% time buffer to every testing estimate.",
          });
          window.__report('t1', r1 === true, 'a specific weakness with a real improvement step should return true');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r2 = isSpecificWeaknessAnswer({ weakness: "I work too hard", improvementStep: "I try to relax more." });
          window.__report('t2', r2 === false, 'a banned generic weakness should return false regardless of the improvement step');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const r3 = isSpecificWeaknessAnswer({
            weakness: "I struggle with public speaking in large groups.",
            improvementStep: "",
          });
          window.__report('t3', r3 === false, 'a missing improvement step should return false even with a specific weakness');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts a specific weakness paired with a real improvement step",
          hidden: false,
        },
        {
          id: "t2",
          description: "Rejects a banned generic weakness like 'I work too hard'",
          hidden: false,
        },
        {
          id: "t3",
          description: "Rejects a specific weakness that's missing an improvement step",
          hidden: true,
        },
      ],
      hints: [
        "Normalize the weakness the same way as earlier lessons — trim, then lowercase — before comparing it against the banned phrases list.",
        "The banned-phrase check should be an exact match against the normalized string, not a substring check, since a longer honest weakness might happen to contain similar words.",
        "The improvementStep check is independent of the weakness check — both need to pass for the whole answer to count as specific.",
      ],
    },
    independentExercise: {
      id: "cgd-9-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isWellStructuredIntroAnswer(answer) where answer is { present: string, past: string, future: string } (a 'tell me about yourself' answer using the present-past-future structure). Return true only if: (1) all three fields are non-empty after trimming; and (2) past is not the same as present when compared case-insensitively after trimming (past must add real information, not just repeat the present).",
      starterCode: `function isWellStructuredIntroAnswer(answer) {
  // TODO: check present, past, and future are all present and non-empty
  // TODO: check that past isn't just present restated (case-insensitive, trimmed comparison)
  // TODO: return true only if both checks pass
}
`,
      solutionCode: `function isWellStructuredIntroAnswer(answer) {
  const fields = ["present", "past", "future"];
  for (const f of fields) {
    if (typeof answer[f] !== "string" || answer[f].trim().length === 0) return false;
  }
  const presentNormalized = answer.present.trim().toLowerCase();
  const pastNormalized = answer.past.trim().toLowerCase();
  if (presentNormalized === pastNormalized) return false;
  return true;
}`,
      harness: `
        try {
          const r1 = isWellStructuredIntroAnswer({
            present: "I'm currently a support engineer on a five-person team.",
            past: "Before that, I spent two years in a QA role, where I first started scripting repetitive checks.",
            future: "I'm looking to move fully into a software engineering role.",
          });
          window.__report('t1', r1 === true, 'three distinct, non-empty fields should return true');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r2 = isWellStructuredIntroAnswer({
            present: "I'm currently a support engineer.",
            past: "I'm currently a support engineer.",
            future: "I'm looking to move into engineering.",
          });
          window.__report('t2', r2 === false, 'a past field that just repeats the present field should return false');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const r3 = isWellStructuredIntroAnswer({
            present: "I'm currently a support engineer.",
            past: "I spent two years in QA before this.",
            future: "",
          });
          window.__report('t3', r3 === false, 'a missing future field should return false');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts three distinct, non-empty present/past/future fields",
          hidden: false,
        },
        {
          id: "t2",
          description: "Rejects a past field that just repeats the present field",
          hidden: false,
        },
        { id: "t3", description: "Rejects an answer missing the future field", hidden: true },
      ],
      hints: [
        "This reuses the same two-part pattern as the weakness check: a presence check across all fields, plus a distinctness check between two specific fields.",
        "Normalize present and past the same way (trim, then lowercase) before comparing them for equality.",
        "Field presence should be checked for all three fields, but the repetition check only ever compares present against past.",
      ],
    },
    commonMistakes: [
      "Giving the exact same 'tell me about yourself' answer regardless of the specific role or company.",
      "Presenting a fake weakness disguised as a strength instead of a genuine, specific limitation.",
      "Answering 'why this role' with generic reasons that could apply to any company in any industry.",
      "Rambling through a full personal history instead of the present-past-future structure focused on what's relevant.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What structure does this lesson recommend for answering 'Tell me about yourself' in an interview?",
        choices: [
          "A full chronological biography starting from childhood",
          "Present, past, future: where you are now, relevant past experience, and what you're looking for next",
          "A list of every job you've ever held",
          "A single sentence with no detail",
        ],
        correctIndex: 1,
        explanation:
          "The present-past-future structure keeps the answer focused and directly useful to the interviewer, rather than an exhaustive history.",
      },
      {
        id: "q2",
        prompt:
          "Why are answers like 'I work too hard' or 'I'm a perfectionist' considered weak responses to the greatest-weakness question?",
        choices: [
          "They are too specific",
          "They function as disguised strengths rather than honest, specific weaknesses, and interviewers recognize this pattern immediately",
          "They are too long",
          "They always violate interview rules",
        ],
        correctIndex: 1,
        explanation:
          "These answers avoid naming a real limitation, which interviewers hear often enough to recognize as evasive rather than genuinely self-aware.",
      },
      {
        id: "q3",
        prompt: "What makes an answer to 'why this role' specific rather than generic?",
        choices: [
          "Mentioning that you are a hard worker",
          "Connecting something genuinely true about the role or organization to something genuinely true about your own background or goals",
          "Reciting the job posting back to the interviewer word for word",
          "Avoiding any mention of the organization by name",
        ],
        correctIndex: 1,
        explanation:
          "A specific answer draws a real connection between the candidate and the particular role, rather than offering generic enthusiasm that could apply to any job.",
      },
    ],
    takeaway:
      "Common interview questions have a predictable underlying intent, and a specific, honest answer to that intent is remembered far more than a polished, generic one.",
    summary:
      "'Tell me about yourself,' 'greatest weakness,' and 'why this role' are each asking something more specific than their literal wording. Structured, specific, honest answers — a present-past-future intro, a real weakness with a genuine improvement step, a real connection to the role — outperform generic ones that could apply to any candidate.",
    nextLessonSlug: "handling-difficult-questions",
  },
  {
    id: "cgd-handling-difficult-questions",
    slug: "handling-difficult-questions",
    title: "Handling Difficult or Off-Topic Questions",
    description:
      "Structured techniques for answering questions you don't know and professionally redirecting inappropriate ones.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 9,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["cgd-common-interview-questions"],
    objectives: [
      "Apply a structured technique for answering a question you don't know",
      "Identify an appropriate way to redirect an inappropriate question professionally",
      "Distinguish a composed response from a bluffing or defensive one",
    ],
    skills: ["career-readiness", "composure-under-pressure"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["difficult questions", "composure", "redirecting questions", "handling pressure"],
    explanation: `Not every interview question will be one you're fully ready for, and how you handle that moment often matters more than the content of a perfect answer would have. Two situations come up often enough to prepare for deliberately: a question you genuinely don't know the answer to, and a question that's inappropriate or off-topic.

When you don't know something, the least effective response is **bluffing** — guessing confidently and hoping it's close enough. Interviewers, especially in technical settings, can usually tell, and a confident wrong answer reads worse than an honest "I'm not sure." The other ineffective extreme is **shutting down** entirely — going silent, or simply saying "I don't know" and stopping there, which gives the interviewer nothing to evaluate at all.

The more effective structure has three parts: **admit the uncertainty honestly**, **reason through what you do know out loud**, and **offer a concrete follow-up**. For example: "I haven't worked directly with that specific tool, but based on how similar tools I have used typically handle this kind of problem, my guess would be it uses a caching layer to avoid repeating that lookup — I'd want to confirm that by checking the documentation before relying on it." This shows the interviewer your actual reasoning process, which is often what they're trying to evaluate in the first place, even when you're missing a specific fact.

**Inappropriate or off-topic questions** are a different problem. Questions touching on age, marital status, family planning, religion, or similar personal characteristics are not job-relevant, and in many places aren't legally appropriate for an interviewer to ask. Reacting defensively or answering the personal detail directly are both weaker options than a professional **redirect**: acknowledging the question briefly without answering the personal part, and steering the conversation back to something job-relevant. For example, a question about family plans might be redirected with something like, "I'm fully committed to being available for this role — is there something specific about the schedule or travel expectations you'd like me to speak to?" This keeps the exchange professional without escalating it into a confrontation.

**Staying composed** under either kind of pressure is itself a learnable habit, not a fixed personality trait. A short pause before responding — even a few seconds — signals thoughtfulness rather than hesitation, and gives you time to choose one of these structured responses instead of reacting on instinct. Candidates often assume any pause looks bad; in practice, a brief, deliberate pause almost always reads better than a rushed, unstructured answer.`,
    visual: {
      kind: "table",
      title: "Two difficult-question situations, two structures",
      description:
        "Don't know the answer: admit uncertainty leads to reason aloud leads to offer a follow-up. Inappropriate question: acknowledge briefly leads to redirect to job-relevant ground.",
    },
    example: {
      language: "javascript",
      description:
        "Checks whether a response to an unknown question followed the honest three-part structure.",
      code: `function isHonestUnknownResponse(response) {
  return (
    response.admitsUncertainty === true &&
    response.offersReasoningAttempt === true &&
    response.offersFollowUp === true
  );
}
// Example: isHonestUnknownResponse({ admitsUncertainty: true, offersReasoningAttempt: true, offersFollowUp: false }) -> false`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-10-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isComposedUnknownAnswer(response) where response is { claimsToKnow: boolean, attemptsReasoning: boolean, offersFollowUp: boolean }. Return true only if claimsToKnow is false AND attemptsReasoning is true AND offersFollowUp is true.",
      starterCode: `function isComposedUnknownAnswer(response) {
  // TODO: return true only if claimsToKnow is false,
  // attemptsReasoning is true, and offersFollowUp is true
}
`,
      solutionCode: `function isComposedUnknownAnswer(response) {
  return (
    response.claimsToKnow === false &&
    response.attemptsReasoning === true &&
    response.offersFollowUp === true
  );
}`,
      harness: `
        try { window.__report('t1', isComposedUnknownAnswer({ claimsToKnow: false, attemptsReasoning: true, offersFollowUp: true }) === true, 'honestly admitting uncertainty, reasoning aloud, and offering a follow-up should return true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isComposedUnknownAnswer({ claimsToKnow: true, attemptsReasoning: true, offersFollowUp: true }) === false, 'bluffing by claiming to know should return false'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isComposedUnknownAnswer({ claimsToKnow: false, attemptsReasoning: false, offersFollowUp: true }) === false, 'admitting uncertainty but never reasoning aloud should return false'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        { id: "t1", description: "Accepts the full honest three-part response", hidden: false },
        {
          id: "t2",
          description: "Rejects a response where the candidate bluffs by claiming to know",
          hidden: false,
        },
        {
          id: "t3",
          description: "Rejects a response that admits uncertainty but never reasons aloud",
          hidden: true,
        },
      ],
      hints: [
        "Note that claimsToKnow needs to equal false for this to pass — a composed unknown answer starts by NOT claiming to know.",
        "The other two conditions are straightforward true checks, combined with the first using logical AND.",
        "Write out what a passing response object looks like on paper first, then translate each field's expected value directly into your condition.",
      ],
    },
    independentExercise: {
      id: "cgd-10-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write redirectsInappropriateQuestion(response) where response is { questionTopic: string, answeredPersonalDetail: boolean, redirectedToJobQualification: boolean }. Define inappropriateTopics as ['age', 'marital-status', 'religion', 'family-planning']. If response.questionTopic is one of these inappropriate topics, return true only if answeredPersonalDetail is false AND redirectedToJobQualification is true. If questionTopic is NOT one of these inappropriate topics, always return true (answering a legitimate, job-relevant question directly is fine, regardless of the other two fields).",
      starterCode: `function redirectsInappropriateQuestion(response) {
  // TODO: define the list of inappropriate topics
  // TODO: if questionTopic is inappropriate, require answeredPersonalDetail === false AND redirectedToJobQualification === true
  // TODO: if questionTopic is NOT inappropriate, always return true
}
`,
      solutionCode: `function redirectsInappropriateQuestion(response) {
  const inappropriateTopics = ["age", "marital-status", "religion", "family-planning"];
  if (inappropriateTopics.includes(response.questionTopic)) {
    return response.answeredPersonalDetail === false && response.redirectedToJobQualification === true;
  }
  return true;
}`,
      harness: `
        try {
          const r1 = redirectsInappropriateQuestion({ questionTopic: "age", answeredPersonalDetail: false, redirectedToJobQualification: true });
          window.__report('t1', r1 === true, 'redirecting away from an inappropriate topic without answering it should return true');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r2 = redirectsInappropriateQuestion({ questionTopic: "religion", answeredPersonalDetail: true, redirectedToJobQualification: false });
          window.__report('t2', r2 === false, 'directly answering an inappropriate personal question should return false');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const r3 = redirectsInappropriateQuestion({ questionTopic: "availability", answeredPersonalDetail: true, redirectedToJobQualification: false });
          window.__report('t3', r3 === true, 'a legitimate, job-relevant topic should always return true regardless of the other fields');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts a proper redirect away from an inappropriate topic",
          hidden: false,
        },
        {
          id: "t2",
          description: "Rejects directly answering an inappropriate personal question",
          hidden: false,
        },
        {
          id: "t3",
          description: "Always accepts a legitimate topic regardless of the other two fields",
          hidden: true,
        },
      ],
      hints: [
        "Check questionTopic against the inappropriate-topics list first, using .includes() the same way earlier lessons checked banned phrases.",
        "The redirect requirement (not answering the personal detail, and redirecting instead) only applies inside the 'inappropriate topic' branch.",
        "For any topic not on the inappropriate list, the function should short-circuit to true without even looking at the other two fields.",
      ],
    },
    commonMistakes: [
      "Bluffing with a confident but made-up answer instead of honestly reasoning through what is actually known.",
      "Going silent or stopping at 'I don't know,' which gives the interviewer nothing further to evaluate.",
      "Answering an inappropriate personal question directly instead of redirecting to job-relevant qualifications.",
      "Reacting visibly defensively or argumentatively when challenged, instead of pausing and responding calmly.",
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "What is the recommended structure for answering a question you genuinely don't know?",
        choices: [
          "Guess confidently so you sound sure of yourself",
          "Admit the uncertainty honestly, reason through what you do know out loud, and offer a concrete follow-up",
          "Say 'I don't know' and wait for the next question",
          "Change the subject to something you're more comfortable discussing",
        ],
        correctIndex: 1,
        explanation:
          "This structure is more effective than bluffing (which can be spotted) or shutting down (which gives the interviewer nothing to evaluate).",
      },
      {
        id: "q2",
        prompt:
          "What is the recommended way to handle a question about an inappropriate personal topic, like family planning?",
        choices: [
          "Answer the personal detail directly to avoid seeming evasive",
          "Acknowledge the question briefly without answering the personal part, and redirect to job-relevant ground",
          "Refuse to speak for the rest of the interview",
          "End the interview immediately without further comment",
        ],
        correctIndex: 1,
        explanation:
          "A professional redirect keeps the exchange respectful without escalating it, while avoiding answering the personal, non-job-relevant part of the question.",
      },
      {
        id: "q3",
        prompt:
          "Why can a brief, deliberate pause before answering a hard question be more effective than answering immediately?",
        choices: [
          "It uses up the interviewer's time on purpose",
          "It signals thoughtfulness and gives you time to structure a response, rather than reacting on instinct",
          "Pausing is always required by interview etiquette rules",
          "It guarantees the interviewer will forget the question",
        ],
        correctIndex: 1,
        explanation:
          "A short pause generally reads as considered rather than hesitant, and gives you a moment to apply a structured response instead of rushing.",
      },
    ],
    takeaway:
      "How you handle a question you can't fully answer often matters more than the perfect answer you didn't have — honesty plus visible reasoning beats a confident guess.",
    summary:
      "For a question you don't know, admit uncertainty, reason through what you do know out loud, and offer a follow-up, instead of bluffing or shutting down. For an inappropriate personal question, acknowledge it briefly and redirect to job-relevant ground rather than answering it directly or reacting defensively.",
    nextLessonSlug: "workplace-professionalism",
  },
  {
    id: "cgd-workplace-professionalism",
    slug: "workplace-professionalism",
    title: "Workplace Communication and Professionalism",
    description:
      "How to structure status updates and feedback, and when to escalate a blocker as a new professional.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 10,
    difficulty: "intermediate",
    estimatedMinutes: 20,
    prerequisites: ["cgd-handling-difficult-questions"],
    objectives: [
      "Structure a professional status update covering progress, blockers, and next steps",
      "Distinguish actionable, behavior-focused feedback from a vague personal judgment",
      "Determine when a blocker should be escalated rather than worked on alone",
    ],
    skills: ["career-readiness", "workplace-professionalism"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["status updates", "feedback", "escalation", "workplace norms", "new hire"],
    explanation: `The communication skills that get you hired keep mattering once you start the job — arguably more, since workplace communication happens constantly and in writing as much as in speech.

**Status updates** are one of the most common professional documents you'll write, and a useful one has three parts: **progress** (what's actually been done), **blockers** (what's stopping further progress, if anything), and **next steps** (what happens next, and roughly when). A status update that only lists completed tasks and omits blockers can be actively misleading — it lets a stuck project look fine right up until a deadline is missed, because no one flagged the problem while there was still time to address it.

**Feedback**, both giving and receiving it, follows a similar principle: it should be specific and about behavior, not about the person. "You're not detail-oriented" is a judgment about someone's character that they can't directly act on. "The last two reports had numbers that didn't match the source spreadsheet — can we add a quick double-check step before sending?" describes a specific, observable behavior and pairs it with something concrete to change. The second version is far more likely to actually change what happens next, which is the entire point of giving feedback in the first place.

**Escalating a blocker** — telling someone, usually a manager, that you're stuck and need help — is a skill many new professionals are hesitant to use, out of a (usually mistaken) worry that asking for help looks incompetent. In practice, sitting silently on a blocker for days, especially one that affects other people's work, is the version that actually damages trust. A reasonable norm is to attempt to resolve something yourself first, but to escalate once you've spent a meaningful amount of time stuck, or immediately if the blocker is stopping someone else's work too — waiting on someone else is a very different situation from quietly struggling alone.

Finally, **workplace norms** take real observation to learn, especially as a new hire. Every team has unwritten conventions — how quickly people are expected to respond to messages, how meetings are run, how decisions actually get made versus how the org chart suggests they get made. A new hire who immediately tries to change established processes before understanding why they exist tends to create friction, even when the suggested change is genuinely reasonable. Asking clarifying questions early, and observing before proposing changes, is not passivity — it's how you learn enough about the actual system to make a change that will actually stick, rather than one that ignores a constraint you didn't know existed yet.`,
    visual: {
      kind: "table",
      title: "Anatomy of a status update",
      description:
        "Progress (what's actually done) leads to Blockers (what's stopping further progress) leads to Next steps (what happens next, and roughly when).",
    },
    example: {
      language: "javascript",
      description:
        "Checks whether a status update object has all three required components filled in.",
      code: `function hasStatusUpdateComponents(update) {
  const fields = ["progress", "blockers", "nextSteps"];
  return fields.every((f) => typeof update[f] === "string" && update[f].trim().length > 0);
}
// Example: hasStatusUpdateComponents({ progress: "API integration is 80% complete.", blockers: "Waiting on staging credentials.", nextSteps: "Finish integration once credentials arrive." }) -> true`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-11-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isActionableFeedback(feedback) where feedback is { focusesOnBehavior: boolean, isSpecific: boolean, includesSuggestion: boolean }. Return true only if all three fields are true.",
      starterCode: `function isActionableFeedback(feedback) {
  // TODO: return true only if focusesOnBehavior, isSpecific,
  // and includesSuggestion are all true
}
`,
      solutionCode: `function isActionableFeedback(feedback) {
  return (
    feedback.focusesOnBehavior === true &&
    feedback.isSpecific === true &&
    feedback.includesSuggestion === true
  );
}`,
      harness: `
        try { window.__report('t1', isActionableFeedback({ focusesOnBehavior: true, isSpecific: true, includesSuggestion: true }) === true, 'feedback meeting all three criteria should return true'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', isActionableFeedback({ focusesOnBehavior: true, isSpecific: false, includesSuggestion: true }) === false, 'vague, unspecific feedback should return false'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', isActionableFeedback({ focusesOnBehavior: false, isSpecific: true, includesSuggestion: true }) === false, 'feedback that is really a character judgment, not behavior-focused, should return false'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts feedback that is behavior-focused, specific, and actionable",
          hidden: false,
        },
        { id: "t2", description: "Rejects feedback that isn't specific", hidden: false },
        { id: "t3", description: "Rejects feedback that isn't focused on behavior", hidden: true },
      ],
      hints: [
        "This is the same three-boolean-AND pattern used for the GD rebuttal check earlier in this course.",
        "All three fields need to be exactly true — there's no field here that's expected to be false.",
        "Write the three comparisons on separate lines first, then join them with && once you're confident each one is correct.",
      ],
    },
    independentExercise: {
      id: "cgd-11-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write shouldEscalateBlocker(blocker) where blocker is { hoursBlocked: number, triedSelfResolution: boolean, blocksOthers: boolean }. Return true if (hoursBlocked is at least 4 AND triedSelfResolution is true) OR blocksOthers is true. Return false otherwise.",
      starterCode: `function shouldEscalateBlocker(blocker) {
  // TODO: escalate if hoursBlocked >= 4 AND triedSelfResolution is true
  // TODO: also escalate if blocksOthers is true, regardless of the other two fields
  // TODO: otherwise, do not escalate
}
`,
      solutionCode: `function shouldEscalateBlocker(blocker) {
  const selfResolutionExhausted = blocker.hoursBlocked >= 4 && blocker.triedSelfResolution === true;
  return selfResolutionExhausted || blocker.blocksOthers === true;
}`,
      harness: `
        try { window.__report('t1', shouldEscalateBlocker({ hoursBlocked: 5, triedSelfResolution: true, blocksOthers: false }) === true, 'being blocked 5 hours after trying to self-resolve should trigger escalation'); } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try { window.__report('t2', shouldEscalateBlocker({ hoursBlocked: 1, triedSelfResolution: false, blocksOthers: false }) === false, 'a brief blocker with no self-resolution attempt and no impact on others should not escalate yet'); } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try { window.__report('t3', shouldEscalateBlocker({ hoursBlocked: 0, triedSelfResolution: false, blocksOthers: true }) === true, 'a blocker that affects others should escalate immediately, regardless of hours or self-resolution attempts'); } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Escalates after a meaningful attempt to self-resolve over enough time",
          hidden: false,
        },
        {
          id: "t2",
          description: "Does not escalate a brief, unattempted, isolated blocker",
          hidden: false,
        },
        {
          id: "t3",
          description:
            "Escalates immediately when the blocker affects others, regardless of hours or self-resolution",
          hidden: true,
        },
      ],
      hints: [
        "Break this into two named pieces: whether self-resolution has genuinely been exhausted, and whether the blocker affects other people.",
        "The two pieces should be combined with OR, since either one alone is a valid reason to escalate.",
        "The 'affects others' condition should override the hours/self-resolution requirement entirely — it doesn't need hoursBlocked to be high at all.",
      ],
    },
    commonMistakes: [
      "Sending a status update that lists only completed tasks and omits real blockers, letting problems surface too late.",
      "Giving feedback as a character judgment ('you're not a team player') instead of describing a specific, changeable behavior.",
      "Sitting on a blocker for days without telling anyone, especially one that's also stopping someone else's work.",
      "Trying to overhaul established team processes as a new hire before understanding why they exist.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What three components does a useful status update typically include?",
        choices: [
          "Progress, blockers, and next steps",
          "Praise, criticism, and a summary",
          "A greeting, a joke, and a sign-off",
          "Deadlines, salaries, and job titles",
        ],
        correctIndex: 0,
        explanation:
          "A complete status update covers what's been done, what's stopping further progress, and what happens next.",
      },
      {
        id: "q2",
        prompt:
          "Why is 'You're not detail-oriented' considered weaker feedback than pointing out a specific pattern in recent reports?",
        choices: [
          "It's too specific to be useful",
          "It's a judgment about character rather than a specific, actionable behavior the person can change",
          "It's factually always false",
          "It uses too few words",
        ],
        correctIndex: 1,
        explanation:
          "Feedback about a specific behavior gives the person something concrete to change; a character judgment does not.",
      },
      {
        id: "q3",
        prompt:
          "According to this lesson, when is escalating a blocker to a manager generally appropriate?",
        choices: [
          "Never; blockers should always be resolved alone",
          "After a reasonable attempt to resolve it yourself, or immediately if it's also blocking someone else's work",
          "Only after the project has already missed its deadline",
          "Only if a manager specifically asks for a status update",
        ],
        correctIndex: 1,
        explanation:
          "Escalating after a genuine attempt to self-resolve, or sooner if others are affected, is presented as the reasonable norm — sitting silently on a blocker for days is the more damaging pattern.",
      },
    ],
    takeaway:
      "Professional communication doesn't stop mattering once you're hired — flagging blockers early and giving specific, behavior-focused feedback are the same underlying skill applied at work.",
    summary:
      "A useful status update covers progress, blockers, and next steps. Actionable feedback focuses on specific behavior, not character. Escalating a blocker after a genuine attempt to self-resolve, or immediately if it affects others, builds more trust than struggling silently, and new hires generally learn more by observing workplace norms before trying to change them.",
    nextLessonSlug: "mock-career-readiness-practice",
  },
  {
    id: "cgd-mock-career-readiness-practice",
    slug: "mock-career-readiness-practice",
    title: "Mock Career-Readiness Practice",
    description:
      "A capstone that combines resume, group discussion, and interview technique checks from earlier lessons into one integrated self-practice exercise.",
    trackSlug: "placement-prep",
    courseSlug: "career-and-gd-preparation",
    order: 11,
    difficulty: "intermediate",
    estimatedMinutes: 24,
    prerequisites: ["cgd-workplace-professionalism"],
    objectives: [
      "Apply resume bullet criteria and STAR structure checks together on a combined practice profile",
      "Apply GD contribution structure checks and weakness-answer checks together within one integrated scenario",
      "Identify which specific component of a combined practice submission is incomplete",
    ],
    skills: ["career-readiness", "integrated-practice"],
    tech: [],
    author: "VisaSparkSchools Curriculum Team",
    reviewer: "VisaSparkSchools Curriculum Team",
    lastReviewed: "2026-08-04",
    references: [],
    keywords: ["capstone", "mock practice", "self-practice", "integrated review"],
    explanation: `This lesson is a capstone: a chance to practice several of this course's techniques together, the way they'd actually show up in a real job search — a resume, a group discussion, and an interview don't happen in isolation from each other, and neither should your preparation.

Before anything else, one thing needs to be stated plainly: **this practice is self-directed rehearsal, not an assessment.** Nothing on this platform proctors, scores your real communication ability, or certifies you as interview-ready. Every check in this lesson — and every check throughout this entire course — verifies specific, visible, rule-based structural criteria that you can read and understand yourself: does a STAR answer have all four fields filled in with enough detail, does a resume bullet start with an approved action verb and include a number, does a group-discussion point include a claim, reasoning, and evidence. None of these checks evaluate your actual charisma, writing quality, or how a real interviewer would perceive you — they check whether the concrete building blocks this course taught are present. Treat a completed exercise here the way you'd treat a completed practice set: useful rehearsal, not proof of readiness by itself.

With that framing clear, this lesson combines components you've already built separately:

- A **resume bullet**, checked against the same action-verb-plus-number structure from the resume lesson.
- A **STAR-format behavioral answer**, checked against the same four-field completeness rule from the STAR method lesson.
- A **group-discussion point**, checked against the same claim-reasoning-evidence structure from the GD lessons, alongside a **weakness answer**, checked against the same specificity rule from the common-interview-questions lesson.

Working on these together, rather than one at a time, surfaces something worth noticing: a strong candidate profile is usually **consistent** across these pieces, not just individually correct. If your resume bullet claims you led a project, your STAR answer about leadership should plausibly be describing the same kind of work — not a completely different, contradictory version of your background. Real interviewers and evaluators do notice when a candidate's resume, spoken answers, and stated goals don't quite add up to the same coherent person.

A last honest note: rehearsing structure is necessary but not sufficient. These checks confirm the scaffolding — the claim has all its pieces, the STAR answer has all four fields — but the judgment of whether a specific example is actually your strongest one, or whether a specific phrasing genuinely sounds like you, is something only you (and, ideally, people who know you) can evaluate. Use this capstone to make sure the structural pieces are all in place, and then keep practicing the parts a structural check can't see: saying it out loud, adjusting it for a specific real opportunity, and getting feedback from an actual person.`,
    visual: {
      kind: "table",
      title: "What this capstone reuses",
      description:
        "Resume bullet check (from the resume lesson) plus STAR completeness check (from the STAR method lesson) plus GD claim-reasoning-evidence check (from the GD argument lesson) plus weakness-answer specificity check (from the common-interview-questions lesson), applied together to one practice profile.",
    },
    example: {
      language: "javascript",
      description:
        "Combines the resume-bullet check and the STAR-completeness check from earlier lessons into one snapshot of a practice profile.",
      code: `function combinedReadinessSnapshot(profile) {
  const actionVerbs = ["Led", "Built", "Reduced", "Increased", "Managed", "Designed", "Launched", "Resolved", "Automated", "Improved"];
  const bulletOk = actionVerbs.includes(profile.bullet.trim().split(/\\s+/)[0]) && /\\d/.test(profile.bullet);
  const starFields = ["situation", "task", "action", "result"];
  const starOk = starFields.every((f) => typeof profile.star[f] === "string" && profile.star[f].trim().length >= 10);
  return { bulletOk, starOk };
}
// Example: combinedReadinessSnapshot({ bullet: "Automated weekly reporting, saving 6 hours per week", star: { situation: "A recurring report took a full day to assemble manually.", task: "Reduce the manual effort without losing accuracy.", action: "I wrote a script that pulled and formatted the data automatically.", result: "The report now takes 20 minutes and has zero manual errors." } }) -> { bulletOk: true, starOk: true }`,
      editable: false,
    },
    guidedExercise: {
      id: "cgd-12-guided",
      kind: "guided",
      language: "javascript",
      prompt:
        "Write isReadyResumeAndStarPair(profile) where profile is { bullet: string, star: { situation, task, action, result } }. Combine two earlier checks: the bullet must start with one of these approved action verbs -- 'Led', 'Built', 'Reduced', 'Increased', 'Managed', 'Designed', 'Launched', 'Resolved', 'Automated', 'Improved' -- and contain at least one digit (from the resume lesson); AND all four STAR fields must be present and at least 10 characters long after trimming (from the STAR method lesson). Return true only if both the bullet check and the STAR check pass.",
      starterCode: `function isReadyResumeAndStarPair(profile) {
  // TODO: check the bullet starts with an approved action verb and contains a digit
  // TODO: check all four STAR fields are present and at least 10 characters after trimming
  // TODO: return true only if BOTH checks pass
}
`,
      solutionCode: `function isReadyResumeAndStarPair(profile) {
  const actionVerbs = [
    "Led", "Built", "Reduced", "Increased", "Managed",
    "Designed", "Launched", "Resolved", "Automated", "Improved",
  ];
  const firstWord = profile.bullet.trim().split(/\\s+/)[0];
  const bulletOk = actionVerbs.includes(firstWord) && /\\d/.test(profile.bullet);

  const starFields = ["situation", "task", "action", "result"];
  const starOk = starFields.every(
    (f) => typeof profile.star[f] === "string" && profile.star[f].trim().length >= 10,
  );

  return bulletOk && starOk;
}`,
      harness: `
        const validStar = {
          situation: "A recurring report took a full day to assemble manually.",
          task: "Reduce the manual effort without losing accuracy.",
          action: "I wrote a script that pulled and formatted the data automatically.",
          result: "The report now takes 20 minutes and has zero manual errors.",
        };
        try {
          const r1 = isReadyResumeAndStarPair({ bullet: "Automated weekly reporting, saving 6 hours per week", star: validStar });
          window.__report('t1', r1 === true, 'a strong bullet paired with a complete STAR answer should return true');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const r2 = isReadyResumeAndStarPair({ bullet: "Automated weekly reporting", star: validStar });
          window.__report('t2', r2 === false, 'a bullet with no digit should fail even with a complete STAR answer');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const incompleteStar = Object.assign({}, validStar, { task: "" });
          const r3 = isReadyResumeAndStarPair({ bullet: "Automated weekly reporting, saving 6 hours per week", star: incompleteStar });
          window.__report('t3', r3 === false, 'a strong bullet paired with an incomplete STAR answer should still fail overall');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts a strong bullet paired with a complete STAR answer",
          hidden: false,
        },
        {
          id: "t2",
          description: "Rejects a bullet missing a digit, even with a complete STAR answer",
          hidden: false,
        },
        {
          id: "t3",
          description: "Rejects a strong bullet paired with an incomplete STAR answer",
          hidden: true,
        },
      ],
      hints: [
        "Reuse the exact same bullet-checking logic from the resume lesson and the exact same STAR field-length logic from the STAR method lesson -- you're combining two checks you've already written before, not inventing new rules.",
        "Compute each half's boolean result separately (for example, bulletOk and starOk) before combining them, so it's easy to see which half is failing.",
        "The final return value should be true only when both halves are true -- a single logical AND between the two computed booleans.",
      ],
    },
    independentExercise: {
      id: "cgd-12-independent",
      kind: "independent",
      language: "javascript",
      prompt:
        "Write isReadyGdAndWeaknessPair(practice) where practice is { gdPoint: { claim, reasoning, evidence }, weaknessAnswer: { weakness, improvementStep } }. Combine two earlier checks: the gdPoint must have all three fields non-empty AND reasoning must not equal claim (case-insensitive, trimmed) -- from the GD argument-structuring lesson; AND the weaknessAnswer's weakness must be non-empty and not exactly match one of these banned generic phrases (case-insensitive, trimmed) -- 'i work too hard', \"i'm a perfectionist\", 'i care too much' -- with an improvementStep at least 10 characters long -- from the common-interview-questions lesson. Return true only if both the gdPoint check and the weaknessAnswer check pass.",
      starterCode: `function isReadyGdAndWeaknessPair(practice) {
  // TODO: check gdPoint has claim, reasoning, evidence non-empty, and reasoning !== claim (normalized)
  // TODO: check weaknessAnswer's weakness is non-empty, not a banned generic phrase, with an improvementStep >= 10 chars
  // TODO: return true only if BOTH checks pass
}
`,
      solutionCode: `function isReadyGdAndWeaknessPair(practice) {
  const gdPoint = practice.gdPoint;
  const gdFields = ["claim", "reasoning", "evidence"];
  let gdOk = true;
  for (const f of gdFields) {
    if (typeof gdPoint[f] !== "string" || gdPoint[f].trim().length === 0) gdOk = false;
  }
  if (gdOk && gdPoint.claim.trim().toLowerCase() === gdPoint.reasoning.trim().toLowerCase()) {
    gdOk = false;
  }

  const weaknessAnswer = practice.weaknessAnswer;
  const genericWeaknesses = ["i work too hard", "i'm a perfectionist", "i care too much"];
  let weaknessOk =
    typeof weaknessAnswer.weakness === "string" && weaknessAnswer.weakness.trim().length > 0;
  if (weaknessOk && genericWeaknesses.includes(weaknessAnswer.weakness.trim().toLowerCase())) {
    weaknessOk = false;
  }
  if (
    typeof weaknessAnswer.improvementStep !== "string" ||
    weaknessAnswer.improvementStep.trim().length < 10
  ) {
    weaknessOk = false;
  }

  return gdOk && weaknessOk;
}`,
      harness: `
        const validGdPoint = {
          claim: "Public transit funding should increase.",
          reasoning: "Higher funding would reduce commute times and traffic congestion citywide.",
          evidence: "Cities that increased transit funding saw ridership grow within two years.",
        };
        const validWeakness = {
          weakness: "I sometimes underestimate how long detailed testing will take.",
          improvementStep: "I now add a 20% time buffer to every testing estimate.",
        };
        try {
          const r1 = isReadyGdAndWeaknessPair({ gdPoint: validGdPoint, weaknessAnswer: validWeakness });
          window.__report('t1', r1 === true, 'a complete GD point paired with a specific weakness answer should return true');
        } catch (e) { window.__report('t1', false, 'threw: ' + e.message); }
        try {
          const repeatedGdPoint = Object.assign({}, validGdPoint, { reasoning: validGdPoint.claim });
          const r2 = isReadyGdAndWeaknessPair({ gdPoint: repeatedGdPoint, weaknessAnswer: validWeakness });
          window.__report('t2', r2 === false, 'a GD point whose reasoning just repeats the claim should fail overall');
        } catch (e) { window.__report('t2', false, 'threw: ' + e.message); }
        try {
          const bannedWeakness = { weakness: "I work too hard", improvementStep: "I try to relax more on weekends." };
          const r3 = isReadyGdAndWeaknessPair({ gdPoint: validGdPoint, weaknessAnswer: bannedWeakness });
          window.__report('t3', r3 === false, 'a banned generic weakness should fail overall even with a complete GD point');
        } catch (e) { window.__report('t3', false, 'threw: ' + e.message); }
      `,
      tests: [
        {
          id: "t1",
          description: "Accepts a complete GD point paired with a specific weakness answer",
          hidden: false,
        },
        {
          id: "t2",
          description: "Rejects a GD point whose reasoning just repeats its claim",
          hidden: false,
        },
        {
          id: "t3",
          description: "Rejects a banned generic weakness even with an otherwise complete GD point",
          hidden: true,
        },
      ],
      hints: [
        "This combines the claim-vs-reasoning distinctness check from the GD argument-structuring lesson with the banned-generic-weakness check from the common-interview-questions lesson -- both of which you've already written before in this course.",
        "Compute each half independently as its own boolean (gdOk and weaknessOk), checking presence first and then the more specific rule (distinctness, or the banned-phrase list) only once presence has been confirmed.",
        "The final result should be true only when both halves are true at once -- if either the GD point or the weakness answer fails its own check, the whole pair should fail.",
      ],
    },
    commonMistakes: [
      "Treating this capstone practice as an official pass/fail certification rather than self-directed rehearsal.",
      "Only practicing one component, such as the resume, while skipping GD and interview rehearsal entirely.",
      "Reusing the exact same STAR story for every single interview question without adapting it to what's actually being asked.",
      "Submitting a resume bullet and a GD point or weakness answer that describe two contradictory, unrelated versions of yourself.",
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does this platform's mock career-readiness practice actually check?",
        choices: [
          "Your real charisma and how a human interviewer would perceive you",
          "Concrete, rule-based structural criteria you can see and understand, like whether a STAR answer has all four fields filled in",
          "Nothing; the exercises are purely decorative",
          "Your final employability score, certified for use in job applications",
        ],
        correctIndex: 1,
        explanation:
          "Every exercise on this platform, including this capstone, checks visible, rule-based structural criteria -- it never claims to assess or certify real communication skill or employability.",
      },
      {
        id: "q2",
        prompt:
          "Why does this lesson emphasize consistency across a candidate's resume, GD contributions, and interview answers?",
        choices: [
          "Because evaluators never actually notice inconsistencies",
          "Because pieces that plausibly describe the same real background and goals tend to read as more coherent and credible together",
          "Because inconsistency is required to seem well-rounded",
          "Because each document should describe a completely unrelated version of the candidate",
        ],
        correctIndex: 1,
        explanation:
          "Pieces that plausibly reflect the same real experience and goals read as more coherent than contradictory, disconnected versions of a candidate's background.",
      },
      {
        id: "q3",
        prompt:
          "According to this lesson, what should a learner do after passing this capstone's structural checks?",
        choices: [
          "Consider themselves certified as fully interview-ready with nothing left to practice",
          "Continue practicing the parts a structural check can't see, such as saying answers out loud and getting feedback from an actual person",
          "Stop practicing entirely, since the checks are a complete substitute for real preparation",
          "Assume the platform has verified their real communication skill",
        ],
        correctIndex: 1,
        explanation:
          "The structural checks confirm the scaffolding is in place, but judgment about delivery, fit, and authenticity still requires further practice and real human feedback.",
      },
    ],
    takeaway:
      "Passing every structural check in this capstone confirms your building blocks are in place -- it is rehearsal, not a verdict, and real practice with real people still matters after it.",
    summary:
      "This capstone combines earlier lessons' structural checks -- a resume bullet plus a STAR answer, and a GD point plus a weakness answer -- into one integrated practice profile, explicitly framed as self-directed rehearsal rather than an official assessment. A consistent, coherent profile across all the pieces reads more credibly than individually correct but contradictory ones, and structural completeness is a starting point, not a finish line.",
  },
];
