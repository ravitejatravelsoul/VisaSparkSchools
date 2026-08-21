import type { CountryRoadmapInput } from "@/lib/study-abroad/types";

/**
 * United Kingdom study-abroad roadmap. Follows the same structure and
 * sourcing discipline as content/study-abroad/united-states.ts -- every
 * fee/timing figure is phrased in general, non-guaranteed terms rather than
 * a bare number presented as universal fact, since these change and vary by
 * institution/nationality. The core mechanism covered throughout is the
 * Student visa administered by UK Visas and Immigration (UKVI) under the
 * points-based system.
 */
export const unitedKingdomRoadmap: CountryRoadmapInput = {
  countrySlug: "united-kingdom",
  countryName: "United Kingdom",
  summary:
    "The UK combines a large number of internationally recognized universities with comparatively short degree lengths (many bachelor's programs run three years, many taught master's programs run one year). Most degree study happens on a Student visa administered by UK Visas and Immigration (UKVI), tied to a Confirmation of Acceptance for Studies (CAS) from a licensed student sponsor.",
  degreeLevels: ["bachelors", "masters", "phd"],
  lastReviewed: "2026-08-07",
  officialSources: [
    { label: "GOV.UK — Student visa", url: "https://www.gov.uk/student-visa" },
    {
      label: "GOV.UK — UK Visas and Immigration",
      url: "https://www.gov.uk/government/organisations/uk-visas-and-immigration",
    },
  ],
  steps: [
    {
      stepId: "clarify-goals",
      whyItMatters:
        "UK degree structures differ notably by level -- bachelor's programs are commonly three years (four in Scotland), taught master's programs are often just one year, and PhDs are typically three to four years of independent research -- so your degree level shapes both timeline and cost.",
      whatToDo:
        "Write down your target degree level, field, intended start term (UK academic years commonly start in September/October), and a rough budget ceiling. Note whether you're open to any UK region or have constraints.",
      commonDocuments: [],
      commonMistakes: [
        "Not accounting for how much shorter UK master's programs are compared to some other countries, which compresses the funding and settling-in timeline.",
        "Ignoring cost-of-living differences between London and other UK cities, which can be substantial.",
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
        "The UK's constituent nations (England, Scotland, Wales, Northern Ireland) have some differences in degree length and fee structure, and understanding the general shape of taught vs. research postgraduate study helps you target the right kind of program.",
      whatToDo:
        "Learn the general difference between taught and research postgraduate degrees, note any differences by nation (e.g. four-year Scottish bachelor's degrees), and get a general sense of regional cost-of-living differences.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming all UK bachelor's degrees are the same length -- Scottish institutions commonly use a four-year structure.",
        "Confusing a taught master's (structured coursework, roughly one year) with a research master's or MPhil (independent research-focused).",
      ],
      checklist: [
        "Understand taught vs. research postgraduate study",
        "General sense of regional/nation differences noted",
      ],
      typicalTiming: "Alongside clarifying your goals, 12-18 months before start.",
    },
    {
      stepId: "shortlist-universities",
      whyItMatters:
        "A Student visa can only be supported by a Confirmation of Acceptance for Studies (CAS) from an institution on the Register of licensed student sponsors, so confirming sponsor status for every shortlisted university is essential.",
      whatToDo:
        "Build a shortlist of universities spanning a range of selectivity, and confirm each is listed on the GOV.UK register of licensed student sponsors before investing time in an application.",
      commonDocuments: [],
      commonMistakes: [
        "Shortlisting an institution that isn't a licensed student sponsor, which means it cannot issue a CAS at all.",
        "Applying only to extremely selective universities without match/safety options.",
      ],
      checklist: ["Shortlist built", "Licensed sponsor status confirmed for each university"],
      officialSourceLinks: [
        {
          label: "GOV.UK — Register of licensed sponsors: students",
          url: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-students",
        },
      ],
      typicalTiming: "10-15 months before start.",
    },
    {
      stepId: "check-requirements",
      whyItMatters:
        "Entry requirements (predicted or achieved grades, prerequisite subjects, English-language level, portfolio, or a research proposal) vary by university and degree level, and missing one late in the cycle can force you to skip an intake.",
      whatToDo:
        "For each shortlisted program, list its specific requirements: grade requirements, prerequisite subjects, English-language thresholds, and any portfolio, admissions test, or research proposal.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming requirements are identical across similar-sounding programs at different universities.",
        "Missing a subject-specific prerequisite or admissions test until late in the application cycle.",
      ],
      checklist: [
        "Requirements listed per shortlisted program",
        "Any prerequisite gaps identified",
      ],
      degreeNotes: {
        bachelors:
          "Undergraduate admission (via UCAS) typically weighs predicted or achieved school-leaving grades alongside a personal statement.",
        masters:
          "Taught master's admission typically weighs your bachelor's degree classification and relevant coursework; research master's admission also weighs a proposed area of study.",
        phd: "PhD admission commonly requires identifying and, ideally, securing informal agreement from a potential academic supervisor and preparing a research proposal before or during the application.",
      },
      typicalTiming: "10-14 months before start.",
    },
    {
      stepId: "plan-tests",
      whyItMatters:
        "English-language proficiency is assessed both by universities for admission and, for the Student visa itself, sometimes via a UKVI-approved Secure English Language Test (SELT) at a required level (commonly CEFR B2 for degree-level study) -- confirming which applies to you needs lead time.",
      whatToDo:
        "Confirm which English test(s) each shortlisted university accepts for admission, and separately confirm whether your visa application will need a UKVI-approved SELT rather than a general IELTS/TOEFL score, then book with buffer for a possible retake.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming an admission-accepted English test automatically satisfies the separate UKVI SELT requirement for the visa.",
        "Booking a test date too close to the application deadline to allow a retake if needed.",
      ],
      checklist: [
        "Required tests per program confirmed",
        "Whether a UKVI-approved SELT is needed for the visa confirmed",
        "Test dates booked with retake buffer",
      ],
      typicalTiming:
        "9-14 months before start; book tests at least 2-3 months before the earliest deadline.",
    },
    {
      stepId: "take-tests",
      whyItMatters:
        "Score reports typically take days to weeks to process and be sent to institutions -- late reporting can miss a hard deadline even if you sat the test on time.",
      whatToDo:
        "Sit your planned tests, then have official score reports sent directly to each shortlisted university using their official score-recipient details.",
      commonDocuments: ["Official test score reports sent to each university"],
      commonMistakes: [
        "Only keeping a personal copy of scores instead of having the testing agency send an official report directly to the university.",
        "Missing a university's specific score-recipient code or portal, which delays delivery.",
      ],
      checklist: ["Tests completed", "Official scores sent to every shortlisted university"],
      typicalTiming: "6-10 months before start, with enough buffer before the earliest deadline.",
    },
    {
      stepId: "draft-cv",
      whyItMatters:
        "Postgraduate applications, and especially PhD applications, typically expect a full academic CV covering research, publications, and academic activity -- admissions staff and potential supervisors use it to quickly assess your background.",
      whatToDo:
        "Draft a clear, chronological CV: education, research/work experience, publications or projects, awards, and relevant skills. Have someone in your field review it.",
      commonDocuments: ["Academic CV or resume"],
      commonMistakes: [
        "Submitting a general job-application resume format to a postgraduate program that expects an academic CV.",
        "Omitting research experience or projects directly relevant to the program or potential supervisor.",
      ],
      checklist: ["CV drafted", "Reviewed by someone in your target field"],
      degreeNotes: {
        bachelors:
          "Undergraduate UCAS applications generally don't require a separate CV; the personal statement carries more weight.",
      },
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "write-sop",
      whyItMatters:
        "Undergraduate applicants write a single UCAS personal statement seen by every university on their application, while postgraduate applicants typically write a program-specific statement, and PhD applicants typically submit a detailed research proposal -- the format and stakes differ by level.",
      whatToDo:
        "For undergraduate study, write one carefully balanced UCAS personal statement covering all your choices; for postgraduate study, tailor a statement to each program; for a PhD, draft a research proposal outlining your intended question, methodology, and fit with a supervisor. Revise across several drafts.",
      commonDocuments: [
        "Personal statement (UCAS, undergraduate) or program-specific statement (postgraduate)",
        "Research proposal (PhD and some research master's applications)",
      ],
      commonMistakes: [
        "Writing a UCAS personal statement that only addresses one of several different course choices.",
        "Submitting a PhD research proposal that doesn't align with any current supervisor's research area at that university.",
      ],
      checklist: [
        "Draft written",
        "Tailored appropriately per application type",
        "Proofread by another person",
      ],
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "request-recommendations",
      whyItMatters:
        "UK applications generally require academic references rather than the multiple recommendation letters common elsewhere -- UCAS undergraduate applications typically need just one, while postgraduate applications often ask for two.",
      whatToDo:
        "Ask referees early, provide them your CV, statement draft, and specific points you'd like highlighted, and confirm each application's submission method (UCAS reference or a university portal that emails the referee directly).",
      commonDocuments: ["1-2 academic references (application-dependent)"],
      commonMistakes: [
        "Asking for a reference with only a few weeks' notice.",
        "Not giving referees enough context about the specific program and your goals.",
      ],
      checklist: [
        "Referees confirmed",
        "Materials sent to referees",
        "Portal/UCAS reference requests sent",
      ],
      typicalTiming:
        "8-11 months before start; ask at least 6-8 weeks before the earliest deadline.",
    },
    {
      stepId: "prepare-transcripts",
      whyItMatters:
        "UK institutions generally require official transcripts and degree certificates, and non-UK qualifications are sometimes checked against UK ENIC (the UK's national agency for international qualification comparison) to confirm equivalence.",
      whatToDo:
        "Order official transcripts and degree certificates from every institution you've attended, and if a university requests it, obtain a UK ENIC statement of comparability well before deadlines, since processing can take time.",
      commonDocuments: [
        "Official transcripts and degree certificates from every institution attended",
        "UK ENIC statement of comparability (if requested by the university)",
      ],
      commonMistakes: [
        "Requesting a UK ENIC comparability statement too close to the deadline -- processing can take several weeks.",
        "Sending unofficial or self-printed transcripts when the university requires certified official copies.",
      ],
      checklist: [
        "Transcripts and certificates ordered",
        "UK ENIC comparability statement requested if required",
      ],
      typicalTiming: "8-11 months before start.",
    },
    {
      stepId: "research-funding",
      whyItMatters:
        "Undergraduate scholarships for international students are comparatively limited, while many funded PhD positions come through UK Research and Innovation (UKRI) council studentships or university-specific studentships covering fees plus a stipend -- funding availability varies enormously by degree level.",
      whatToDo:
        "Research each program's specific funding options (studentships, scholarships, fee waivers), external scholarships open to international students (e.g. Chevening, Commonwealth Scholarships, or university-specific awards), and note funding-application deadlines, which are often earlier than the general admission deadline.",
      commonDocuments: ["Scholarship/studentship application forms (program-specific)"],
      commonMistakes: [
        "Assuming a university's general financial support applies to international students -- much UK student finance is restricted to home/UK students.",
        "Missing a separate, earlier funding-application deadline, especially for competitive studentships.",
      ],
      checklist: [
        "Funding options listed per program",
        "Funding deadlines noted separately from admission deadlines",
      ],
      degreeNotes: {
        phd: "PhD studentships (e.g. UKRI-funded) commonly cover fees plus a stipend and are often awarded competitively alongside or shortly after admission -- confirm the funding route explicitly rather than assuming it's included.",
      },
      typicalTiming: "8-12 months before start, alongside your applications.",
    },
    {
      stepId: "submit-applications",
      whyItMatters:
        "Undergraduate applications go through the centralized UCAS portal with its own deadlines and format, while postgraduate applications are typically submitted directly to each university -- mixing up the two processes causes avoidable errors.",
      whatToDo:
        "For undergraduate study, apply through UCAS by its deadline; for postgraduate study, apply directly through each university's own portal. Upload every document in the required format and submit well before the deadline in case of technical issues.",
      commonDocuments: [
        "Completed application form (UCAS or university portal)",
        "CV/resume, personal or program statement, transcripts, test scores, references (as applicable)",
      ],
      commonMistakes: [
        "Missing the UCAS deadline, which for some competitive undergraduate courses is notably earlier than other UK deadlines.",
        "Submitting at the literal deadline moment with no buffer for portal outages or upload errors.",
      ],
      checklist: [
        "All required documents uploaded",
        "Application submitted with buffer before deadline",
      ],
      typicalTiming:
        "6-10 months before start (UCAS undergraduate deadlines are often earlier than postgraduate deadlines).",
    },
    {
      stepId: "pay-application-fees",
      whyItMatters:
        "UCAS charges a single application fee covering all undergraduate choices, while many UK postgraduate applications carry no fee or a modest per-university fee -- costs are structured differently than in some other countries.",
      whatToDo:
        "Budget for the UCAS fee (undergraduate) or any per-university postgraduate application fee, and check whether a fee waiver is available for documented financial need.",
      commonDocuments: ["Fee-waiver request and supporting documentation, if applicable"],
      commonMistakes: [
        "Not checking whether a postgraduate program actually charges an application fee before assuming it does or doesn't.",
        "Not checking for an available fee waiver before paying.",
      ],
      checklist: ["Fees budgeted per application", "Fee waiver checked where relevant"],
      typicalTiming: "At the time of each application submission.",
    },
    {
      stepId: "track-applications",
      whyItMatters:
        "Universities and UCAS often request missing documents, clarifications, or interviews after submission -- missing these follow-ups can stall an otherwise complete application.",
      whatToDo:
        "Check UCAS Track and each university portal regularly, respond promptly to requests, and keep a simple tracker of each application's status and any outstanding items.",
      commonDocuments: [],
      commonMistakes: [
        "Not checking UCAS Track or university portals after submitting, missing a request for an additional document.",
        "Missing an interview invitation (common for some competitive courses and most PhD applications) sent to a rarely-checked inbox.",
      ],
      checklist: [
        "Application tracker set up",
        "Portals/UCAS Track checked regularly",
        "Requests responded to promptly",
      ],
      typicalTiming: "Ongoing, from submission through decision.",
    },
    {
      stepId: "compare-offers",
      whyItMatters:
        "UCAS undergraduate offers are typically conditional (tied to final grades) or unconditional, and you'll ultimately choose a firm and an insurance choice -- comparing offers correctly at this stage affects your entire remaining timeline.",
      whatToDo:
        "For each offer, compare total cost, program fit, location, and any conditions attached. For UCAS undergraduate applications, select a firm (first) choice and an insurance (backup) choice by the UCAS deadline.",
      commonDocuments: ["Offer/admission letters"],
      commonMistakes: [
        "Not understanding the difference between a conditional and unconditional UCAS offer before selecting firm/insurance choices.",
        "Comparing sticker-price tuition instead of net cost including living expenses by city.",
      ],
      checklist: [
        "Offers compared on net cost and fit",
        "Firm/insurance choices selected (undergraduate) or offer chosen (postgraduate)",
      ],
      typicalTiming: "3-6 months before start, as decisions arrive.",
    },
    {
      stepId: "accept-offer",
      whyItMatters:
        "Formally accepting your offer and meeting any conditions (such as final grades) is what allows your university to issue the Confirmation of Acceptance for Studies (CAS), the document your Student visa application depends on.",
      whatToDo:
        "Formally accept your offer, satisfy any outstanding conditions, pay any required deposit, and confirm with the international office when your CAS will be issued -- a CAS is generally only issued close to your visa application window.",
      commonDocuments: [
        "Enrollment deposit receipt, if applicable",
        "Confirmation of Acceptance for Studies (CAS)",
      ],
      commonMistakes: [
        "Assuming the CAS is issued immediately after acceptance -- universities generally issue it only within a window before the intended visa application.",
        "Not tracking outstanding offer conditions (e.g. final exam results) closely enough to meet them on time.",
      ],
      checklist: [
        "Offer formally accepted",
        "Any conditions met",
        "CAS issuance timeline confirmed",
      ],
      typicalTiming:
        "As soon as you've decided, generally 3-6 months before start; the CAS itself is usually issued closer to your visa application.",
    },
    {
      stepId: "prove-funds",
      whyItMatters:
        "The Student visa's points-based system awards 10 of its 70 required points for meeting a financial requirement, which generally means showing you've held enough funds for a continuous 28-day period covering your course fees and living costs -- getting the timing and continuity of this evidence wrong is one of the most common refusal reasons.",
      whatToDo:
        "Gather bank statements or sponsor documentation showing the required funds held continuously for at least 28 days, dated so the 28-day period ends close enough to your application per current UKVI rules, and check whether your CAS letter shows your university has already certified some or all of the financial requirement.",
      commonDocuments: [
        "Bank statements showing 28 consecutive days of qualifying funds",
        "Official financial sponsor letter, if a sponsor is covering costs",
      ],
      commonMistakes: [
        "Having a balance dip below the required amount at any point during the 28-day window, which can invalidate the evidence.",
        "Submitting bank statements too old relative to the application date under current UKVI timing rules.",
      ],
      checklist: [
        "28 consecutive days of qualifying funds documented",
        "Whether the university has certified financial evidence on the CAS confirmed",
      ],
      typicalTiming:
        "Roughly 2-3 months before applying for the visa, so the 28-day window and its expiry line up correctly.",
    },
    {
      stepId: "arrange-housing",
      whyItMatters:
        "University halls of residence often have their own separate deadline and limited spots, while private off-campus housing usually requires being physically present or using a trusted local contact, and can be competitive in cities like London.",
      whatToDo:
        "Apply for university accommodation if offered, or research off-campus options through your university's accommodation office, which often has vetted listings or advice for new arrivals.",
      commonDocuments: ["Housing application/deposit, if applicable"],
      commonMistakes: [
        "Missing the university accommodation application deadline, which is often earlier than expected.",
        "Committing to off-campus housing sight-unseen through an unverified source.",
      ],
      checklist: ["Housing option chosen", "Application or deposit submitted if required"],
      typicalTiming: "2-4 months before start.",
    },
    {
      stepId: "apply-visa",
      whyItMatters:
        "The Student visa uses a 70-point points-based system: a valid CAS from a licensed sponsor is worth 50 points, meeting the financial requirement is worth 10 points, and meeting the English-language requirement is worth 10 points -- all three are generally needed together, and the application also includes paying the Immigration Health Surcharge (IHS), an annually reviewed surcharge paid as part of the visa application (check GOV.UK for the current amount rather than relying on a remembered figure).",
      whatToDo:
        "Once your CAS is issued, complete the online Student visa application, upload your financial and English-language evidence, pay the visa application fee and the Immigration Health Surcharge, and complete a TB test certificate if you're applying from a country where UKVI requires one.",
      commonDocuments: [
        "Confirmation of Acceptance for Studies (CAS) reference number",
        "Financial evidence (28-day bank statements or sponsor letter)",
        "English-language evidence",
        "Valid passport",
        "TB test certificate, if required for your country of residence",
        "Visa fee and Immigration Health Surcharge payment confirmation",
      ],
      commonMistakes: [
        "Applying before the CAS is issued, or applying so late that the CAS's validity window is at risk of expiring.",
        "Forgetting the TB test certificate requirement, which applies to applicants from a specific list of countries and needs to be arranged at an approved clinic.",
      ],
      checklist: [
        "CAS reference number in hand",
        "Financial and English-language evidence uploaded",
        "TB test certificate arranged if required",
        "Visa fee and IHS paid",
      ],
      officialSourceLinks: [
        { label: "GOV.UK — Student visa", url: "https://www.gov.uk/student-visa" },
      ],
      degreeNotes: {
        phd: "PhD and other research-degree students are generally treated as Student visa applicants like taught-course students, but may have different permitted work-hours or visa-length considerations tied to the length of a research program -- confirm current rules for your specific course type.",
      },
      typicalTiming:
        "Generally up to 6 months before your course start date once your CAS is issued.",
    },
    {
      stepId: "visa-interview",
      whyItMatters:
        "Most Student visa applicants need to attend an appointment at a visa application centre to provide biometric information (fingerprints and photo), and UKVI may separately request a credibility interview or additional documents.",
      whatToDo:
        "Book and attend your biometrics appointment at a visa application centre, and be ready to promptly respond if UKVI requests an interview or additional documents.",
      commonDocuments: ["Biometrics appointment confirmation", "Passport", "CAS reference details"],
      commonMistakes: [
        "Delaying the biometrics appointment, which can push back the overall processing timeline.",
        "Not responding promptly to a UKVI request for additional documents or a credibility interview.",
      ],
      checklist: [
        "Biometrics appointment booked and attended",
        "Any additional UKVI requests answered promptly",
      ],
      typicalTiming:
        "Shortly after submitting your application, generally 1-3 months before start.",
    },
    {
      stepId: "health-insurance",
      whyItMatters:
        "The Immigration Health Surcharge you pay as part of your visa application generally gives you access to the National Health Service (NHS) on broadly the same basis as a UK resident, but it doesn't cover every situation, and there can be a gap before your surcharge-linked access begins.",
      whatToDo:
        "Confirm your IHS payment and visa are processed so NHS access is active by the time you arrive, register with a local GP soon after arrival, and consider supplementary travel insurance for the period before your coverage starts or for services the NHS doesn't cover.",
      commonDocuments: ["IHS payment confirmation", "GP registration details, once available"],
      commonMistakes: [
        "Assuming NHS access is instant on arrival rather than linked to your visa/IHS status being active.",
        "Not registering with a local GP promptly, which can delay access to routine care.",
      ],
      checklist: [
        "IHS payment confirmed as part of visa",
        "Plan to register with a local GP after arrival",
      ],
      typicalTiming:
        "Confirmed as part of the visa application; register with a GP within the first few weeks after arrival.",
    },
    {
      stepId: "book-travel",
      whyItMatters:
        "Student visa entry rules limit how early you can travel to the UK relative to your course start date, so travel timing needs to respect that window while leaving enough buffer to settle in before classes begin.",
      whatToDo:
        "Book travel within the entry window allowed by your visa, pack required original documents in carry-on luggage (never checked baggage), and confirm arrival logistics with your university.",
      commonDocuments: [
        "Passport with visa/eVisa",
        "CAS reference details",
        "Financial evidence copies",
        "Offer/admission letter copies",
      ],
      commonMistakes: [
        "Packing visa-related documents or the passport in checked luggage.",
        "Booking arrival outside the entry window permitted by the visa, which can cause entry issues.",
      ],
      checklist: [
        "Travel booked within the allowed entry window",
        "Required documents packed in carry-on",
      ],
      typicalTiming: "3-6 weeks before start.",
    },
    {
      stepId: "arrive-register",
      whyItMatters:
        "Depending on how your immigration status was issued, you may need to collect a Biometric Residence Permit (BRP) or confirm your digital eVisa status, and your university must register your enrollment for your visa conditions to remain valid.",
      whatToDo:
        "Collect your BRP if one was issued, or confirm your eVisa status online, then check in with your university's international student office, complete academic registration, attend orientation, and register with a local GP and (if required by your nationality) the police.",
      commonDocuments: [
        "Passport, BRP or eVisa confirmation for check-in",
        "Proof of address for local registration, if required",
      ],
      commonMistakes: [
        "Not confirming eVisa or BRP status is correct shortly after arrival, risking issues later if there's a discrepancy.",
        "Delaying university registration, which is required for your visa/enrollment status to remain valid.",
      ],
      checklist: [
        "BRP collected or eVisa status confirmed",
        "Checked in with international student office",
        "Class registration and any required local registration completed",
      ],
      typicalTiming: "Within the first 1-2 weeks after arrival.",
    },
  ],
};
