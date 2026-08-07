import type { CountryRoadmapInput } from "@/lib/study-abroad/types";

/**
 * Canada study-abroad roadmap. Follows the same structure and sourcing
 * discipline as content/study-abroad/united-states.ts -- every fee/timing
 * figure is phrased in general, non-guaranteed terms rather than a bare
 * number presented as universal fact, since these change and vary by
 * institution/province/nationality. The core mechanism covered throughout
 * is the IRCC study permit, tied to attendance at a Designated Learning
 * Institution (DLI).
 */
export const canadaRoadmap: CountryRoadmapInput = {
  countrySlug: "canada",
  countryName: "Canada",
  summary:
    "Canada hosts a large and growing international student population across public colleges and universities, with study generally tied to a study permit issued by Immigration, Refugees and Citizenship Canada (IRCC) and attendance at a Designated Learning Institution (DLI). Requirements and provincial rules vary, and IRCC periodically updates study permit policy, so always confirm current rules on canada.ca before applying.",
  degreeLevels: ["bachelors", "masters", "phd"],
  lastReviewed: "2026-08-07",
  officialSources: [
    {
      label: "IRCC — Study in Canada",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
    },
    {
      label: "IRCC — Study permit: About the process",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
    },
  ],
  steps: [
    {
      stepId: "clarify-goals",
      whyItMatters:
        "Canadian study-permit eligibility, provincial attestation requirements, and post-graduation work options all depend on your degree level and chosen province, so deciding these early shapes the entire application path.",
      whatToDo:
        "Write down your target degree level, field, intended start term, and a rough budget ceiling. Note whether you have a preferred province or are open to any region, since provincial rules and living costs differ.",
      commonDocuments: [],
      commonMistakes: [
        "Choosing a program before understanding that provincial attestation requirements can differ by province and by degree level.",
        "Underestimating living-cost differences between major cities (e.g. Toronto, Vancouver) and smaller cities or towns.",
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
        "Canadian institutions include public universities, public colleges, and private institutions, and only some are Designated Learning Institutions (DLIs) authorized to enroll international students who need a study permit -- understanding this distinction avoids wasted research time.",
      whatToDo:
        "Learn the difference between public and private institutions, understand what DLI status means, and get a general sense of how provincial education systems and living costs differ across Canada.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming every Canadian college or university is automatically a DLI -- only listed institutions can enroll study-permit holders.",
        "Overlooking that provincial attestation and cost-of-living rules can differ meaningfully by province.",
      ],
      checklist: [
        "Understand what DLI status means and why it matters",
        "General sense of provincial differences noted",
      ],
      typicalTiming: "Alongside clarifying your goals, 12-18 months before start.",
    },
    {
      stepId: "shortlist-universities",
      whyItMatters:
        "A study permit can only be issued for enrollment at a Designated Learning Institution, so confirming DLI status for every shortlisted school is a hard prerequisite, not a nice-to-have.",
      whatToDo:
        "Build a shortlist of DLIs spanning a range of selectivity and cost, and record each institution's DLI number, which you'll need later on your study permit application.",
      commonDocuments: [],
      commonMistakes: [
        "Shortlisting an institution that is not a DLI, which means it cannot support a study permit application at all.",
        "Losing track of each school's DLI number, which is required information on the study permit application.",
      ],
      checklist: [
        "Shortlist built",
        "DLI status confirmed for each school",
        "DLI numbers recorded",
      ],
      officialSourceLinks: [
        {
          label: "IRCC — List of designated learning institutions",
          url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html",
        },
      ],
      typicalTiming: "10-15 months before start.",
    },
    {
      stepId: "check-requirements",
      whyItMatters:
        "Admission requirements (minimum grades, prerequisite courses, English/French proficiency, portfolio or research proposal) vary by institution and degree level, and missing one late in the cycle can force you to skip an intake.",
      whatToDo:
        "For each shortlisted program, list its specific requirements: minimum grades, prerequisite coursework, language-proficiency thresholds, and any portfolio, writing sample, or research proposal.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming requirements are the same across programs in the same field at different institutions.",
        "Missing a prerequisite course or research-proposal requirement until late in the application cycle.",
      ],
      checklist: [
        "Requirements listed per shortlisted program",
        "Any prerequisite gaps identified",
      ],
      degreeNotes: {
        bachelors:
          "Undergraduate admission typically weighs secondary-school grades and coursework rigor, with some programs also requiring supplementary essays or portfolios.",
        masters:
          "Master's admission typically weighs your bachelor's transcript, relevant coursework, and often a statement of intent or prior research/work experience.",
        phd: "PhD admission commonly requires identifying and, ideally, securing informal agreement from a potential faculty supervisor before or during the application.",
      },
      typicalTiming: "10-14 months before start.",
    },
    {
      stepId: "plan-tests",
      whyItMatters:
        "English or French proficiency tests (IELTS, TOEFL iBT, PTE Academic, Duolingo English Test, or TEF/TCF for French-language programs, depending on the institution) need enough lead time to prepare, sit, and receive scores before deadlines.",
      whatToDo:
        "Confirm exactly which tests each shortlisted program accepts and its minimum scores, then build a study and test-date plan with buffer time for a possible retake.",
      commonDocuments: [],
      commonMistakes: [
        "Registering for a test date too close to the application deadline to allow a retake if needed.",
        "Assuming every program accepts the same test -- some require a specific test or set higher per-section minimums for graduate study.",
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
        "Sit your planned tests, then have official score reports sent directly to each shortlisted institution using their official score-recipient details.",
      commonDocuments: ["Official test score reports sent to each institution"],
      commonMistakes: [
        "Only keeping a personal copy of scores instead of having the testing agency send an official report directly to the institution.",
        "Missing a program's specific score-recipient code or portal, which delays delivery.",
      ],
      checklist: ["Tests completed", "Official scores sent to every shortlisted institution"],
      typicalTiming: "6-10 months before start, with enough buffer before the earliest deadline.",
    },
    {
      stepId: "draft-cv",
      whyItMatters:
        "Graduate and PhD applications typically expect a full academic CV covering research, publications, and academic activity -- admissions committees and potential supervisors use it to quickly assess your background.",
      whatToDo:
        "Draft a clear, chronological CV: education, research/work experience, publications or projects, awards, and relevant skills. Have someone in your field review it.",
      commonDocuments: ["Academic CV or resume"],
      commonMistakes: [
        "Submitting a general job-application resume format to a graduate program that expects an academic CV.",
        "Omitting research experience or projects directly relevant to the program or potential supervisor.",
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
        "A statement of intent or statement of purpose is where you connect your background to a specific program, and for research-based degrees it's often paired with (or replaced by) a research proposal outlining your intended work.",
      whatToDo:
        "Write a program-specific statement explaining why this program, what you'll contribute, and (for graduate/PhD study) which faculty or research areas align with your interests. Revise it across several drafts.",
      commonDocuments: [
        "Statement of purpose/intent (program-specific)",
        "Research proposal (for many PhD and some master's applications)",
      ],
      commonMistakes: [
        "Reusing an identical, generic statement across every school without tailoring it to each program.",
        "Submitting a research proposal that doesn't align with any current faculty member's research area.",
      ],
      checklist: ["Draft written", "Tailored per program", "Proofread by another person"],
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "request-recommendations",
      whyItMatters:
        "Strong letters of recommendation need recommenders who know your work well and enough lead time to write a thoughtful letter -- most Canadian graduate programs require 2-3.",
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
        "Canadian institutions generally require official transcripts, and transcripts from outside Canada sometimes need a course-by-course credential evaluation (e.g. through World Education Services (WES) Canada or a similar recognized service) to translate grades into Canadian-equivalent terms.",
      whatToDo:
        "Order official transcripts from every institution you've attended, and if a program requires it, start a credential evaluation with a recognized evaluation service well before deadlines, since evaluations can take several weeks.",
      commonDocuments: [
        "Official transcripts from every institution attended",
        "Credential evaluation report (if required by the program)",
      ],
      commonMistakes: [
        "Starting a credential evaluation too close to the deadline -- processing can take several weeks.",
        "Sending unofficial or self-printed transcripts when the program requires sealed official copies.",
      ],
      checklist: ["Transcripts ordered", "Credential evaluation started if required"],
      typicalTiming: "8-11 months before start.",
    },
    {
      stepId: "research-funding",
      whyItMatters:
        "Funding availability differs sharply by degree level -- undergraduate scholarships for international students are comparatively limited, while many funded master's and PhD positions (particularly research-based programs) include a stipend tied to a teaching or research assistantship.",
      whatToDo:
        "Research each program's specific funding options (assistantships, fellowships, entrance scholarships), external scholarships open to international students, and note funding-application deadlines, which are often earlier than the general admission deadline.",
      commonDocuments: ["Scholarship/funding application forms (program-specific)"],
      commonMistakes: [
        "Assuming general institutional financial aid applies to international students -- much of it is restricted to Canadian citizens/permanent residents.",
        "Missing a separate, earlier funding-application deadline.",
      ],
      checklist: [
        "Funding options listed per program",
        "Funding deadlines noted separately from admission deadlines",
      ],
      degreeNotes: {
        phd: "PhD offers in many research-based fields commonly include a funding package (tuition support plus stipend) tied to assistantship duties -- confirm this explicitly with the department rather than assuming it applies.",
      },
      typicalTiming: "8-12 months before start, alongside your applications.",
    },
    {
      stepId: "submit-applications",
      whyItMatters:
        "Applications typically go through a provincial application service (such as OUAC in Ontario) or an institution-specific portal, each with its own document requirements and formatting -- errors here can delay or invalidate a submission.",
      whatToDo:
        "Create accounts on each required portal, upload every document in the required format, and submit well before the deadline in case of technical issues.",
      commonDocuments: [
        "Completed application form",
        "CV/resume, statement of purpose, transcripts, test scores, recommendation letters (as applicable)",
      ],
      commonMistakes: [
        "Submitting at the literal deadline moment with no buffer for portal outages or upload errors.",
        "Missing a supplemental form or document specific to one program within a shared application portal.",
      ],
      checklist: [
        "All required documents uploaded",
        "Application submitted with buffer before deadline",
      ],
      typicalTiming: "6-10 months before start (deadlines vary widely by institution and term).",
    },
    {
      stepId: "pay-application-fees",
      whyItMatters:
        "Application fees are separate per institution and generally non-refundable; some institutions offer documented fee waivers for financial hardship.",
      whatToDo:
        "Budget for each institution's application fee, and check whether you qualify for a fee waiver (commonly available for documented financial need).",
      commonDocuments: ["Fee-waiver request and supporting documentation, if applicable"],
      commonMistakes: [
        "Not checking for an available fee waiver before paying.",
        "Underestimating total application costs across many institutions.",
      ],
      checklist: ["Fees budgeted per institution", "Fee waiver checked where relevant"],
      typicalTiming: "At the time of each application submission.",
    },
    {
      stepId: "track-applications",
      whyItMatters:
        "Institutions often request missing documents, clarifications, or interviews after submission -- missing these follow-ups can stall an otherwise complete application.",
      whatToDo:
        "Check each application portal regularly, respond promptly to requests, and keep a simple tracker of each institution's status and any outstanding items.",
      commonDocuments: [],
      commonMistakes: [
        "Not checking application portals after submitting, missing a request for an additional document.",
        "Missing an interview or supervisor-meeting invitation sent by email to a rarely-checked inbox.",
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
        "An offer letter is only part of the picture -- comparing total cost, program fit, provincial location, and (for funded graduate offers) exactly what the funding package covers matters more than name recognition alone.",
      whatToDo:
        "For each offer, compare total cost after any aid/funding, program strengths, provincial location and cost of living, and (for funded offers) exactly what the funding covers and for how long.",
      commonDocuments: ["Offer/admission letters", "Financial aid or funding award letters"],
      commonMistakes: [
        "Comparing sticker-price tuition instead of net cost after aid and cost of living.",
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
        "Formally accepting an offer and paying any required deposit is what triggers your institution to issue the official Letter of Acceptance (LOA) needed for your study permit application.",
      whatToDo:
        "Formally accept your chosen offer through the institution's process, pay any required enrollment deposit, and confirm with the international student office when your Letter of Acceptance will be issued.",
      commonDocuments: [
        "Enrollment deposit receipt",
        "Letter of Acceptance (issued by the DLI after acceptance)",
      ],
      commonMistakes: [
        "Assuming acceptance is automatic once you reply to an offer email, rather than completing the institution's formal enrollment steps.",
        "Not asking when the Letter of Acceptance will be issued, delaying the entire study permit timeline.",
      ],
      checklist: [
        "Offer formally accepted",
        "Deposit paid if required",
        "Letter of Acceptance issuance timeline confirmed",
      ],
      typicalTiming: "As soon as you've decided, generally 3-6 months before start.",
    },
    {
      stepId: "prove-funds",
      whyItMatters:
        "A study permit application requires demonstrating you can financially support yourself (and any accompanying family) for at least your first year in Canada, with the minimum amount tied to Canada's Low-Income Cut-Off (LICO) and adjusted periodically by IRCC.",
      whatToDo:
        "Gather bank statements, sponsor documentation, or scholarship/assistantship letters showing funds at or above the current IRCC-published minimum for your situation -- check the current figure on canada.ca rather than relying on a remembered number, since it is adjusted from time to time.",
      commonDocuments: [
        "Bank statements (personal or sponsor)",
        "Proof of a Canadian bank account or investment (e.g. GIC) if you choose that route",
        "Scholarship or assistantship award letter, if applicable",
      ],
      commonMistakes: [
        "Relying on an out-of-date dollar figure instead of checking the current IRCC-published minimum before applying.",
        "Submitting financial documents that are too old by the time of study permit submission.",
      ],
      checklist: [
        "Financial documents gathered",
        "Amount checked against the current IRCC-published minimum",
      ],
      typicalTiming: "2-4 months before start, and kept current through study permit submission.",
    },
    {
      stepId: "arrange-housing",
      whyItMatters:
        "On-campus residence often has its own separate deadline and limited spots, while off-campus housing usually requires being physically present or using a trusted local contact, and can be competitive in major cities.",
      whatToDo:
        "Apply for on-campus residence if offered, or research off-campus options through your institution's international student office, which often has vetted listings or advice for new arrivals.",
      commonDocuments: ["Housing application/deposit, if applicable"],
      commonMistakes: [
        "Missing the on-campus residence application deadline, which is often earlier than expected.",
        "Committing to off-campus housing sight-unseen through an unverified source.",
      ],
      checklist: ["Housing option chosen", "Application or deposit submitted if required"],
      typicalTiming: "2-4 months before start.",
    },
    {
      stepId: "apply-visa",
      whyItMatters:
        "The study permit is Canada's core study authorization, applied for online through IRCC using your Letter of Acceptance -- as of January 1, 2026, master's and doctoral students attending a public DLI generally do not need a Provincial/Territorial Attestation Letter (PAL/TAL), while most other applicants generally still do, so confirming which rule applies to you is essential before submitting.",
      whatToDo:
        "Confirm whether a Provincial/Territorial Attestation Letter applies to your situation, then complete the online study permit application with your Letter of Acceptance, proof of funds, passport, and any other IRCC-requested documents, and pay the required application fee.",
      commonDocuments: [
        "Letter of Acceptance from a DLI",
        "Provincial/Territorial Attestation Letter (where required)",
        "Proof of funds",
        "Valid passport",
        "Study permit application fee receipt",
      ],
      commonMistakes: [
        "Assuming the PAL/TAL exemption for public-DLI master's/doctoral students automatically applies without checking the current IRCC criteria.",
        "Submitting an incomplete online application, which can trigger delays or a request for additional documents.",
      ],
      checklist: [
        "PAL/TAL requirement confirmed for your situation",
        "Letter of Acceptance and proof of funds ready",
        "Application submitted with fee paid",
      ],
      officialSourceLinks: [
        {
          label: "IRCC — Study permit: About the process",
          url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
        },
      ],
      degreeNotes: {
        masters:
          "As of January 1, 2026, master's students attending a public DLI generally do not need a PAL/TAL -- confirm current criteria before applying.",
        phd: "As of January 1, 2026, doctoral students attending a public DLI generally do not need a PAL/TAL -- confirm current criteria before applying.",
      },
      typicalTiming:
        "As soon as your Letter of Acceptance arrives, generally 2-5 months before start; processing times vary by visa office and season.",
    },
    {
      stepId: "visa-interview",
      whyItMatters:
        "Most study permit applicants need to complete biometrics (fingerprints and photo) at a visa application centre, and IRCC may request an interview or additional documents to verify your application.",
      whatToDo:
        "Book and attend your biometrics appointment if required, and be ready to promptly provide any additional documents or attend an interview if IRCC requests one.",
      commonDocuments: ["Biometrics instruction letter", "Passport", "Letter of Acceptance"],
      commonMistakes: [
        "Delaying the biometrics appointment, which can push back the overall processing timeline.",
        "Not responding promptly to an IRCC request for additional documents.",
      ],
      checklist: [
        "Biometrics appointment booked and attended",
        "Any additional IRCC requests answered promptly",
      ],
      typicalTiming:
        "Shortly after submitting your application, generally 1-3 months before start.",
    },
    {
      stepId: "health-insurance",
      whyItMatters:
        "Provincial public health insurance does not automatically cover international students in every province -- some provinces require or strongly recommend a private or institution-run health insurance plan instead.",
      whatToDo:
        "Confirm whether your province and institution provide public health coverage for international students or require a separate (often mandatory) private plan, and arrange coverage before arrival.",
      commonDocuments: ["Proof of health insurance meeting institution/provincial requirements"],
      commonMistakes: [
        "Assuming provincial public health insurance automatically covers you as an international student -- this varies by province.",
        "Arriving without any health coverage during a waiting period before provincial or institutional insurance takes effect.",
      ],
      checklist: [
        "Health insurance requirement for your province/institution confirmed",
        "Coverage arranged before arrival",
      ],
      typicalTiming: "1-2 months before start.",
    },
    {
      stepId: "book-travel",
      whyItMatters:
        "Your study permit is typically issued (or approved) before you travel, and a border services officer finalizes it at the port of entry, so travel timing needs to leave enough buffer before your program start.",
      whatToDo:
        "Book travel with enough buffer to arrive and settle in before classes begin, pack required original documents in carry-on luggage (never checked baggage), and confirm arrival logistics with your institution's international student office.",
      commonDocuments: [
        "Passport",
        "Port of Entry (POE) letter of introduction, if applicable",
        "Letter of Acceptance",
        "Proof of funds copies",
      ],
      commonMistakes: [
        "Packing the Letter of Acceptance or passport in checked luggage.",
        "Booking arrival too close to the program start date, leaving no buffer for travel delays or port-of-entry processing.",
      ],
      checklist: ["Travel booked with adequate buffer", "Required documents packed in carry-on"],
      typicalTiming: "3-6 weeks before start.",
    },
    {
      stepId: "arrive-register",
      whyItMatters:
        "A border services officer issues your actual study permit at the port of entry, and your institution must confirm your enrollment with IRCC after classes begin -- both steps are required for your status to be valid.",
      whatToDo:
        "Present your documents to the border services officer on arrival to receive your study permit, then check in with your institution's international student office, complete academic registration, and apply for a Social Insurance Number (SIN) if your permit allows you to work.",
      commonDocuments: [
        "Passport and study permit for check-in",
        "Proof of address for local registration, if required",
      ],
      commonMistakes: [
        "Not reviewing the study permit issued at the border for accuracy (conditions, expiry date) before leaving the port of entry.",
        "Delaying registration, which can affect your institution's required enrollment confirmation to IRCC.",
      ],
      checklist: [
        "Study permit received at port of entry and reviewed",
        "Checked in with international student office",
        "Class registration completed",
      ],
      typicalTiming: "Within the first 1-2 weeks after arrival.",
    },
  ],
};
