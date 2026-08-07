import type { CountryRoadmapInput } from "@/lib/study-abroad/types";

/**
 * Germany study-abroad roadmap, following the same structure and sourcing
 * approach as content/study-abroad/united-states.ts. Every fee/timing figure
 * below is phrased in general, non-guaranteed terms rather than a bare
 * number presented as universal fact, since these change and vary by
 * state, institution, and nationality.
 */
export const germanyRoadmap: CountryRoadmapInput = {
  countrySlug: "germany",
  countryName: "Germany",
  summary:
    "Germany combines a large number of public universities with low or no tuition at many institutions, alongside distinct pathways depending on your prior qualification and degree level. Applicants commonly navigate Uni-Assist credential checks, a national (type D) visa for study, proof of financial resources, and mandatory post-arrival registration steps that finish the immigration process locally.",
  degreeLevels: ["bachelors", "masters", "phd"],
  lastReviewed: "2026-08-07",
  officialSources: [
    { label: "Study in Germany (DAAD)", url: "https://www.study-in-germany.de/" },
    {
      label: "Federal Foreign Office — Visa Service",
      url: "https://www.auswaertiges-amt.de/en/visa-service",
    },
  ],
  steps: [
    {
      stepId: "clarify-goals",
      whyItMatters:
        "German higher education pathways differ significantly by degree level -- some non-EU bachelor's applicants need a foundation course first, while master's and PhD entry are usually more direct -- so deciding your degree level early shapes which pathway questions you need to answer.",
      whatToDo:
        "Write down your target degree level, field, intended intake (German universities commonly admit for a winter or summer semester), and a rough budget covering living costs and any tuition.",
      commonDocuments: [],
      commonMistakes: [
        "Not deciding bachelor's vs. master's vs. PhD before researching pathways, then discovering the entry route (direct entry, Studienkolleg, or supervisor-based admission) differs completely.",
        "Assuming low or no tuition means low overall cost, while underestimating living expenses in cities like Munich or Frankfurt.",
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
        "Understanding the difference between public universities (Universitäten), universities of applied sciences (Hochschulen/Fachhochschulen), and the state-by-state structure of German higher education helps you interpret program types and course delivery correctly.",
      whatToDo:
        "Compare research-oriented universities against universities of applied sciences (which often have a more practice-oriented curriculum and mandatory internships), and learn how each German state's education ministry oversees admissions differently.",
      commonDocuments: [],
      commonMistakes: [
        "Treating universities of applied sciences and research universities as interchangeable, when their program structure and academic focus differ.",
        "Assuming tuition and administrative fee policies are identical across every German state -- they are set at the state and institution level.",
      ],
      checklist: [
        "Understand university types (Universität vs. Hochschule)",
        "Understand state-level differences in fees",
      ],
      typicalTiming: "Alongside clarifying your goals, 12-18 months before start.",
    },
    {
      stepId: "shortlist-universities",
      whyItMatters:
        "A balanced shortlist across program types and cities improves your odds of admission while keeping your research manageable, since each program can have its own admission process even within the same university.",
      whatToDo:
        "Build a shortlist of several programs, checking each one's specific admission requirements, language of instruction (German, English, or both), and whether it uses Uni-Assist for the initial application check.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming a program taught in English has no German-language requirement at all, when many still expect basic German for daily life or a later semester.",
        "Not checking early whether a program requires Uni-Assist, which adds its own processing time to the application.",
      ],
      checklist: [
        "Programs shortlisted",
        "Language of instruction confirmed per program",
        "Uni-Assist requirement checked per program",
      ],
      officialSourceLinks: [
        { label: "Study in Germany — find a program", url: "https://www.study-in-germany.de/" },
      ],
      typicalTiming: "10-15 months before start.",
    },
    {
      stepId: "check-requirements",
      whyItMatters:
        "Whether your prior qualification is directly recognized for university entry, or whether you first need a Studienkolleg (a foundation course preparing non-EU students whose secondary qualification isn't directly recognized), fundamentally changes your bachelor's timeline; master's and PhD requirements are generally more straightforward but still program-specific.",
      whatToDo:
        "For bachelor's applicants, check whether your secondary qualification is recognized as equivalent to the German Abitur or requires a Studienkolleg foundation year first. For master's and PhD applicants, confirm the specific academic and language requirements of each shortlisted program.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming every non-EU secondary qualification needs a Studienkolleg, when many are directly recognized depending on the country and subject combination.",
        "Discovering a Studienkolleg requirement only after applying, losing significant time.",
      ],
      checklist: [
        "Requirements listed per shortlisted program",
        "Studienkolleg need (if any) identified early for bachelor's applicants",
      ],
      degreeNotes: {
        bachelors:
          "Some non-EU bachelor's applicants must complete a Studienkolleg foundation course before direct university entry, depending on whether their prior qualification is recognized as equivalent -- check this early, since it can add a year to your timeline.",
        masters:
          "Master's entry typically requires a relevant bachelor's degree and, for some programs, specific prior coursework or a minimum GPA equivalent.",
        phd: "PhD entry in Germany commonly requires first securing a supervisor (Doktorvater/Doktormutter) willing to oversee your research, either through a structured doctoral program or an individual arrangement, in addition to the university's formal requirements.",
      },
      typicalTiming: "10-14 months before start.",
    },
    {
      stepId: "plan-tests",
      whyItMatters:
        "Depending on the program's language of instruction, you may need to prove German proficiency (via TestDaF, DSH, or similar), English proficiency (via IELTS or TOEFL iBT) for English-taught programs, or both, and each needs enough lead time to prepare and sit.",
      whatToDo:
        "Confirm which language test(s) each shortlisted program requires and its minimum scores, then build a study and test-date plan with buffer time for a possible retake.",
      commonDocuments: [],
      commonMistakes: [
        "Assuming an English-taught program has no German-language requirement, when some set a basic German minimum for daily administrative life.",
        "Booking a language test date too close to the application or Uni-Assist submission deadline.",
      ],
      checklist: [
        "Required language test(s) confirmed per program",
        "Test dates booked with retake buffer",
      ],
      typicalTiming:
        "9-14 months before start; book tests at least 2-3 months before the earliest deadline.",
    },
    {
      stepId: "take-tests",
      whyItMatters:
        "Language test results generally need to be submitted alongside your application (often through Uni-Assist), and processing or delivery of official results can take time, so timing matters against both the program deadline and the visa application later.",
      whatToDo:
        "Sit your planned language test(s), then have official results sent to each shortlisted program or uploaded to Uni-Assist as required, and keep a copy for your later visa application.",
      commonDocuments: ["Official language test results"],
      commonMistakes: [
        "Uploading only an unofficial screenshot of results when the program or Uni-Assist requires an official certified copy.",
        "Missing a program's specific deadline for submitting test results relative to the Uni-Assist processing window.",
      ],
      checklist: ["Test(s) completed", "Official results sent to programs or Uni-Assist"],
      typicalTiming: "6-10 months before start, with buffer before the earliest deadline.",
    },
    {
      stepId: "draft-cv",
      whyItMatters:
        "German applications commonly expect a tabular CV (Lebenslauf) in a clear chronological or reverse-chronological format, and PhD applications specifically expect research experience and any publications to be clearly highlighted.",
      whatToDo:
        "Draft a clear, tabular CV covering education, work or research experience, and relevant skills, following the format conventions common to German applications, then have someone familiar with them review it.",
      commonDocuments: ["Tabular CV (Lebenslauf)"],
      commonMistakes: [
        "Using a narrative resume style instead of the tabular chronological format commonly expected in German applications.",
        "Leaving out research experience or projects directly relevant to a master's or PhD program.",
      ],
      checklist: [
        "CV drafted in tabular format",
        "Reviewed by someone familiar with German application conventions",
      ],
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "write-sop",
      whyItMatters:
        "Many master's programs and virtually all PhD applications expect a letter of motivation or research proposal connecting your background to the specific program, department, or prospective supervisor.",
      whatToDo:
        "Write a program-specific letter of motivation (or, for a PhD, a research proposal aligned with a prospective supervisor's area) explaining your fit, then revise it across multiple drafts.",
      commonDocuments: ["Letter of motivation or research proposal (program-dependent)"],
      commonMistakes: [
        "Reusing an identical, generic letter across different programs without tailoring it to each one.",
        "For a PhD proposal, not aligning the topic with the actual research focus of the department or prospective supervisor.",
      ],
      checklist: ["Draft written", "Tailored per program", "Proofread by another person"],
      typicalTiming: "8-12 months before start.",
    },
    {
      stepId: "request-recommendations",
      whyItMatters:
        "Master's and especially PhD applications commonly require academic references, and giving recommenders enough lead time and context helps them write a stronger, more specific letter.",
      whatToDo:
        "Ask recommenders early, share your CV and program details, and confirm each program's or Uni-Assist's submission process for references.",
      commonDocuments: ["Academic reference letters (program-dependent)"],
      commonMistakes: [
        "Requesting a reference with only a few weeks' notice before the deadline.",
        "Not telling recommenders which specific program or research area you're applying to.",
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
        "Many German universities require a centralized credential check through Uni-Assist for international applicants, which verifies your prior qualifications are formally recognized before an application can even be forwarded to the university's own admissions process.",
      whatToDo:
        "Order official transcripts from every institution you've attended, check whether your target programs require submission through Uni-Assist, and start that process well ahead of deadlines since credential checks can take several weeks.",
      commonDocuments: [
        "Official transcripts from every institution attended",
        "Uni-Assist application and supporting documents, if required",
      ],
      commonMistakes: [
        "Starting the Uni-Assist credential check too close to the deadline -- processing can take several weeks, especially in peak season.",
        "Submitting uncertified copies when a program or Uni-Assist requires certified true copies or officially translated documents.",
      ],
      checklist: ["Transcripts ordered", "Uni-Assist process started if required"],
      typicalTiming: "8-11 months before start.",
    },
    {
      stepId: "research-funding",
      whyItMatters:
        "Public university tuition is low or absent at many German institutions, but living costs still need to be covered, and funding availability varies by degree level -- DAAD and other scholarships are widely used, particularly for master's and PhD study.",
      whatToDo:
        "Research DAAD scholarships and other program- or state-specific funding, note that scholarship deadlines are often much earlier than admission deadlines, and consider whether a scholarship could also help satisfy the visa's financial-resources requirement.",
      commonDocuments: ["Scholarship application forms (program-dependent)"],
      commonMistakes: [
        "Assuming low or no tuition means no need to plan funding for living costs, which still require documented financial resources for the visa.",
        "Missing a DAAD or institutional scholarship deadline that falls well before the general admission deadline.",
      ],
      checklist: [
        "Funding options researched (DAAD and others)",
        "Funding deadlines noted separately from admission deadlines",
      ],
      degreeNotes: {
        phd: "PhD funding in Germany often comes through a paid research-assistant position, a structured doctoral program stipend, or a scholarship (such as DAAD) rather than automatic university funding -- confirm which applies to your specific arrangement.",
      },
      typicalTiming: "8-12 months before start, alongside your applications.",
    },
    {
      stepId: "submit-applications",
      whyItMatters:
        "Depending on the program, you'll apply either directly to the university, through Uni-Assist, or through the centralized hochschulstart.de portal for certain restricted-admission subjects, and each has its own document checklist and process.",
      whatToDo:
        "Confirm which application route each shortlisted program uses, create the necessary accounts, upload every required document in the specified format, and submit with buffer before the deadline.",
      commonDocuments: [
        "Completed application form",
        "CV, letter of motivation, transcripts, test scores, references (as applicable)",
      ],
      commonMistakes: [
        "Applying directly to a university when the program actually requires routing through Uni-Assist first.",
        "Submitting right at the deadline with no buffer for portal issues or missing document uploads.",
      ],
      checklist: [
        "Correct application route confirmed per program",
        "All required documents uploaded",
        "Application submitted with buffer before deadline",
      ],
      typicalTiming: "6-10 months before start (deadlines vary by program and semester).",
    },
    {
      stepId: "pay-application-fees",
      whyItMatters:
        "Uni-Assist charges a processing fee for the first program application plus a smaller fee for each additional one in the same cycle, separate from any semester contribution paid later after enrollment.",
      whatToDo:
        "Budget for the Uni-Assist processing fee if applicable, and check whether individual universities charge their own application fee outside the Uni-Assist process.",
      commonDocuments: ["Application fee payment confirmation, where applicable"],
      commonMistakes: [
        "Confusing the Uni-Assist application-processing fee with the later semester contribution (Semesterbeitrag) paid after enrollment.",
        "Not budgeting for per-program fees when applying to several programs through Uni-Assist in the same cycle.",
      ],
      checklist: ["Application fees checked per program/Uni-Assist", "Payment confirmation kept"],
      typicalTiming: "At the time of each application submission.",
    },
    {
      stepId: "track-applications",
      whyItMatters:
        "Uni-Assist and individual universities may request missing documents or clarification after submission, and missing these follow-ups can stall an otherwise complete application.",
      whatToDo:
        "Check your Uni-Assist account and each university portal or email regularly, respond promptly to requests, and keep a simple tracker of each program's status and outstanding items.",
      commonDocuments: [],
      commonMistakes: [
        "Not checking the Uni-Assist account after submitting, missing a request for an additional or corrected document.",
        "Missing a follow-up email sent to a rarely-checked inbox.",
      ],
      checklist: [
        "Application tracker set up",
        "Portals/accounts checked regularly",
        "Requests responded to promptly",
      ],
      typicalTiming: "Ongoing, from submission through decision.",
    },
    {
      stepId: "compare-offers",
      whyItMatters:
        "An admission letter (Zulassungsbescheid) is only part of the picture -- comparing program structure, city living costs, language of instruction, and (for research degrees) supervisor fit matters more than name recognition alone.",
      whatToDo:
        "For each offer, compare program structure and duration, city living costs, language requirements for daily life, and, for research degrees, the supervisor and department fit.",
      commonDocuments: [
        "Admission letters (Zulassungsbescheid)",
        "Scholarship award letters, if applicable",
      ],
      commonMistakes: [
        "Focusing only on tuition (often low across public universities) while ignoring large differences in city living costs.",
        "Not confirming exactly what a scholarship covers and for how long before deciding between offers.",
      ],
      checklist: [
        "Offers compared on cost of living and fit",
        "Scholarship terms confirmed where applicable",
      ],
      typicalTiming: "3-6 months before start, as decisions arrive.",
    },
    {
      stepId: "accept-offer",
      whyItMatters:
        "Formally accepting your offer and, where required, paying a deposit or securing a place is what allows you to move forward with enrollment documentation needed for your visa application.",
      whatToDo:
        "Formally accept your chosen offer through the university's process, complete any required confirmation steps, and request the admission documentation you'll need for your visa application.",
      commonDocuments: ["Formal acceptance confirmation", "Admission letter (Zulassungsbescheid)"],
      commonMistakes: [
        "Assuming a reply email accepts the offer, rather than completing the university's formal confirmation process.",
        "Not requesting the specific admission documentation the consulate will require for the visa application.",
      ],
      checklist: ["Offer formally accepted", "Admission documentation obtained for visa use"],
      typicalTiming: "As soon as you've decided, generally 3-6 months before start.",
    },
    {
      stepId: "prove-funds",
      whyItMatters:
        "The German student visa requires proof of financial resources, commonly shown through a blocked account (Sperrkonto), a formal sponsor commitment (Verpflichtungserklärung), or a recognized scholarship (such as DAAD) -- the blocked-account amount is a government-set annual minimum that is reviewed periodically, so check the current published figure rather than an older one.",
      whatToDo:
        "Choose your financial-proof method -- opening a blocked account with a recognized provider, arranging a formal sponsor commitment, or confirming your scholarship award letter meets the requirement -- and gather the documentation the consulate specifies for your case.",
      commonDocuments: [
        "Blocked account (Sperrkonto) confirmation, if used",
        "Formal sponsor commitment (Verpflichtungserklärung), if used",
        "Scholarship award letter, if used",
      ],
      commonMistakes: [
        "Assuming a personal bank statement alone satisfies the requirement, when consulates generally expect one of the specific recognized methods (blocked account, sponsor commitment, or scholarship).",
        "Using an outdated blocked-account minimum instead of checking the current government-set annual amount.",
      ],
      checklist: [
        "Financial-proof method chosen",
        "Documentation gathered matching the current published requirement",
      ],
      typicalTiming: "2-4 months before start, and confirmed fresh before the visa application.",
    },
    {
      stepId: "arrange-housing",
      whyItMatters:
        "Student dormitories (Studentenwohnheime) run by regional Studierendenwerke often have long waitlists and their own separate application timeline, while the private rental market in major German cities can be very competitive.",
      whatToDo:
        "Apply early to your local Studierendenwerk for dormitory housing if available, and in parallel research private rental options, since dormitory places are limited and private searches can take time.",
      commonDocuments: ["Housing application, if applicable"],
      commonMistakes: [
        "Applying to student dormitory housing too late, after waitlists are already full for the semester.",
        "Committing to private rental housing sight-unseen through an unverified listing.",
      ],
      checklist: [
        "Dormitory application submitted if pursuing that option",
        "Private rental research started in parallel",
      ],
      typicalTiming: "3-5 months before start (dormitory applications can need earlier lead time).",
    },
    {
      stepId: "apply-visa",
      whyItMatters:
        "Most non-EU students apply for a national (type D) study or student-applicant visa at a German consulate in their home country before travel -- this initial visa is generally not the final long-stay residence permit, which is applied for locally after arrival.",
      whatToDo:
        "Book a visa appointment at the German consulate responsible for your location, prepare your admission letter, proof of financial resources, health insurance, and passport, and complete the consulate's specific national visa application form.",
      commonDocuments: [
        "Admission letter (Zulassungsbescheid)",
        "Proof of financial resources (blocked account, sponsor commitment, or scholarship letter)",
        "Health insurance confirmation",
        "Valid passport",
        "Completed national visa application form",
      ],
      commonMistakes: [
        "Booking the consulate appointment too late -- national visa appointment availability varies widely and can have a long lead time.",
        "Assuming the national visa is the final residence document, when a residence permit application is still needed locally after arrival.",
      ],
      checklist: [
        "Consulate appointment booked",
        "All required documents prepared",
        "National visa application submitted",
      ],
      officialSourceLinks: [
        {
          label: "Federal Foreign Office — Visa Service",
          url: "https://www.auswaertiges-amt.de/en/visa-service",
        },
      ],
      typicalTiming:
        "As soon as your admission letter arrives, generally 2-4 months before start; consulate appointment availability varies by location and season.",
    },
    {
      stepId: "visa-interview",
      whyItMatters:
        "The consulate appointment is where an official reviews your documents in person and may ask about your study plans and financial arrangements -- being prepared and consistent with your written application matters.",
      whatToDo:
        "Bring all required original documents and copies, be ready to explain your program choice and financial arrangements clearly, and answer questions directly and honestly.",
      commonDocuments: [
        "Passport",
        "Admission letter",
        "Proof of financial resources",
        "Health insurance confirmation",
        "Biometric photo, per consulate specifications",
      ],
      commonMistakes: [
        "Arriving without originals of documents already submitted electronically or by mail.",
        "Being unable to explain the financial-proof method used, especially if a sponsor or scholarship is involved.",
      ],
      checklist: [
        "All required documents organized",
        "Practiced clear, honest answers about study and financial plans",
      ],
      typicalTiming:
        "Scheduled 2-4 months before start; actual processing time varies widely by consulate.",
    },
    {
      stepId: "health-insurance",
      whyItMatters:
        "Enrollment at a German university requires proof of health insurance recognized by the German system, and there's an important distinction between the travel/incoming insurance used for the visa-application period and the public (or approved private) health insurance required for actual enrollment.",
      whatToDo:
        "Arrange short-term travel/incoming health insurance to cover the visa-application and early arrival period, then switch to a German public health insurance provider (or an approved private plan, depending on your situation) once you arrive to enroll, since universities require this specific proof before finalizing registration.",
      commonDocuments: [
        "Travel/incoming health insurance for the visa period",
        "German public (or approved private) health insurance confirmation, for enrollment",
      ],
      commonMistakes: [
        "Assuming the travel insurance used for the visa application also satisfies the university's enrollment insurance requirement -- it generally does not.",
        "Delaying enrollment in German public health insurance after arrival, which can hold up university registration.",
      ],
      checklist: [
        "Travel/incoming insurance arranged for visa period",
        "German health insurance plan identified for post-arrival enrollment",
      ],
      typicalTiming:
        "Travel insurance arranged 1-2 months before start; German health insurance finalized shortly after arrival.",
    },
    {
      stepId: "book-travel",
      whyItMatters:
        "Your national visa specifies a validity window, so travel timing needs to fit within it while leaving enough buffer to complete post-arrival registration steps before your program begins.",
      whatToDo:
        "Book travel within your visa's validity window, pack required original documents in carry-on luggage, and confirm any arrival logistics with your university's international office.",
      commonDocuments: [
        "Passport with visa",
        "Admission letter",
        "Proof of financial resources copies",
      ],
      commonMistakes: [
        "Packing the admission letter or passport in checked luggage.",
        "Booking arrival too close to the semester start, leaving no buffer for Anmeldung and other post-arrival registration steps.",
      ],
      checklist: [
        "Travel booked within visa validity window",
        "Required documents packed in carry-on",
      ],
      typicalTiming: "3-6 weeks before start.",
    },
    {
      stepId: "arrive-register",
      whyItMatters:
        "Germany requires two distinct post-arrival steps for most non-EU students: registering your address (Anmeldung) at the local citizens' office soon after moving in, and applying for a residence permit (Aufenthaltstitel) at the local Ausländerbehörde, since the national visa you entered on is usually not the final long-stay document.",
      whatToDo:
        "Register your address (Anmeldung) at the local citizens' registration office within the locally required timeframe after moving in, then book an appointment at the Ausländerbehörde to apply for your residence permit, bringing your admission/enrollment proof, health insurance, financial evidence, and Anmeldung confirmation.",
      commonDocuments: [
        "Anmeldung confirmation (address registration)",
        "Passport and national visa",
        "University enrollment confirmation",
        "Health insurance confirmation",
        "Proof of financial resources",
      ],
      commonMistakes: [
        "Missing the local deadline for Anmeldung after moving into permanent housing.",
        "Assuming the national visa is sufficient for the whole program, without applying for the residence permit at the Ausländerbehörde afterward.",
      ],
      checklist: [
        "Anmeldung completed",
        "Ausländerbehörde appointment booked",
        "Residence permit application submitted",
      ],
      typicalTiming:
        "Anmeldung within the first 1-2 weeks after arrival; residence permit application soon after, before the national visa's validity ends.",
    },
  ],
};
