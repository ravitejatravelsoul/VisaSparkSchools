import { z } from "zod";
import { difficultySchema, referenceSchema, runnerLanguageSchema } from "@/lib/content/types";

/**
 * Canonical 16-category taxonomy (docs/ARCHITECTURE.md "Technology directory"
 * section). Not every category is public yet -- see `publicVisibility` on
 * each category record. Adding a category ID here does not expose it
 * anywhere; a category only becomes reachable once it has real content and
 * `publicVisibility: true`.
 */
export const categoryIdSchema = z.enum([
  "foundations",
  "frontend",
  "backend",
  "programming-languages",
  "mobile",
  "databases",
  "data-science",
  "artificial-intelligence",
  "cloud-devops",
  "cybersecurity",
  "testing-qa",
  "dsa",
  "developer-tools",
  "quantitative-aptitude",
  "reasoning",
  "career-gd",
]);
export type CategoryId = z.infer<typeof categoryIdSchema>;

export const categorySchema = z.object({
  id: categoryIdSchema,
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  introduction: z.string().min(1),
  /** Identifier into the existing icon system (components/ui/icons or similar) -- not a raster/logo asset. */
  icon: z.string().min(1),
  order: z.number().int().min(0),
  searchKeywords: z.array(z.string().min(1)).default([]),
  relatedCategoryIds: z.array(categoryIdSchema).default([]),
  audience: z.string().min(1),
  /** Only categories with substantive, validated public content should ever be true. */
  publicVisibility: z.boolean().default(false),
  featured: z.boolean().default(false),
});
export type Category = z.infer<typeof categorySchema>;
export type CategoryInput = z.input<typeof categorySchema>;

export const technologyStatusSchema = z.enum(["current", "legacy", "specialized", "conceptual"]);
export type TechnologyStatus = z.infer<typeof technologyStatusSchema>;

export const versionPolicySchema = z.enum(["evergreen", "pinned", "not-applicable"]);
export type VersionPolicy = z.infer<typeof versionPolicySchema>;

/**
 * Subset of `runnerLanguageSchema` (lib/content/types.ts) that excludes
 * "none" -- a technology can only claim runner support if it maps to one of
 * the actually-implemented sandboxed runners (iframe HTML/CSS/JS, Pyodide
 * Python, sql.js SQL). This is a real constraint, not just documentation:
 * `getTechnologyAvailability` (lib/directory/availability.ts) is the only
 * place that decides whether "Open playground" may be shown, and it only
 * ever reads this field.
 */
export const runnerRefSchema = z.enum(["html", "javascript", "typescript", "python", "sql"]);
export type RunnerRef = z.infer<typeof runnerRefSchema>;

export const technologyExampleSchema = z.object({
  language: runnerLanguageSchema.optional(),
  code: z.string().min(1),
  explanation: z.string().min(1),
});
export type TechnologyExample = z.infer<typeof technologyExampleSchema>;

