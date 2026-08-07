import type { CountryRoadmapInput } from "@/lib/study-abroad/types";

/**
 * United States study-abroad roadmap. This is the reference implementation
 * for the other five countries -- see docs/product-expansion/DECISIONS.md's
 * "Study-abroad content sourcing" note for how official sources and step
 * text were assembled. Every fee/timing figure below is phrased in general,
 * non-guaranteed terms rather than a bare number presented as universal
 * fact, since these change and vary by school/consulate/nationality.
 */
export const unitedStatesRoadmap: CountryRoadmapInput = {
  countrySlug: "united-states",
  countryName: "United States",
  summary:
    "The US has thousands of accredited institutions and the world's largest international student population, with wide variation in cost, selectivity, and location. Most degree study happens on an F-1 student visa, tied to a specific school through the SEVIS system.",
  degreeLevels: ["bachelors", "masters", "phd"],
  lastReviewed: "2026-08-07",
  officialSources: [
    { label: "Study in the States (DHS/SEVP)", url: "https://studyinthestates.dhs.gov/" },
    {
      label: "USCIS — Students and Exchange Visitors",
      url: "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors",
    },
    {
      label: "U.S. Department of State — Student Visas",
      url: "https://travel.state.gov/content/travel/en/us-visas/study-exchange-visitor-visas.html",
    },
  ],
  steps: [
    {
      stepId: "clarify-goals",
      whyItMatters:
        "US admissions and cost structures differ sharply by degree level -- undergraduate admissions weigh a broad application, while graduate admissions weigh research fit and prior specialization. Deciding your degree level and rough field early shapes every later step.",
      whatToDo:
        "Write down your target degree level, field, intended start term, and a rough budget ceiling. Note whether you're open to any US region or have constraints (climate, cost of living, proximity to family).",
      commonDocuments: [],
      commonMistakes: [
        "Starting to shortlist schools before deciding bachelor's vs. master's vs. PhD, then discovering the application timelines and required tests differ.",
        "Ignoring cost of living differences between regions, which can rival or exceed tuition differences.",
      ],
      checklist: [
        "Degree level and field decided",
        "Target start term set",
        "Rough total budget range written down",
      ],
      typicalTiming: "12-18 months before your intended start term, for a first pass.",
    },
    {
      stepId: "research-countries",
      whyItMatters:
        'Even within "study in the US," public vs. private institutions, community-college transfer pathways, and research-intensive vs. teaching-focused universities are very different environments with different costs and outcomes.',
      whatToDo:
        'Compare public vs. private tuition patterns, learn what regional accreditation means, and understand that a "community college transfer" pathway can be a lower-cost route into a 4-year bachelor\'s degree.',
      commonDocuments: [],
      commonMistakes: [
        "Assuming all US universities have similar tuition -- public out-of-state and private tuition can be multiples of in-state public tuition.",
        "Confusing regional accreditation (widely recognized) with unaccredited or narrowly-accredited programs.",
      ],
      checklist: [
        "Understand public vs. private cost patterns",
        "Understand what accreditation to look for",
      ],
      typicalTiming: "Alongside clarifying your goals, 12-18 months before start.",
    },
    {
      stepId: "shortlist-universities",
      whyItMatters:
        "A balanced shortlist (reach, match, and safety schools by selectivity) improves your odds of at least one strong offer without applying to far more schools than you can research well.",
      whatToDo:
        "Build a shortlist of 6-10 SEVP-certified institutions (required to issue the Form I-20 for an F-1 visa) spanning a range of selectivity, and note each program's specific admission requirements.",
      commonDocuments: [],
      commonMistakes: [
        "Shortlisting a school that isn't SEVP-certified, which means it cannot issue the I-20 needed for an F-1 visa at all.",
        "Applying only to extremely selective schools without match/safety options.",
      ],
      checklist: [
        "6-10 schools shortlisted",
        "Confirmed each is SEVP-certified",
        "Noted each program's specific requirements",
      ],
      officialSourceLinks: [
        {
          label: "Study in the States — school search",
          url: "https://studyinthestates.dhs.gov/school-search",
        },
      ],
      typicalTiming: "10-15 months before start.",
    },
    {
      stepId: "check-requirements",
      whyItMatters:
        "Missing a prerequisite course, minimum GPA, or standardized test late in the cycle can force you to skip an application term entirely.",
      whatToDo:
        "For each shortlisted program, list its specific requirements: minimum GPA, prerequisite coursework, required tests, and any portfolio or writing sample.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming all programs in the same field have identical prerequisites.",
        "Discovering a required prerequisite course too late to complete it before applying.",
      ],
      checklist: [
        "Requirements listed per shortlisted program",
        "Any prerequisite gaps identified",
      ],
      degreeNotes: {
        bachelors:
          "Undergraduate admission typically weighs GPA, coursework rigor, and (where required) standardized tests holistically alongside essays and activities.",
        masters:
          "Master's admission typically weighs your bachelor's GPA, relevant coursework, and often prior research or work experience in the field.",
        phd: "PhD admission weighs research fit with a specific faculty advisor most heavily, often more than coursework GPA alone.",
      },
      typicalTiming: "10-14 months before start.",
    },
    {
      stepId: "plan-tests",
      whyItMatters:
        "English-proficiency tests (TOEFL iBT, IELTS, PTE Academic, or Duolingo English Test, depending on the program) and, for many graduate programs, the GRE or GMAT need enough lead time to prepare, sit, and receive scores before deadlines.",
      whatToDo:
        "Confirm exactly which tests each shortlisted program accepts and its minimum scores, then build a study and test-date plan with buffer time for a possible retake.",
      commonDocuments: [],
      commonMistakes: [
        "Registering for a test date too close to the application deadline to allow a retake if needed.",
        "Assuming every program accepts the same English test -- some accept only specific tests or have per-section minimums.",
      ],
      checklist: ["Required tests per program confirmed", "Test dates booked with retake buffer"],
      typicalTiming:
        "9-14 months before start; book tests at least 2-3 months before the earliest deadline.",
    },
    {
      stepId: "take-tests",
      whyItMatters:
        "Score reports typically take days to weeks to process and be sent to institutions -- late reporting can miss a hard deadline even if you sat the test on time.",
      whatToDo:
        "Sit your planned tests, then have official score reports sent directly to each shortlisted institution using their official score-recipient codes.",
      commonDocuments: ["Official test score reports sent to each institution"],
      commonMistakes: [
        "Only downloading a PDF score report instead of having the testing agency send an official electronic report to the institution.",
        "Missing a program's specific score-recipient code, which delays delivery.",
      ],
      checklist: ["Tests completed", "Official scores sent to every shortlisted institution"],
      typicalTiming: "6-10 months before start, with enough buffer before the earliest deadline.",
    },
    {
      stepId: "draft-cv",
      whyItMatters:
        "Graduate and PhD applications typically expect a full academic CV (not just a resume), covering research, publications, and academic activity -- reviewers use it to quickly assess your background.",
      whatToDo:
        "Draft a clear, chronological CV: education, research/work experience, publications or projects, awards, and relevant skills. Have someone in your field review it.",
      commonDocuments: ["Academic CV or resume"],
      commonMistakes: [
        "Submitting a general job-application resume format to a graduate program that expects an academic CV.",
        "Omitting research experience or projects that are directly relevant to the program.",
      ],
      checklist: ["CV drafted", "Reviewed by someone in your target field"],
      degreeNotes: {
        bachelors:
          "Undergraduate applications more often use a shorter activities resume rather than a full academic CV.",
      },
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "write-sop",
      whyItMatters:
        "The statement of purpose (or personal statement) is often the single most heavily weighed piece of writing in a US application -- it's where you connect your background to a specific program's strengths.",
      whatToDo:
        "Write a program-specific statement explaining why this program, what you'll contribute, and (for graduate/PhD study) which faculty or research areas align with your interests. Revise it across several drafts.",
      commonDocuments: ["Statement of purpose or personal statement (program-specific)"],
      commonMistakes: [
        "Reusing an identical, generic statement across every school without tailoring it to each program.",
        "Focusing entirely on personal background with no connection to the specific program or faculty.",
      ],
      checklist: ["Draft written", "Tailored per program", "Proofread by another person"],
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "request-recommendations",
      whyItMatters:
        "Strong letters of recommendation need recommenders who know your work well and enough lead time to write a thoughtful letter -- most US graduate programs require 2-3.",
      whatToDo:
        "Ask recommenders early, provide them your CV, statement draft, and specific points you'd like highlighted, and confirm each program's submission method (usually an online portal that emails the recommender directly).",
      commonDocuments: ["2-3 letters of recommendation (program-dependent)"],
      commonMistakes: [
        "Asking for recommendations with only a few weeks' notice.",
        "Not giving recommenders enough context about the specific program and your goals.",
      ],
      checklist: [
        "Recommenders confirmed",
        "Materials sent to recommenders",
        "Portal invitations sent",
      ],
      typicalTiming:
        "8-11 months before start; ask at least 6-8 weeks before the earliest deadline.",
    },
    {
      stepId: "prepare-transcripts",
      whyItMatters:
        "US institutions generally require official transcripts, and non-US transcripts commonly need a course-by-course credential evaluation (e.g. through WES or a similar NACES-member service) to translate grades/credits into US-equivalent terms.",
      whatToDo:
        "Order official transcripts from every institution you've attended, and if required, start a credential evaluation with a NACES-member evaluation service well before deadlines, since evaluations can take several weeks.",
      commonDocuments: [
        "Official transcripts from every institution attended",
        "Credential evaluation report (if required by the program)",
      ],
      commonMistakes: [
        "Starting a credential evaluation too close to the deadline -- processing can take several weeks.",
        "Sending unofficial/self-printed transcripts when the program requires sealed official copies.",
      ],
      checklist: ["Transcripts ordered", "Credential evaluation started if required"],
      typicalTiming: "8-11 months before start.",
    },
    {
      stepId: "research-funding",
      whyItMatters:
        "Very few international undergraduates receive full need-based aid in the US, while many master's and especially PhD programs (particularly in STEM) offer assistantships or fellowships covering tuition plus a stipend -- funding availability varies enormously by degree level.",
      whatToDo:
        "Research each program's specific funding options (assistantships, fellowships, merit scholarships), external scholarships open to international students, and note funding application deadlines, which are often earlier than the general admission deadline.",
      commonDocuments: ["Scholarship/funding application forms (program-specific)"],
      commonMistakes: [
        "Assuming a university's general financial aid applies to international students -- most US need-based aid is for US citizens/permanent residents.",
        "Missing a separate, earlier funding-application deadline.",
      ],
      checklist: [
        "Funding options listed per program",
        "Funding deadlines noted separately from admission deadlines",
      ],
      degreeNotes: {
        phd: "PhD offers in many fields commonly include a funding package (tuition waiver plus stipend) tied to teaching or research assistantship duties -- confirm this explicitly rather than assuming it.",
      },
      typicalTiming: "8-12 months before start, alongside your applications.",
    },
    {
      stepId: "submit-applications",
      whyItMatters:
        "Most US applications go through a common portal (Common App, Coalition App) or a school-specific portal, each with its own document requirements and formatting -- errors here can delay or invalidate a submission.",
      whatToDo:
        "Create accounts on each required portal, upload every document in the required format, and submit well before the deadline in case of technical issues.",
      commonDocuments: [
        "Completed application form",
        "CV/resume, statement of purpose, transcripts, test scores, recommendation letters (as applicable)",
      ],
      commonMistakes: [
        "Submitting at the literal deadline moment with no buffer for portal outages or upload errors.",
        "Missing a supplemental essay or form specific to one school in a shared portal.",
      ],
      checklist: [
        "All required documents uploaded",
        "Application submitted with buffer before deadline",
      ],
      typicalTiming: "6-10 months before start (deadlines vary widely by school and term).",
    },
    {
      stepId: "pay-application-fees",
      whyItMatters:
        "Application fees are separate per school and generally non-refundable; some schools offer documented fee waivers for financial hardship.",
      whatToDo:
        "Budget for each school's application fee, and check whether you qualify for a fee waiver (commonly available for documented financial need).",
      commonDocuments: ["Fee-waiver request and supporting documentation, if applicable"],
      commonMistakes: [
        "Not checking for an available fee waiver before paying.",
        "Underestimating total application costs across many schools.",
      ],
      checklist: ["Fees budgeted per school", "Fee waiver checked where relevant"],
      typicalTiming: "At the time of each application submission.",
    },
    {
      stepId: "track-applications",
      whyItMatters:
        "Schools often request missing documents, clarifications, or interviews after submission -- missing these follow-ups can stall an otherwise complete application.",
      whatToDo:
        "Check each application portal regularly, respond promptly to requests, and keep a simple tracker of each school's status and any outstanding items.",
      commonDocuments: [],
      commonMistakes: [
        "Not checking application portals after submitting, missing a request for an additional document.",
        "Missing an interview invitation sent by email to a rarely-checked inbox.",
      ],
      checklist: [
        "Application tracker set up",
        "Portals checked regularly",
        "Requests responded to promptly",
      ],
      typicalTiming: "Ongoing, from submission through decision.",
    },
    {
      stepId: "compare-offers",
      whyItMatters:
        "An offer letter is only part of the picture -- comparing total cost after aid, program fit, location, and (for funded graduate offers) the specifics of the funding package matters more than prestige alone.",
      whatToDo:
        "For each offer, compare total cost after any aid/funding, program strengths, location, and (for funded offers) exactly what the funding covers and for how long.",
      commonDocuments: ["Offer/admission letters", "Financial aid or funding award letters"],
      commonMistakes: [
        "Comparing sticker-price tuition instead of net cost after aid.",
        "Not confirming how many years a graduate funding package actually covers.",
      ],
      checklist: [
        "Offers compared on net cost and fit",
        "Funding package terms confirmed where applicable",
      ],
      typicalTiming: "3-6 months before start, as decisions arrive.",
    },
    {
      stepId: "accept-offer",
      whyItMatters:
        "Accepting an offer (and paying any enrollment deposit) is generally what triggers a school to issue your Form I-20, the document required to apply for an F-1 visa.",
      whatToDo:
        "Formally accept your chosen offer through the school's process, pay any required enrollment deposit, and confirm with the international student office when your I-20 will be issued.",
      commonDocuments: [
        "Enrollment deposit receipt",
        "Form I-20 (issued by the school after acceptance)",
      ],
      commonMistakes: [
        "Assuming acceptance is automatic once you reply to an offer email, rather than completing the school's formal enrollment steps.",
        "Not asking when the I-20 will be issued, delaying the entire visa timeline.",
      ],
      checklist: [
        "Offer formally accepted",
        "Deposit paid if required",
        "I-20 issuance timeline confirmed",
      ],
      typicalTiming: "As soon as you've decided, generally 3-6 months before start.",
    },
    {
      stepId: "prove-funds",
      whyItMatters:
        "Your Form I-20 is generated based on documented proof you can cover a full year of tuition and living costs -- both the school and, later, the visa officer will review this.",
      whatToDo:
        "Gather bank statements, sponsor affidavits, or scholarship letters covering at least one year of the cost listed on your I-20, dated recently and in the required currency/format.",
      commonDocuments: [
        "Bank statements (personal or sponsor)",
        "Sponsor affidavit of support, if applicable",
        "Scholarship or assistantship award letter, if applicable",
      ],
      commonMistakes: [
        "Submitting financial documents that are too old by the time of the visa interview.",
        "Providing funds documentation that doesn't cover the full amount listed on the I-20.",
      ],
      checklist: ["Financial documents gathered", "Amount matches or exceeds I-20 cost estimate"],
      typicalTiming: "2-4 months before start, and again fresh before the visa interview.",
    },
    {
      stepId: "arrange-housing",
      whyItMatters:
        "On-campus housing often has its own separate deadline and limited spots, while off-campus housing usually requires being physically present or using a trusted local contact.",
      whatToDo:
        "Apply for on-campus housing if offered, or research off-campus options through your school's international student office, which often has vetted listings or advice for new arrivals.",
      commonDocuments: ["Housing application/deposit, if applicable"],
      commonMistakes: [
        "Missing the on-campus housing application deadline, which is often earlier than expected.",
        "Committing to off-campus housing sight-unseen through an unverified source.",
      ],
      checklist: ["Housing option chosen", "Application or deposit submitted if required"],
      typicalTiming: "2-4 months before start.",
    },
    {
      stepId: "apply-visa",
      whyItMatters:
        "The F-1 visa process has a specific sequence: pay the SEVIS I-901 fee, complete the DS-160 form, pay the visa application fee, then schedule an interview -- each step depends on the one before it.",
      whatToDo:
        "Pay the SEVIS I-901 fee using your I-20's SEVIS ID, complete the DS-160 online nonimmigrant visa application, pay the visa application fee, and schedule your interview at the nearest US embassy or consulate.",
      commonDocuments: [
        "Form I-20",
        "SEVIS I-901 fee receipt",
        "DS-160 confirmation page",
        "Valid passport",
        "Visa application fee receipt",
      ],
      commonMistakes: [
        "Applying for the visa interview slot without first paying the SEVIS fee, which is required beforehand.",
        "Scheduling the visa interview too close to your program start date -- consulate wait times vary by location and season.",
      ],
      checklist: [
        "SEVIS I-901 fee paid",
        "DS-160 completed",
        "Visa fee paid",
        "Interview scheduled",
      ],
      officialSourceLinks: [
        {
          label: "U.S. Department of State — Student Visa process",
          url: "https://travel.state.gov/content/travel/en/us-visas/study-exchange-visitor-visas.html",
        },
      ],
      typicalTiming:
        "As soon as your I-20 arrives, generally 2-4 months before start; a visa can be issued up to 365 days before the I-20 start date but you generally can't enter the US more than 30 days before it.",
    },
    {
      stepId: "visa-interview",
      whyItMatters:
        "The interview is where a consular officer assesses your intent to study and return home after your program, alongside reviewing your documents -- being prepared and consistent matters.",
      whatToDo:
        "Bring all required documents, be ready to clearly explain your program choice, funding, and post-study plans, and answer questions directly and honestly.",
      commonDocuments: [
        "Passport",
        "DS-160 confirmation",
        "Form I-20",
        "Financial evidence",
        "Academic documents/test scores",
      ],
      commonMistakes: [
        "Memorizing a rehearsed-sounding script instead of being able to speak naturally about your plans.",
        "Arriving without originals of documents already uploaded electronically.",
      ],
      checklist: [
        "All required documents organized",
        "Practiced clear, honest answers about your plans",
      ],
      typicalTiming:
        "Scheduled 2-4 months before start; actual wait times vary widely by consulate.",
    },
    {
      stepId: "health-insurance",
      whyItMatters:
        "US healthcare costs are high, and most schools require proof of health insurance meeting specific minimum coverage before you can register for classes.",
      whatToDo:
        "Confirm whether your school requires its own student health plan or accepts an equivalent outside policy meeting its minimum requirements, and complete any required pre-arrival medical checks or vaccination records.",
      commonDocuments: [
        "Proof of health insurance meeting school requirements",
        "Immunization records",
      ],
      commonMistakes: [
        "Arriving without health insurance, which most schools require before allowing registration.",
        "Missing a required vaccination or health-screening record needed for enrollment.",
      ],
      checklist: ["Health insurance arranged", "Required immunization records gathered"],
      typicalTiming: "1-2 months before start.",
    },
    {
      stepId: "book-travel",
      whyItMatters:
        "F-1 rules limit how early you can enter the US relative to your I-20 start date, so travel timing needs to respect that window while leaving enough buffer to settle in before classes begin.",
      whatToDo:
        "Book travel no more than 30 days before your I-20 program start date, pack required original documents in carry-on luggage (never checked baggage), and confirm airport pickup or arrival logistics with your school.",
      commonDocuments: [
        "Passport with visa",
        "Form I-20",
        "Financial evidence copies",
        "Admission/offer letter copies",
      ],
      commonMistakes: [
        "Packing the I-20 or passport in checked luggage.",
        "Booking arrival more than 30 days before the I-20 start date, which can cause entry issues.",
      ],
      checklist: [
        "Travel booked within the allowed window",
        "Required documents packed in carry-on",
      ],
      typicalTiming: "3-6 weeks before start.",
    },
    {
      stepId: "arrive-register",
      whyItMatters:
        'Your school\'s international student office must "activate" your SEVIS record after arrival, and most schools require mandatory orientation before you can register for classes.',
      whatToDo:
        "Check in with your school's international student office promptly after arrival, attend mandatory orientation, and complete academic registration and any immigration check-in steps the school requires.",
      commonDocuments: [
        "Passport, visa, and I-20 for check-in",
        "Proof of address for local registration, if required",
      ],
      commonMistakes: [
        "Delaying check-in with the international student office, which can leave your SEVIS record inactive.",
        "Skipping mandatory orientation sessions that cover visa-status rules you're legally responsible for.",
      ],
      checklist: [
        "Checked in with international student office",
        "Orientation attended",
        "Class registration completed",
      ],
      typicalTiming: "Within the first 1-2 weeks after arrival.",
    },
  ],
};
