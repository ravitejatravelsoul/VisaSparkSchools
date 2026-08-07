import type { CountryRoadmapInput } from "@/lib/study-abroad/types";

/**
 * Ireland study-abroad roadmap, following the structure and tone established
 * by content/study-abroad/united-states.ts. Every fee/timing figure below is
 * phrased in general, non-guaranteed terms rather than a bare number
 * presented as universal fact, since these change and vary by
 * institution/nationality/immigration guidance current at the time of study.
 */
export const irelandRoadmap: CountryRoadmapInput = {
  countrySlug: "ireland",
  countryName: "Ireland",
  summary:
    'Ireland hosts a compact set of universities and technological universities with a growing international student population, an English-speaking environment, and close academic ties to the UK and EU systems. Non-EU/EEA students generally study on a long-stay ("D") study visa or, where visa-exempt, still need to register their immigration permission after arrival.',
  degreeLevels: ["bachelors", "masters", "phd"],
  lastReviewed: "2026-08-07",
  officialSources: [
    {
      label: "Citizens Information — Student Visas",
      url: "https://www.citizensinformation.ie/en/moving-country/visas-for-ireland/student-visas/",
    },
    { label: "Irish Immigration Service (INIS)", url: "https://www.irishimmigration.ie/" },
  ],
  steps: [
    {
      stepId: "clarify-goals",
      whyItMatters:
        "Ireland's undergraduate system (built around the Leaving Certificate/CAO points model for EU applicants) differs sharply from its postgraduate system (direct application, research fit for PhD), so deciding your degree level and field early shapes which application route and timeline apply to you.",
      whatToDo:
        "Write down your target degree level, field, intended start term (Irish academic years typically begin in September), and a rough budget ceiling. Note whether you'll need a study visa based on your nationality.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming the application process is the same for EU/EEA and non-EU/EEA applicants, when routes, fees, and visa requirements differ substantially.",
        "Not checking early whether your nationality requires a visa to study in Ireland at all, since this changes several later steps.",
      ],
      checklist: [
        "Degree level and field decided",
        "Target start term set",
        "Visa-need for your nationality checked",
      ],
      typicalTiming: "12-18 months before your intended start term, for a first pass.",
    },
    {
      stepId: "research-countries",
      whyItMatters:
        "Ireland's higher-education sector is organized around universities, technological universities (TUs), and other QQI-recognized institutions, each mapped onto the National Framework of Qualifications (NFQ) -- understanding this framework helps you judge whether a program and its award level match your goals.",
      whatToDo:
        "Learn how the NFQ levels work (e.g. Level 8 for honours bachelor's, Level 9 for master's), understand the difference between universities and technological universities, and compare Ireland's cost and lifestyle against other destinations you're considering.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming all Irish higher-education providers are equally recognized -- confirm QQI recognition and NFQ level for any award you're considering.",
        "Overlooking Ireland's cost of living, particularly accommodation, which can be a larger factor than tuition in overall budget.",
      ],
      checklist: [
        "NFQ levels understood",
        "University vs. technological university distinction understood",
      ],
      typicalTiming: "Alongside clarifying your goals, 12-18 months before start.",
    },
    {
      stepId: "shortlist-universities",
      whyItMatters:
        "For non-EU/EEA applicants, your eventual study visa depends on holding a letter of acceptance from an institution and program listed on the Interim List of Eligible Programmes (ILEP) -- shortlisting a program that isn't on this list can block the visa route entirely.",
      whatToDo:
        "Build a shortlist of programs across a mix of universities and technological universities, and for each one confirm (if you'll need a visa) that it appears on the current ILEP.",
      commonDocuments: [],
      commonMistakes: [
        "Shortlisting a program not on the ILEP without realizing this affects visa eligibility for non-EU/EEA applicants.",
        "Applying only to the most competitive programs without a realistic mix of options.",
      ],
      checklist: [
        "Programs shortlisted across multiple institutions",
        "ILEP status checked for each, if a visa will be needed",
      ],
      typicalTiming: "10-15 months before start.",
    },
    {
      stepId: "check-requirements",
      whyItMatters:
        "Requirements differ by route: EU/EEA school leavers are typically assessed on Leaving Certificate (or equivalent) points through the CAO, while non-EU/EEA and postgraduate applicants generally apply directly to the institution with different academic and English-language thresholds.",
      whatToDo:
        "For each shortlisted program, list its specific entry requirements: minimum academic results or GPA equivalent, prerequisite subjects, English-language requirements, and any portfolio, interview, or writing sample.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming your home-country qualification automatically meets an Irish program's entry requirement without checking its stated equivalency.",
        "Missing a program-specific English-language requirement because you assumed a prior English-medium education would automatically satisfy it.",
      ],
      checklist: [
        "Requirements listed per shortlisted program",
        "Any prerequisite or equivalency gaps identified",
      ],
      degreeNotes: {
        bachelors:
          "EU/EEA undergraduate applicants typically apply through the Central Applications Office (CAO) using Leaving Certificate-equivalent points; non-EU/EEA applicants generally apply directly to the institution.",
        masters:
          "Master's admission typically weighs your bachelor's result, relevant coursework, and sometimes work or research experience in the field.",
        phd: "PhD admission weighs research fit with a specific supervisor and department most heavily, often more than a single academic score.",
      },
      typicalTiming: "10-14 months before start.",
    },
    {
      stepId: "plan-tests",
      whyItMatters:
        "English-proficiency tests (IELTS, TOEFL iBT, PTE Academic, or Duolingo English Test, depending on the program) need enough lead time to prepare, sit, and receive scores before deadlines -- and are also commonly required as evidence for the visa application itself.",
      whatToDo:
        "Confirm exactly which English test(s) each shortlisted program (and, if relevant, the visa application) accepts and its minimum score, then build a study and test-date plan with buffer time for a possible retake.",
      commonDocuments: [],
      commonMistakes: [
        "Booking a test date too close to the application deadline to allow a retake if needed.",
        "Assuming a test result used for university admission automatically satisfies a separate visa English-language requirement, without checking.",
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
      commonDocuments: ["Official English-language test score reports sent to each institution"],
      commonMistakes: [
        "Only keeping a personal copy of the score instead of having the testing agency send an official report to the institution.",
        "Missing a program's specific score-recipient code or address, which delays delivery.",
      ],
      checklist: ["Tests completed", "Official scores sent to every shortlisted institution"],
      typicalTiming: "6-10 months before start, with enough buffer before the earliest deadline.",
    },
    {
      stepId: "draft-cv",
      whyItMatters:
        "Postgraduate and PhD applications typically expect a full academic CV, covering education, research, publications, and relevant experience -- admissions staff and prospective supervisors use it to quickly assess your background.",
      whatToDo:
        "Draft a clear, chronological CV: education, research/work experience, publications or projects, awards, and relevant skills. Have someone in your field review it.",
      commonDocuments: ["Academic CV or resume"],
      commonMistakes: [
        "Submitting a general job-application resume format to a postgraduate program that expects a full academic CV.",
        "Omitting research experience or projects directly relevant to the program.",
      ],
      checklist: ["CV drafted", "Reviewed by someone in your target field"],
      degreeNotes: {
        bachelors:
          "Undergraduate applications more often use a shorter activities-focused resume rather than a full academic CV.",
      },
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "write-sop",
      whyItMatters:
        "The statement of purpose (or personal statement) is often weighed heavily, especially for postgraduate and PhD applications, as it's where you connect your background to a specific program's strengths and, for PhD study, a proposed research direction.",
      whatToDo:
        "Write a program-specific statement explaining why this program, what you'll contribute, and (for postgraduate/PhD study) which staff or research areas align with your interests. Revise it across several drafts.",
      commonDocuments: ["Statement of purpose or personal statement (program-specific)"],
      commonMistakes: [
        "Reusing an identical, generic statement across every program without tailoring it to each one.",
        "Focusing entirely on personal background with no connection to the specific program or department.",
      ],
      checklist: ["Draft written", "Tailored per program", "Proofread by another person"],
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "request-recommendations",
      whyItMatters:
        "Strong letters of recommendation need recommenders who know your work well and enough lead time to write a thoughtful letter -- many Irish postgraduate programs request 1-2 academic or professional references.",
      whatToDo:
        "Ask recommenders early, provide them your CV, statement draft, and specific points you'd like highlighted, and confirm each program's submission method.",
      commonDocuments: ["1-2 letters of recommendation (program-dependent)"],
      commonMistakes: [
        "Asking for recommendations with only a few weeks' notice.",
        "Not giving recommenders enough context about the specific program and your goals.",
      ],
      checklist: [
        "Recommenders confirmed",
        "Materials sent to recommenders",
        "Submission instructions shared",
      ],
      typicalTiming:
        "8-11 months before start; ask at least 6-8 weeks before the earliest deadline.",
    },
    {
      stepId: "prepare-transcripts",
      whyItMatters:
        "Irish institutions generally require official transcripts, and non-Irish/non-EU qualifications commonly need an equivalency check against the NFQ (sometimes via QQI's recognition service) to confirm how they compare to Irish qualification levels.",
      whatToDo:
        "Order official transcripts from every institution you've attended, and if a program or the visa process requires it, start any qualification recognition/equivalency check well before deadlines, since processing can take several weeks.",
      commonDocuments: [
        "Official transcripts from every institution attended",
        "Qualification recognition/equivalency statement, if required",
      ],
      commonMistakes: [
        "Starting a qualification equivalency check too close to the deadline -- processing can take several weeks.",
        "Sending unofficial/self-printed transcripts when the program requires sealed official copies.",
      ],
      checklist: ["Transcripts ordered", "Equivalency check started if required"],
      typicalTiming: "8-11 months before start.",
    },
    {
      stepId: "research-funding",
      whyItMatters:
        "Funding availability varies enormously by degree level in Ireland -- undergraduate scholarships for non-EU/EEA students are limited, while some master's and many funded PhD positions (particularly in STEM) include a stipend tied to research or teaching duties.",
      whatToDo:
        "Research each program's specific funding options (e.g. Government of Ireland scholarships, university-specific awards, funded PhD positions), external scholarships open to international students, and note funding application deadlines, which are often earlier than the general admission deadline.",
      commonDocuments: ["Scholarship/funding application forms (program-specific)"],
      commonMistakes: [
        "Assuming general Irish student-support schemes apply to non-EU/EEA international students, when most are restricted to Irish/EU residents.",
        "Missing a separate, earlier funding-application deadline.",
      ],
      checklist: [
        "Funding options listed per program",
        "Funding deadlines noted separately from admission deadlines",
      ],
      degreeNotes: {
        phd: "Many funded PhD positions in Ireland are advertised as specific posts with a stipend attached, rather than a general scholarship you apply for separately -- confirm this explicitly rather than assuming a funding package exists.",
      },
      typicalTiming: "8-12 months before start, alongside your applications.",
    },
    {
      stepId: "submit-applications",
      whyItMatters:
        "EU/EEA undergraduate applicants typically apply through the CAO's central portal, while postgraduate and most non-EU/EEA applicants apply directly to each institution's own portal -- mixing these up or missing a portal-specific requirement can delay or invalidate a submission.",
      whatToDo:
        "Confirm the correct application route for your situation (CAO vs. direct institutional application), create accounts on each required portal, upload every document in the required format, and submit well before the deadline in case of technical issues.",
      commonDocuments: [
        "Completed application form",
        "CV/resume, statement of purpose, transcripts, test scores, recommendation letters (as applicable)",
      ],
      commonMistakes: [
        "Applying through the wrong route (CAO vs. direct application) for your applicant category.",
        "Submitting at the literal deadline moment with no buffer for portal outages or upload errors.",
      ],
      checklist: [
        "Correct application route confirmed",
        "All required documents uploaded",
        "Application submitted with buffer before deadline",
      ],
      typicalTiming: "6-10 months before start (deadlines vary widely by institution and route).",
    },
    {
      stepId: "pay-application-fees",
      whyItMatters:
        "Application fees are set per institution or application route and are generally non-refundable; some institutions offer documented fee reductions or waivers for financial hardship.",
      whatToDo:
        "Budget for each application's fee, and check whether you qualify for a fee waiver or reduction (commonly available for documented financial need).",
      commonDocuments: ["Fee-waiver request and supporting documentation, if applicable"],
      commonMistakes: [
        "Not checking for an available fee waiver before paying.",
        "Underestimating total application costs across multiple institutions or routes.",
      ],
      checklist: ["Fees budgeted per application", "Fee waiver checked where relevant"],
      typicalTiming: "At the time of each application submission.",
    },
    {
      stepId: "track-applications",
      whyItMatters:
        "Institutions often request missing documents, clarifications, or interviews after submission -- missing these follow-ups can stall an otherwise complete application.",
      whatToDo:
        "Check each application portal and email regularly, respond promptly to requests, and keep a simple tracker of each application's status and any outstanding items.",
      commonDocuments: [],
      commonMistakes: [
        "Not checking application portals after submitting, missing a request for an additional document.",
        "Missing an interview or clarification request sent by email to a rarely-checked inbox.",
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
        "An offer letter is only part of the picture -- comparing total cost after any funding, program fit, location, and (for funded postgraduate offers) exactly what the funding covers matters more than reputation alone.",
      whatToDo:
        "For each offer, compare total cost after any aid/funding, program strengths, location, and (for funded offers) exactly what the funding covers and for how long.",
      commonDocuments: ["Offer/admission letters", "Funding award letters, if applicable"],
      commonMistakes: [
        "Comparing sticker-price fees instead of net cost after any funding.",
        "Not confirming how many years a funded PhD position actually covers.",
      ],
      checklist: [
        "Offers compared on net cost and fit",
        "Funding terms confirmed where applicable",
      ],
      typicalTiming: "3-6 months before start, as decisions arrive.",
    },
    {
      stepId: "accept-offer",
      whyItMatters:
        "Formally accepting an offer (and paying any acceptance deposit) is generally what triggers the institution to issue the formal letter of acceptance you'll need for a study visa application, if one is required.",
      whatToDo:
        "Formally accept your chosen offer through the institution's process, pay any required deposit, and confirm with the international office when your formal letter of acceptance will be issued.",
      commonDocuments: [
        "Acceptance deposit receipt",
        "Letter of acceptance (issued by the institution after acceptance)",
      ],
      commonMistakes: [
        "Assuming acceptance is automatic once you reply to an offer email, rather than completing the institution's formal enrollment steps.",
        "Not asking when the formal letter of acceptance will be issued, delaying the entire visa timeline.",
      ],
      checklist: [
        "Offer formally accepted",
        "Deposit paid if required",
        "Letter of acceptance issuance timeline confirmed",
      ],
      typicalTiming: "As soon as you've decided, generally 3-6 months before start.",
    },
    {
      stepId: "prove-funds",
      whyItMatters:
        "A non-EU/EEA study visa application generally requires evidence you can cover tuition and living costs for your stay, assessed against an amount set by current immigration guidance that is reviewed periodically -- both the institution and, later, the visa process will expect this evidence.",
      whatToDo:
        "Gather bank statements, sponsor documentation, or scholarship letters showing funds at or above the level set by current official guidance, dated recently and in the required format, and check the official source for the figure that applies at the time you apply.",
      commonDocuments: [
        "Bank statements (personal or sponsor)",
        "Sponsor letter/evidence of support, if applicable",
        "Scholarship or funding award letter, if applicable",
      ],
      commonMistakes: [
        "Relying on a remembered or outdated funds figure instead of checking the current official guidance before applying.",
        "Submitting financial documents that are too old by the time of the visa application.",
      ],
      checklist: [
        "Financial documents gathered",
        "Amount checked against current official guidance",
      ],
      typicalTiming: "2-4 months before start, and again fresh before the visa application.",
    },
    {
      stepId: "arrange-housing",
      whyItMatters:
        "Accommodation availability in Ireland's main university cities can be tight, and on-campus or university-affiliated housing often has its own separate deadline and limited spots.",
      whatToDo:
        "Apply for on-campus or university-affiliated accommodation if offered, or start researching off-campus options early through your institution's accommodation office, which often lists vetted options or advice for new arrivals.",
      commonDocuments: ["Housing application/deposit, if applicable"],
      commonMistakes: [
        "Starting an accommodation search only after arrival, given limited availability in many Irish cities.",
        "Committing to off-campus housing sight-unseen through an unverified source.",
      ],
      checklist: [
        "Housing option researched or applied for",
        "Application or deposit submitted if required",
      ],
      typicalTiming: "3-6 months before start, given limited accommodation availability.",
    },
    {
      stepId: "apply-visa",
      whyItMatters:
        'Ireland uses a "D" (long-stay) study visa for degree programs exceeding 90 days, separate from the short-stay "C" study visa for courses under 90 days; whether you need a visa at all depends on your nationality, but visa-exempt nationals still need to register their immigration permission after arrival. For most non-EU/EEA applicants, the letter of acceptance must be from a program on the ILEP.',
      whatToDo:
        "Confirm whether your nationality requires a visa, apply online through the official immigration system well ahead of travel with your letter of acceptance, proof of funds, private medical insurance, and (where required) English-language evidence, and check current guidance on bringing dependants, which generally differs by degree level.",
      commonDocuments: [
        "Letter of acceptance from an ILEP-listed program (non-EU/EEA applicants)",
        "Valid passport",
        "Proof of funds",
        "Evidence of private medical insurance",
        "English-language evidence, if required",
      ],
      commonMistakes: [
        "Applying for the visa without confirming the program is on the current ILEP, where required.",
        "Assuming dependants can automatically accompany any student -- current guidance generally limits this to postgraduate students at master's level or higher, so this should be verified on the official site rather than assumed.",
      ],
      checklist: [
        "Visa requirement for your nationality confirmed",
        "Online visa application submitted with required documents",
        "Dependant eligibility checked against current guidance, if relevant",
      ],
      degreeNotes: {
        bachelors:
          "Undergraduate students are generally not eligible to bring dependants under current guidance -- confirm on the official site.",
        masters:
          "Master's-level (NFQ Level 9) students may generally be eligible to bring dependants under current guidance -- confirm the specifics on the official site.",
        phd: "PhD students may generally be eligible to bring dependants under current guidance -- confirm the specifics on the official site.",
      },
      officialSourceLinks: [
        { label: "Irish Immigration Service (INIS)", url: "https://www.irishimmigration.ie/" },
        {
          label: "Citizens Information — Student Visas",
          url: "https://www.citizensinformation.ie/en/moving-country/visas-for-ireland/student-visas/",
        },
      ],
      typicalTiming:
        "As soon as your letter of acceptance arrives, generally 2-4 months before start.",
    },
    {
      stepId: "visa-interview",
      whyItMatters:
        "Depending on your location, the visa process may involve submitting biometrics or attending an appointment at a visa application center or embassy/consulate -- being prepared with consistent, complete documents matters.",
      whatToDo:
        "Book any required biometrics or in-person appointment promptly after applying, bring all required documents, and be ready to clearly explain your program choice, funding, and plans.",
      commonDocuments: [
        "Passport",
        "Visa application confirmation",
        "Letter of acceptance",
        "Financial evidence",
        "Academic documents/test scores",
      ],
      commonMistakes: [
        "Booking the appointment too close to your intended travel date -- processing and appointment availability vary by location.",
        "Arriving without originals of documents already uploaded electronically.",
      ],
      checklist: ["Appointment booked promptly", "All required documents organized"],
      typicalTiming:
        "Scheduled 2-4 months before start; actual processing times vary widely by location.",
    },
    {
      stepId: "health-insurance",
      whyItMatters:
        "Private medical insurance covering your stay is generally required as part of the study visa application and for registering your immigration permission after arrival.",
      whatToDo:
        "Arrange private medical insurance that meets the level of cover expected by immigration guidance and, where applicable, your institution's requirements, and keep proof of the policy for both the visa application and arrival registration.",
      commonDocuments: ["Proof of private medical insurance"],
      commonMistakes: [
        "Arranging travel insurance instead of medical insurance that meets the specific cover expected for immigration purposes.",
        "Letting the insurance policy lapse before completing arrival registration.",
      ],
      checklist: ["Private medical insurance arranged", "Proof of policy kept accessible"],
      typicalTiming: "1-2 months before start, and kept valid through arrival registration.",
    },
    {
      stepId: "book-travel",
      whyItMatters:
        "Travel timing should respect your visa's validity window and leave enough buffer to settle in, find housing, and complete mandatory registration steps within the required timeframe after arrival.",
      whatToDo:
        "Book travel within your visa's validity window, pack required original documents in carry-on luggage (never checked baggage), and confirm arrival logistics with your institution.",
      commonDocuments: [
        "Passport with visa (if applicable)",
        "Letter of acceptance",
        "Financial evidence copies",
        "Proof of medical insurance",
      ],
      commonMistakes: [
        "Packing key documents like the letter of acceptance or passport in checked luggage.",
        "Booking arrival too close to registration deadlines, leaving no buffer for delays.",
      ],
      checklist: [
        "Travel booked within the visa's validity window",
        "Required documents packed in carry-on",
      ],
      typicalTiming: "3-6 weeks before start.",
    },
    {
      stepId: "arrive-register",
      whyItMatters:
        "Non-EU/EEA students must register their immigration permission -- largely handled online through the Immigration Service Delivery (ISD) system in many areas -- within 90 days of arrival to receive an Irish Residence Permit (IRP) card, and generally need a Personal Public Service (PPS) Number for part-time work eligibility and other services.",
      whatToDo:
        "Register your immigration permission within 90 days of arrival to obtain your IRP card, apply for a PPS Number, check in with your institution's international office, and attend orientation before completing academic registration.",
      commonDocuments: [
        "Passport and visa/immigration documents for registration",
        "Letter of acceptance/enrollment confirmation",
        "Proof of address",
      ],
      commonMistakes: [
        "Delaying immigration registration past the 90-day window, which can affect your legal status.",
        "Not applying for a PPS Number promptly, which can delay part-time work eligibility or access to certain services.",
      ],
      checklist: [
        "Immigration permission registered for an IRP card",
        "PPS Number applied for",
        "Checked in with institution and attended orientation",
      ],
      typicalTiming: "Within 90 days of arrival, ideally arranged in the first few weeks.",
    },
  ],
};