export const technologySchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    name: z.string().min(1),
    category: categoryIdSchema,
    subcategory: z.string().optional(),
    description: z.string().min(1),
    overview: z.string().min(1),
    whatItIs: z.string().min(1),
    whyItsUsed: z.string().min(1),
    whereItFits: z.string().min(1),
    beginnerFriendly: z.boolean(),
    difficulty: difficultySchema,
    /** Technology IDs, not lesson/skill IDs -- validated against this same registry. */
    prerequisiteIds: z.array(z.string().min(1)).default([]),
    relatedIds: z.array(z.string().min(1)).default([]),
    /** Optional hint for ordering technologies within a category's "recommended sequence" list. */
    learningOrder: z.number().int().min(0).optional(),
    coreConcepts: z.array(z.string().min(1)).min(1),
    example: technologyExampleSchema,
    useCases: z.array(z.string().min(1)).min(1),
    practiceOptions: z.array(z.string().min(1)).default([]),
    projectIdeas: z.array(z.string().min(1)).min(1),
    references: z.array(referenceSchema).min(1),
    searchKeywords: z.array(z.string().min(1)).default([]),
    status: technologyStatusSchema,
    /** Required when status === "legacy" -- enforced below. */
    legacyNote: z.string().optional(),
    versionPolicy: versionPolicySchema,
    currentVersion: z.string().optional(),
    versionNotes: z.string().optional(),
    /** ISO date (YYYY-MM-DD) content was last technically reviewed. */
    lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "lastReviewed must be YYYY-MM-DD"),
    /**
     * Reference to a real `content/courses.ts` course id. Deliberately just
     * a reference, not a boolean -- `getTechnologyAvailability` resolves it
     * against the live course registry so a stale/typo'd id fails
     * validation instead of silently rendering a fake "Start course" link.
     */
    courseId: z.string().optional(),
    runnerSupport: runnerRefSchema.optional(),
    /** References to real `content/projects.ts` project ids. */
    projectIds: z.array(z.string().min(1)).default([]),
    /** Only set when a real, named reviewer exists -- never a placeholder. */
    contentOwner: z.string().optional(),
    publicVisibility: z.boolean().default(true),
  })
  .superRefine((val, ctx) => {
    if (val.status === "legacy" && !val.legacyNote) {
      ctx.addIssue({
        code: "custom",
        message: "Legacy technologies must explain their legacy status via legacyNote.",
        path: ["legacyNote"],
      });
    }
    if (val.versionPolicy === "pinned" && !val.currentVersion) {
      ctx.addIssue({
        code: "custom",
        message: "versionPolicy 'pinned' requires a currentVersion.",
        path: ["currentVersion"],
      });
    }
    if (val.prerequisiteIds.includes(val.id)) {
      ctx.addIssue({
        code: "custom",
        message: "A technology cannot be its own prerequisite.",
        path: ["prerequisiteIds"],
      });
    }
    if (val.relatedIds.includes(val.id)) {
      ctx.addIssue({
        code: "custom",
        message: "A technology cannot relate to itself.",
        path: ["relatedIds"],
      });
    }
  });
export type Technology = z.infer<typeof technologySchema>;
export type TechnologyInput = z.input<typeof technologySchema>;

export const pathStepTypeSchema = z.enum([
  "technology-guide",
  "course",
  "practice",
  "project",
  "assessment",
]);
export type PathStepType = z.infer<typeof pathStepTypeSchema>;

export const pathStepSchema = z.object({
  id: z.string().min(1),
  type: pathStepTypeSchema,
  /** Meaning depends on `type`: a technology id, a course id, or a project id. */
  refId: z.string().min(1),
  title: z.string().min(1),
  required: z.boolean().default(true),
});
export type PathStep = z.infer<typeof pathStepSchema>;
export type PathStepInput = z.input<typeof pathStepSchema>;

export const learningPathSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  intendedLearner: z.string().min(1),
  expectedOutcome: z.string().min(1),
  /** Technology ids a learner should already know before starting. */
  prerequisiteIds: z.array(z.string().min(1)).default([]),
  steps: z.array(pathStepSchema).min(1),
  milestones: z.array(z.string().min(1)).default([]),
  estimatedTimeRange: z.string().min(1),
  skillsEarned: z.array(z.string().min(1)).min(1),
  requiredProjectIds: z.array(z.string().min(1)).default([]),
  /** Must be false in this phase -- no assessment system exists yet. Validated. */
  finalAssessmentRequired: z.boolean().default(false),
  /** Must be false in this phase -- no certificate system exists yet. Validated. */
  certificateEligible: z.boolean().default(false),
  primaryCategoryIds: z.array(categoryIdSchema).min(1),
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "lastReviewed must be YYYY-MM-DD"),
  relatedTechnologyIds: z.array(z.string().min(1)).default([]),
  relatedCourseIds: z.array(z.string().min(1)).default([]),
  publicVisibility: z.boolean().default(false),
  /**
   * True for every public path in this phase: a roadmap of guides/courses/
   * projects, explicitly not a certifiable, assessed course path (that
   * would require Phase 8's certificate system). See docs/CURRICULUM.md.
   */
  roadmapOnly: z.boolean().default(true),
});
export type LearningPath = z.infer<typeof learningPathSchema>;
export type LearningPathInput = z.input<typeof learningPathSchema>;
