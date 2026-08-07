import { z } from "zod";

export const degreeLevelSchema = z.enum(["bachelors", "masters", "phd"]);
export type DegreeLevel = z.infer<typeof degreeLevelSchema>;

export const officialSourceSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});
export type OfficialSource = z.infer<typeof officialSourceSchema>;

/**
 * The 23-step study-abroad journey, goal definition through arrival and
 * registration. Fixed order and titles, shared by every country, so a
 * learner sees the same overall shape everywhere and only the per-country
 * content (why it matters, what to do, documents, timing) changes. Adding or
 * reordering a step here is a deliberate content-model change, not a
 * per-country authoring decision.
 */
export const STUDY_ABROAD_STEPS = [
  { id: "clarify-goals", order: 1, title: "Clarify your goals and target degree level" },
  { id: "research-countries", order: 2, title: "Research countries and education systems" },
  { id: "shortlist-universities", order: 3, title: "Shortlist universities and programs" },
  { id: "check-requirements", order: 4, title: "Check entry requirements and prerequisites" },
  {
    id: "plan-tests",
    order: 5,
    title: "Plan standardized tests (English proficiency, GRE/GMAT, etc.)",
  },
  { id: "take-tests", order: 6, title: "Take tests and get official score reports sent" },
  { id: "draft-cv", order: 7, title: "Draft your academic CV or resume" },
  { id: "write-sop", order: 8, title: "Write your statement of purpose / personal statement" },
  { id: "request-recommendations", order: 9, title: "Request letters of recommendation" },
  { id: "prepare-transcripts", order: 10, title: "Prepare transcripts and credential evaluation" },
  { id: "research-funding", order: 11, title: "Research and shortlist scholarships and funding" },
  { id: "submit-applications", order: 12, title: "Submit university applications" },
  { id: "pay-application-fees", order: 13, title: "Pay application fees" },
  {
    id: "track-applications",
    order: 14,
    title: "Track application status and respond to requests",
  },
  { id: "compare-offers", order: 15, title: "Receive and compare offers" },
  { id: "accept-offer", order: 16, title: "Accept an offer and pay any deposit" },
  { id: "prove-funds", order: 17, title: "Plan and document proof of financial support" },
  { id: "arrange-housing", order: 18, title: "Apply for accommodation or housing" },
  { id: "apply-visa", order: 19, title: "Apply for the student visa" },
  { id: "visa-interview", order: 20, title: "Attend the visa interview or biometrics appointment" },
  {
    id: "health-insurance",
    order: 21,
    title: "Arrange health insurance and pre-departure medical checks",
  },
  { id: "book-travel", order: 22, title: "Book travel and prepare pre-departure logistics" },
  {
    id: "arrive-register",
    order: 23,
    title: "Arrive, complete registration, and attend orientation",
  },
] as const;

export type StudyAbroadStepId = (typeof STUDY_ABROAD_STEPS)[number]["id"];
const STEP_IDS = STUDY_ABROAD_STEPS.map((s) => s.id) as [StudyAbroadStepId, ...StudyAbroadStepId[]];
export const studyAbroadStepIdSchema = z.enum(STEP_IDS);

export const degreeNotesSchema = z.object({
  bachelors: z.string().min(1).optional(),
  masters: z.string().min(1).optional(),
  phd: z.string().min(1).optional(),
});
export type DegreeNotes = z.infer<typeof degreeNotesSchema>;

export const countryStepContentSchema = z.object({
  stepId: studyAbroadStepIdSchema,
  whyItMatters: z.string().min(1),
  whatToDo: z.string().min(1),
  /**
   * Adaptable, labeled "commonly requested" in the UI unless a step
   * explicitly confirms mandatory status. Empty for steps that are genuinely
   * about planning/decisions rather than paperwork (e.g. clarifying goals) --
   * left honest rather than padded with an invented document.
   */
  commonDocuments: z.array(z.string().min(1)).default([]),
  commonMistakes: z.array(z.string().min(1)).min(1),
  checklist: z.array(z.string().min(1)).min(1),
  officialSourceLinks: z.array(officialSourceSchema).default([]),
  /** Plain-language, non-numeric-guarantee timing, e.g. "Typically 4-8 weeks before travel" -- never a bare undated number presented as universal fact. */
  typicalTiming: z.string().min(1),
  /** Only present where bachelor's/master's/PhD genuinely differ for this step. */
  degreeNotes: degreeNotesSchema.optional(),
});
export type CountryStepContent = z.infer<typeof countryStepContentSchema>;
export type CountryStepContentInput = z.input<typeof countryStepContentSchema>;

export const countryRoadmapSchema = z
  .object({
    countrySlug: z.string().regex(/^[a-z0-9-]+$/),
    countryName: z.string().min(1),
    summary: z.string().min(1),
    degreeLevels: z.array(degreeLevelSchema).min(1),
    lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** Top-level official (government/education-ministry) sources for this country -- never a blog, forum, or consultancy site. */
    officialSources: z.array(officialSourceSchema).min(1),
    steps: z.array(countryStepContentSchema).length(STUDY_ABROAD_STEPS.length),
  })
  .superRefine((val, ctx) => {
    const ids = val.steps.map((s) => s.stepId);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: "custom", message: "duplicate step ids", path: ["steps"] });
    }
    for (const def of STUDY_ABROAD_STEPS) {
      if (!ids.includes(def.id)) {
        ctx.addIssue({
          code: "custom",
          message: `missing content for required step "${def.id}"`,
          path: ["steps"],
        });
      }
    }
  });
export type CountryRoadmap = z.infer<typeof countryRoadmapSchema>;
export type CountryRoadmapInput = z.input<typeof countryRoadmapSchema>;
