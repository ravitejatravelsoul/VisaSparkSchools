import type { CountryRoadmapInput } from "@/lib/study-abroad/types";

/**
 * Australia study-abroad roadmap, following the same structure and sourcing
 * approach as content/study-abroad/united-states.ts. Every fee/timing figure
 * below is phrased in general, non-guaranteed terms rather than a bare
 * number presented as universal fact, since these change and vary by
 * institution, course, and nationality.
 */
export const australiaRoadmap: CountryRoadmapInput = {
  countrySlug: "australia",
  countryName: "Australia",
  summary:
    "Australia hosts a large international student population across research-intensive universities, teaching-focused universities, and vocational providers, with most degree study built around a CRICOS-registered course and the Student visa (subclass 500). Admission, cost, and visa requirements all connect back to a specific course and its Confirmation of Enrolment.",
  degreeLevels: ["bachelors", "masters", "phd"],
  lastReviewed: "2026-08-07",
  officialSources: [
    {
      label: "Department of Home Affairs — Student visa (subclass 500)",
      url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    },
    { label: "Study Australia (Australian Government)", url: "https://www.studyaustralia.gov.au/" },
  ],
  steps: [
    {
      stepId: "clarify-goals",
      whyItMatters:
        "Australian institutions range from large research universities to teaching-focused universities and vocational (TAFE) providers, and each pathway has different entry requirements, costs, and typical outcomes. Settling on a degree level and field early keeps your later research focused.",
      whatToDo:
        "Write down your target degree level, field, intended intake (Australian universities commonly have two main intakes per year), and a rough budget ceiling, including living costs in your target city.",
      commonDocuments: [],
      commonMistakes: [
        "Not deciding bachelor's vs. master's vs. PhD before shortlisting, then finding the entry pathways and test requirements differ substantially.",
        "Underestimating living costs, which vary a great deal between major cities and regional areas.",
      ],
      checklist: [
        "Degree level and field decided",
        "Target intake set",
        "Rough total budget range written down",
      ],
      typicalTiming: "12-18 months before your intended start, for a first pass.",
    },
    {
      stepId: "research-countries",
      whyItMatters:
        "Understanding CRICOS registration, Australia's tiered university landscape (Group of Eight research-intensive universities vs. other teaching-focused institutions), and regional vs. metropolitan study options helps you interpret rankings and costs correctly rather than by name recognition alone.",
      whatToDo:
        "Learn what CRICOS registration means (a legal requirement for any course open to international students), and compare research-intensive universities against teaching-focused universities and regional campuses, which can offer lower living costs and additional visa-pathway settings.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming any Australian course can enroll international students -- only CRICOS-registered courses can issue a Confirmation of Enrolment for a student visa.",
        "Overlooking regional campuses, which can have lower costs and different post-study settings than major-city campuses.",
      ],
      checklist: [
        "Understand CRICOS registration",
        "Compared research-intensive vs. teaching-focused options",
      ],
      typicalTiming: "Alongside clarifying your goals, 12-18 months before start.",
    },
    {
      stepId: "shortlist-universities",
      whyItMatters:
        "A balanced shortlist across selectivity and cost improves your chances of a strong outcome without spreading your research too thin across schools that don't fit your profile or budget.",
      whatToDo:
        "Build a shortlist of several CRICOS-registered institutions and courses, checking each course's specific entry requirements, indicative fees, and campus location.",
      commonDocuments: [],
      commonMistakes: [
        "Shortlisting a course that isn't CRICOS-registered, which means it cannot generate the Confirmation of Enrolment needed for a subclass 500 visa.",
        "Focusing only on university reputation without checking whether the specific course matches your background and goals.",
      ],
      checklist: [
        "Institutions and courses shortlisted",
        "Confirmed each course is CRICOS-registered",
        "Noted each course's specific entry requirements",
      ],
      officialSourceLinks: [
        { label: "Study Australia — find a course", url: "https://www.studyaustralia.gov.au/" },
      ],
      typicalTiming: "10-15 months before start.",
    },
    {
      stepId: "check-requirements",
      whyItMatters:
        "Academic entry requirements, English-language minimums, and any foundation-year or pathway-program requirement differ by course and institution, and missing one late in the cycle can push your start date back a full intake.",
      whatToDo:
        "For each shortlisted course, list its specific academic requirements, English-language minimum, and whether it requires a foundation or pathway program before direct entry.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming all courses in the same field have identical entry requirements across institutions.",
        "Not checking whether your prior qualification is recognized for direct entry versus needing a foundation or bridging program first.",
      ],
      checklist: [
        "Requirements listed per shortlisted course",
        "Any prerequisite or pathway gaps identified",
      ],
      degreeNotes: {
        bachelors:
          "Undergraduate entry commonly considers your secondary-school results or equivalent, and some applicants complete a foundation year first if their prior qualification isn't directly recognized.",
        masters:
          "Master's entry typically considers your bachelor's degree result and, for some courses, relevant work experience or a related undergraduate major.",
        phd: "PhD entry generally requires identifying and securing in-principle agreement from a prospective supervisor before or alongside a formal application, in addition to meeting the university's research-degree entry requirements.",
      },
      typicalTiming: "10-14 months before start.",
    },
    {
      stepId: "plan-tests",
      whyItMatters:
        "Institutions and the Department of Home Affairs both assess English-language proficiency (via IELTS, PTE Academic, TOEFL iBT, or similar accepted tests), and each course may set its own minimum score, so building in time for preparation and a possible retake matters.",
      whatToDo:
        "Confirm which English tests each shortlisted course accepts and its minimum scores, then plan a study and test-date schedule with buffer time in case a retake is needed.",
      commonDocuments: [],
      commonMistakes: [
        "Booking a test date too close to the application deadline to allow for a retake if needed.",
        "Assuming every course accepts the same test or has the same per-section minimum score.",
      ],
      checklist: [
        "Required English test and minimum score confirmed per course",
        "Test date booked with retake buffer",
      ],
      typicalTiming:
        "9-14 months before start; book tests at least 2-3 months before the earliest deadline.",
    },
    {
      stepId: "take-tests",
      whyItMatters:
        "Score reports need to reach the institution and, later, may be referenced in your visa application, so timing the test and score delivery against both application and visa deadlines matters.",
      whatToDo:
        "Sit your planned English test, then have the official score report sent to each shortlisted institution and keep a copy for your later visa application.",
      commonDocuments: ["Official English test score report"],
      commonMistakes: [
        "Relying on a printed or emailed copy instead of having the testing body send an official electronic report where the institution requires it.",
        "Letting a test result approach its validity limit before it's used in a visa application.",
      ],
      checklist: [
        "Test completed",
        "Official score sent to shortlisted institutions",
        "Copy kept for visa application",
      ],
      typicalTiming: "6-10 months before start, with buffer before the earliest deadline.",
    },
    {
      stepId: "draft-cv",
      whyItMatters:
        "Postgraduate coursework and research-degree applications commonly expect a CV covering education, work experience, and (for research degrees) publications or research projects, which reviewers use to assess fit quickly.",
      whatToDo:
        "Draft a clear, chronological CV covering education, work or research experience, and relevant skills, then have someone in your field review it.",
      commonDocuments: ["CV or resume"],
      commonMistakes: [
        "Submitting a very brief resume to a research-degree application that expects a fuller academic CV with research background.",
        "Leaving out relevant work or research experience that directly supports your course choice.",
      ],
      checklist: ["CV drafted", "Reviewed by someone in your target field"],
      degreeNotes: {
        phd: "PhD applications generally expect the CV to highlight research experience, publications, and any prior thesis or major project work.",
      },
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "write-sop",
      whyItMatters:
        "Many Australian postgraduate courses, and virtually all PhD applications, ask for a statement of purpose or research proposal that connects your background to the specific course or supervisor.",
      whatToDo:
        "Write a course-specific statement (or, for a PhD, a research proposal aligned with a prospective supervisor's area) explaining your motivation and fit, then revise it across multiple drafts.",
      commonDocuments: ["Statement of purpose or research proposal (course-dependent)"],
      commonMistakes: [
        "Reusing an identical, generic statement across different courses without tailoring it to each one.",
        "For a PhD proposal, not aligning the topic with the actual research strengths of the department or prospective supervisor.",
      ],
      checklist: ["Draft written", "Tailored per course", "Proofread by another person"],
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "request-recommendations",
      whyItMatters:
        "Postgraduate and research-degree applications commonly require academic or professional references, and giving recommenders enough lead time and context helps them write a stronger letter.",
      whatToDo:
        "Ask recommenders early, share your CV and course details, and confirm each institution's submission process, which is often an online form the recommender completes directly.",
      commonDocuments: ["Academic or professional reference letters (course-dependent)"],
      commonMistakes: [
        "Requesting a reference with only a few weeks' notice before the deadline.",
        "Not telling recommenders which specific course or research area you're applying to.",
      ],
      checklist: [
        "Recommenders confirmed",
        "Materials sent to recommenders",
        "Submission requests sent",
      ],
      typicalTiming:
        "8-11 months before start; ask at least 6-8 weeks before the earliest deadline.",
    },
    {
      stepId: "prepare-transcripts",
      whyItMatters:
        "Institutions generally require official academic transcripts, and results from outside Australia are commonly assessed against the Australian Qualifications Framework or equivalent institutional benchmarks before an offer is finalized.",
      whatToDo:
        "Order official transcripts from every institution you've attended, and check whether your target course requires a separate academic or qualification assessment before it can issue an offer.",
      commonDocuments: [
        "Official transcripts from every institution attended",
        "Qualification assessment, if required",
      ],
      commonMistakes: [
        "Sending unofficial or self-printed transcripts when the institution requires sealed official copies or a verified digital transfer.",
        "Leaving a required qualification assessment until too close to the application deadline.",
      ],
      checklist: ["Transcripts ordered", "Qualification assessment started if required"],
      typicalTiming: "8-11 months before start.",
    },
    {
      stepId: "research-funding",
      whyItMatters:
        "Funding availability varies sharply by degree level -- undergraduate scholarships for international students are comparatively limited, while many research degrees (particularly PhDs) can come with a stipend attached to a scholarship such as an Australian Government Research Training Program place or an equivalent university scheme.",
      whatToDo:
        "Research each institution's scholarships for international students, external scholarship programs, and, for research degrees, whether a stipend-linked scholarship is available or needs a separate application alongside admission.",
      commonDocuments: ["Scholarship application forms (institution-dependent)"],
      commonMistakes: [
        "Assuming a general scholarship listed on a university website automatically applies to international students.",
        "Missing a scholarship deadline that falls earlier than the general course application deadline.",
      ],
      checklist: [
        "Funding options listed per course",
        "Funding deadlines noted separately from admission deadlines",
      ],
      degreeNotes: {
        phd: "Many PhD places are advertised together with a stipend-linked scholarship, but this isn't automatic everywhere -- confirm explicitly whether a given offer includes funding rather than assuming it.",
      },
      typicalTiming: "8-12 months before start, alongside your applications.",
    },
    {
      stepId: "submit-applications",
      whyItMatters:
        "Applications are usually submitted directly to the institution or through a designated agent portal, each with its own document checklist and format requirements, and errors here can delay processing.",
      whatToDo:
        "Create an account on each institution's application portal, upload every required document in the specified format, and submit with enough buffer before the deadline for technical issues.",
      commonDocuments: [
        "Completed application form",
        "CV, statement of purpose, transcripts, test scores, references (as applicable)",
      ],
      commonMistakes: [
        "Submitting right at the deadline with no buffer for portal issues or upload errors.",
        "Missing a course-specific supplementary form or document checklist item.",
      ],
      checklist: [
        "All required documents uploaded",
        "Application submitted with buffer before deadline",
      ],
      typicalTiming: "6-10 months before start (deadlines vary by institution and intake).",
    },
    {
      stepId: "pay-application-fees",
      whyItMatters:
        "Some institutions charge an application-processing fee, generally non-refundable, and this is separate from the course tuition deposit paid later after an offer is accepted.",
      whatToDo:
        "Check whether each shortlisted institution charges an application fee, budget for it, and keep the payment confirmation for your records.",
      commonDocuments: ["Application fee payment confirmation, where applicable"],
      commonMistakes: [
        "Confusing the (often smaller) application fee with the much larger tuition deposit paid after an offer.",
        "Not keeping proof of payment when a portal doesn't automatically email a receipt.",
      ],
      checklist: ["Application fees checked per institution", "Payment confirmation kept"],
      typicalTiming: "At the time of each application submission.",
    },
    {
      stepId: "track-applications",
      whyItMatters:
        "Institutions may request missing documents, clarification, or an interview after submission, and missing these follow-ups can stall or lapse an otherwise complete application.",
      whatToDo:
        "Check each application portal and email regularly, respond promptly to requests, and keep a simple tracker of each institution's status and any outstanding items.",
      commonDocuments: [],
      commonMistakes: [
        "Not checking the application portal after submitting, missing a request for an additional document.",
        "Missing a follow-up email sent to a rarely-checked inbox.",
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
        "An offer letter reflects only part of the picture -- comparing total cost, course structure, location, and (where relevant) scholarship terms matters more than institution name recognition alone.",
      whatToDo:
        "For each offer, compare total cost after any scholarship, course structure and duration, campus location, and, for research degrees, the supervisor and department fit.",
      commonDocuments: ["Offer letters", "Scholarship award letters, if applicable"],
      commonMistakes: [
        "Comparing headline tuition figures instead of net cost after any scholarship or fee reduction.",
        "Not confirming exactly what a research-degree scholarship covers and for how many years.",
      ],
      checklist: [
        "Offers compared on net cost and fit",
        "Scholarship terms confirmed where applicable",
      ],
      typicalTiming: "3-6 months before start, as decisions arrive.",
    },
    {
      stepId: "accept-offer",
      whyItMatters:
        "Formally accepting an offer and paying any required deposit is generally what triggers the institution to issue your Confirmation of Enrolment (CoE), the document required to apply for the subclass 500 student visa.",
      whatToDo:
        "Formally accept your chosen offer through the institution's process, pay any required tuition deposit, and confirm with the institution when your CoE will be issued.",
      commonDocuments: [
        "Tuition deposit receipt",
        "Confirmation of Enrolment (CoE), issued after acceptance",
      ],
      commonMistakes: [
        "Assuming a reply email accepts the offer, rather than completing the institution's formal acceptance and payment process.",
        "Not asking when the CoE will be issued, which can delay the whole visa timeline.",
      ],
      checklist: [
        "Offer formally accepted",
        "Deposit paid if required",
        "CoE issuance timeline confirmed",
      ],
      typicalTiming: "As soon as you've decided, generally 3-6 months before start.",
    },
    {
      stepId: "prove-funds",
      whyItMatters:
        "The subclass 500 visa requires evidence of enough financial capacity to cover course fees, travel, and living costs -- the specific amounts recognized as sufficient are set and periodically updated by the Department of Home Affairs, so check its current published amount rather than relying on an older figure.",
      whatToDo:
        "Gather bank statements, an education loan, or a sponsor's financial evidence covering the Department of Home Affairs' current published living-cost and course-cost expectations, in the required format and recency.",
      commonDocuments: [
        "Bank statements (personal or sponsor)",
        "Education loan documents, if applicable",
        "Sponsor financial evidence, if applicable",
      ],
      commonMistakes: [
        "Relying on an outdated living-cost figure instead of checking the Department of Home Affairs' current published amount.",
        "Submitting financial evidence that's too old by the time of visa lodgement.",
      ],
      checklist: [
        "Financial documents gathered",
        "Amount checked against the current published requirement",
      ],
      typicalTiming: "2-4 months before start, refreshed close to the visa application.",
    },
    {
      stepId: "arrange-housing",
      whyItMatters:
        "On-campus and purpose-built student accommodation often has its own separate deadline and limited spots, while off-campus rental usually requires being present locally or using a trusted contact, and Australian rental markets can be competitive in major cities.",
      whatToDo:
        "Apply for on-campus or affiliated student accommodation if offered, or research off-campus options through your institution's international student services, which often maintain vetted listings or arrival advice.",
      commonDocuments: ["Housing application/deposit, if applicable"],
      commonMistakes: [
        "Missing an on-campus accommodation application deadline, which is often earlier than expected.",
        "Committing to off-campus housing sight-unseen through an unverified listing.",
      ],
      checklist: ["Housing option chosen", "Application or deposit submitted if required"],
      typicalTiming: "2-4 months before start.",
    },
    {
      stepId: "apply-visa",
      whyItMatters:
        "The subclass 500 Student visa requires a valid Confirmation of Enrolment, meeting the Genuine Student (GS) requirement (a written statement about your study intentions and circumstances, which replaced the earlier Genuine Temporary Entrant test), Overseas Student Health Cover (OSHC) for your full intended stay, financial capacity evidence, and English-language proficiency evidence.",
      whatToDo:
        "Arrange OSHC for your full visa duration, prepare your Genuine Student statement, gather your CoE and financial and English-language evidence, then lodge the subclass 500 application online through the Department of Home Affairs' ImmiAccount system.",
      commonDocuments: [
        "Confirmation of Enrolment (CoE)",
        "Genuine Student (GS) statement",
        "Overseas Student Health Cover (OSHC) policy",
        "Financial capacity evidence",
        "English-language proficiency evidence",
        "Valid passport",
      ],
      commonMistakes: [
        "Writing a generic or vague Genuine Student statement instead of one that specifically explains your study choice and circumstances.",
        "Arranging OSHC for a shorter period than the actual visa duration, leaving a coverage gap.",
      ],
      checklist: [
        "CoE received",
        "OSHC arranged for full visa duration",
        "Genuine Student statement prepared",
        "Application lodged online",
      ],
      officialSourceLinks: [
        {
          label: "Department of Home Affairs — Student visa (subclass 500)",
          url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
        },
      ],
      degreeNotes: {
        masters:
          "Work-hour conditions differ for a Masters by Research compared with a coursework master's -- check the specific condition attached to your visa grant rather than assuming the same limit applies as for coursework study.",
        phd: "Doctoral (and Masters by Research) student visa holders are generally subject to different work-hour conditions than other student visa holders -- confirm the exact condition on your visa grant notice.",
      },
      typicalTiming:
        "As soon as your CoE arrives, generally 2-4 months before start; processing times vary and are published by the Department of Home Affairs.",
    },
    {
      stepId: "visa-interview",
      whyItMatters:
        "Most subclass 500 applications are assessed on submitted documents, but the Department of Home Affairs may request biometrics, a health examination, or additional information or an interview depending on your circumstances and nationality.",
      whatToDo:
        "Respond promptly to any request for biometrics, a health examination, or further information, and keep your contact details in ImmiAccount current so you don't miss a request.",
      commonDocuments: ["Passport", "CoE", "Health examination results, if requested"],
      commonMistakes: [
        "Missing a request for additional information or a health examination because of an outdated email address on file.",
        "Assuming an interview is required for every applicant when most are assessed on documents alone.",
      ],
      checklist: [
        "Contact details kept current in ImmiAccount",
        "Any requests responded to promptly",
      ],
      typicalTiming: "During processing, timing varies by individual case.",
    },
    {
      stepId: "health-insurance",
      whyItMatters:
        "Overseas Student Health Cover (OSHC) is a visa condition for most student visa holders and must run for the full length of your visa, not just your course dates -- it's distinct from any short-term travel insurance you might also carry.",
      whatToDo:
        "Confirm your OSHC policy covers your entire visa validity period, understand what it does and doesn't cover, and complete any pre-departure health requirements your institution or visa condition specifies.",
      commonDocuments: ["OSHC policy documents", "Health examination records, if required"],
      commonMistakes: [
        "Letting OSHC lapse before the visa expiry date because it was only bought to match the course dates.",
        "Not understanding OSHC's coverage limits before needing care after arrival.",
      ],
      checklist: [
        "OSHC confirmed for full visa duration",
        "Pre-departure health requirements completed",
      ],
      typicalTiming: "Arranged before visa lodgement, reconfirmed 1-2 months before start.",
    },
    {
      stepId: "book-travel",
      whyItMatters:
        "Your CoE and visa grant letter specify course start dates and any conditions, so travel timing should respect those while leaving enough buffer to settle in before orientation.",
      whatToDo:
        "Book travel with enough buffer before your course start date, pack required original documents in carry-on luggage, and confirm airport arrival or pickup logistics with your institution.",
      commonDocuments: [
        "Passport with visa grant notice",
        "CoE",
        "Financial and enrollment document copies",
      ],
      commonMistakes: [
        "Packing the CoE or passport in checked luggage.",
        "Booking arrival too close to orientation, leaving no buffer for jet lag, delays, or last-minute paperwork.",
      ],
      checklist: ["Travel booked with adequate buffer", "Required documents packed in carry-on"],
      typicalTiming: "3-6 weeks before start.",
    },
    {
      stepId: "arrive-register",
      whyItMatters:
        "Institutions require you to complete enrollment confirmation and attend orientation after arrival, and staying compliant with your student visa conditions (such as course enrollment and attendance requirements) starts from day one.",
      whatToDo:
        "Check in with your institution's international student office promptly after arrival, attend orientation, complete enrollment confirmation, and review your visa conditions so you understand your ongoing obligations.",
      commonDocuments: [
        "Passport, visa grant notice, and CoE for check-in",
        "Proof of local address, if required",
      ],
      commonMistakes: [
        "Delaying enrollment confirmation, which can affect your compliance with student visa conditions.",
        "Skipping orientation sessions that cover visa-condition and academic-progress rules you're responsible for.",
      ],
      checklist: [
        "Checked in with international student office",
        "Orientation attended",
        "Enrollment confirmed",
      ],
      typicalTiming: "Within the first 1-2 weeks after arrival.",
    },
  ],
};
