import { z } from "zod";

export const runnerLanguageSchema = z.enum([
  "html",
  "javascript",
  "typescript",
  "python",
  "sql",
  "none",
]);
export type RunnerLanguage = z.infer<typeof runnerLanguageSchema>;

export const difficultySchema = z.enum(["beginner", "intermediate", "advanced"]);
export type Difficulty = z.infer<typeof difficultySchema>;

export const referenceSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
});
export type ContentReference = z.infer<typeof referenceSchema>;

export const quizQuestionSchema = z.object({
  id: z.string().min(1),
  prompt: z.string().min(1),
  choices: z.array(z.string().min(1)).min(2),
  correctIndex: z.number().int().min(0),
  explanation: z.string().min(1),
});
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;

/** A single deterministic assertion run against learner code. */
export const exerciseTestSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1),
  hidden: z.boolean().default(false),
});
export type ExerciseTest = z.infer<typeof exerciseTestSchema>;

export const exerciseSchema = z
  .object({
    id: z.string().min(1),
    kind: z.enum(["guided", "independent"]),
    prompt: z.string().min(1),
    language: runnerLanguageSchema,
    starterCode: z.string(),
    solutionCode: z.string().min(1),
    /** Code appended after learner code to drive deterministic checks (test harness). */
    harness: z.string().min(1),
    tests: z.array(exerciseTestSchema).min(1),
    hints: z.array(z.string().min(1)).min(2),
    /** For SQL exercises: seed SQL executed before every attempt. */
    seedSql: z.string().optional(),
    /** For SQL exercises: if true, row order in the result matters for comparison. */
    sqlOrderSensitive: z.boolean().default(false),
  })
  .superRefine((val, ctx) => {
    if (val.language === "sql" && !val.seedSql) {
      ctx.addIssue({ code: "custom", message: "SQL exercises require seedSql", path: ["seedSql"] });
    }
  });
export type Exercise = z.infer<typeof exerciseSchema>;
/** Authoring shape: defaulted fields (e.g. sqlOrderSensitive) may be omitted. */
export type ExerciseInput = z.input<typeof exerciseSchema>;

/**
 * A guided local lab: instructional content for an environment this
 * platform's browser runners cannot honestly execute (React tooling, Node,
 * Express, local test/automation tools, ...). It is never rendered with a
 * Run button and never implies the site executed or verified anything --
 * `components/lesson/guided-local-lab-panel.tsx` renders a fixed, non-
 * author-editable "Runs on your computer" banner on every lab for exactly
 * that reason (so the honest label can't be forgotten or softened by a
 * specific lesson's authoring). See docs/ARCHITECTURE.md's guided local lab
 * section.
 */
export const guidedLocalLabFileSchema = z.object({
  path: z.string().min(1),
  content: z.string().min(1),
});
export type GuidedLocalLabFile = z.infer<typeof guidedLocalLabFileSchema>;

export const guidedLocalLabSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  scenario: z.string().min(1),
  requiredTools: z.array(z.object({ name: z.string().min(1), version: z.string().min(1) })).min(1),
  setupSteps: z.array(z.string().min(1)).min(1),
  projectStructure: z.string().min(1),
  starterFiles: z.array(guidedLocalLabFileSchema).min(1),
  requirements: z.array(z.string().min(1)).min(1),
  commands: z
    .array(z.object({ description: z.string().min(1), command: z.string().min(1) }))
    .min(1),
  expectedBehavior: z.string().min(1),
  verificationSteps: z
    .array(z.object({ command: z.string().min(1), expectedResult: z.string().min(1) }))
    .min(1),
  troubleshooting: z.array(z.object({ issue: z.string().min(1), fix: z.string().min(1) })).min(1),
  hints: z.array(z.string().min(1)).min(2),
  referenceSolution: z.object({
    summary: z.string().min(1),
    files: z.array(guidedLocalLabFileSchema).min(1),
  }),
  extensionChallenge: z.string().min(1),
});
export type GuidedLocalLab = z.infer<typeof guidedLocalLabSchema>;
export type GuidedLocalLabInput = z.input<typeof guidedLocalLabSchema>;

/**
 * A guided-output lab: for languages this platform cannot safely execute in
 * the browser at all (C, C++, C#, Angular, AngularJS, PHP, Go, Kotlin -- see
 * docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md for the per-language
 * rationale). There is no code editor that does anything and no Run button.
 * The learner reads real code and either predicts, fills in, or follows an
 * edited sequence, then compares against a precomputed "expectedOutput" --
 * `components/runners/guided-output-panel.tsx` renders that field under a
 * fixed "Expected output" heading (never "Your output") for exactly the same
 * "can't be softened by a specific lesson's authoring" reason
 * guidedLocalLabSchema's banner is fixed.
 */
export const guidedOutputStepSchema = z.object({
  /** Narrative for a single edit in "guided-editing" mode; omitted for predict/fill-in-blank. */
  description: z.string().min(1).optional(),
  code: z.string().min(1),
  expectedOutput: z.string().min(1),
});
export type GuidedOutputStep = z.infer<typeof guidedOutputStepSchema>;

export const guidedOutputLabSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    /** Display label only (e.g. "C", "Go") -- deliberately not runnerLanguageSchema, since none of these ever execute. */
    language: z.string().min(1),
    mode: z.enum(["predict", "fill-in-blank", "guided-editing"]),
    prompt: z.string().min(1),
    steps: z.array(guidedOutputStepSchema).min(1),
    /** fill-in-blank only: the literal placeholder text used inside a step's code, e.g. "____". */
    blankPlaceholder: z.string().min(1).optional(),
    /** fill-in-blank only: the correct fill, shown on reveal for self-check -- never graded/submitted anywhere. */
    blankAnswer: z.string().min(1).optional(),
    hints: z.array(z.string().min(1)).min(1),
  })
  .superRefine((val, ctx) => {
    if (val.mode === "fill-in-blank" && (!val.blankAnswer || !val.blankPlaceholder)) {
      ctx.addIssue({
        code: "custom",
        message: "fill-in-blank guided output labs require blankPlaceholder and blankAnswer",
        path: ["blankAnswer"],
      });
    }
    if (val.mode !== "guided-editing" && val.steps.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "predict/fill-in-blank guided output labs must have exactly one step",
        path: ["steps"],
      });
    }
  });
export type GuidedOutputLab = z.infer<typeof guidedOutputLabSchema>;
export type GuidedOutputLabInput = z.input<typeof guidedOutputLabSchema>;

export const codeExampleSchema = z.object({
  language: runnerLanguageSchema,
  code: z.string().min(1),
  description: z.string().min(1),
  editable: z.boolean().default(false),
});
export type CodeExample = z.infer<typeof codeExampleSchema>;
export type CodeExampleInput = z.input<typeof codeExampleSchema>;

export const lessonSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "id must be kebab-case"),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string().min(1),
  trackSlug: z.string().min(1),
  courseSlug: z.string().min(1),
  order: z.number().int().min(0),
  difficulty: difficultySchema,
  estimatedMinutes: z.number().int().min(1),
  prerequisites: z.array(z.string()).default([]),
  objectives: z.array(z.string().min(1)).min(1),
  skills: z.array(z.string().min(1)).min(1),
  tech: z.array(z.object({ name: z.string(), version: z.string() })).default([]),
  author: z.string().min(1),
  reviewer: z.string().min(1),
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  references: z.array(referenceSchema).default([]),
  keywords: z.array(z.string().min(1)).default([]),
  /** Plain-language explanation, markdown. */
  explanation: z.string().min(1),
  /** Optional diagram description rendered as an accessible SVG/ASCII component. */
  visual: z
    .object({ kind: z.enum(["diagram", "table"]), title: z.string(), description: z.string() })
    .optional(),
  example: codeExampleSchema,
  editableExample: codeExampleSchema.optional(),
  guidedExercise: exerciseSchema,
  independentExercise: exerciseSchema,
  /**
   * Optional: for lessons whose real work happens outside the browser (a
   * React component, an Express route, ...). Additive to, never a
   * replacement for, guidedExercise/independentExercise -- every lesson
   * still has a real, browser-executable exercise reinforcing the
   * underlying JS/TS concepts, so lib/learning/store.ts's mastery/
   * completion logic (which reads guidedExercise.id/independentExercise.id
   * unconditionally) needed no changes for this feature.
   */
  guidedLocalLab: guidedLocalLabSchema.optional(),
  /**
   * Optional: for lessons in a language this platform cannot safely execute
   * in the browser at all (see guidedOutputLabSchema above). Additive, same
   * reasoning as guidedLocalLab -- every lesson still declares a real
   * example/guidedExercise/independentExercise (typically with
   * example.language "none" for these courses) so completion/mastery logic
   * needs no special case.
   */
  guidedOutputLab: guidedOutputLabSchema.optional(),
  commonMistakes: z.array(z.string().min(1)).min(1),
  quiz: z.array(quizQuestionSchema).min(3),
  takeaway: z.string().min(1),
  summary: z.string().min(1),
  nextLessonSlug: z.string().optional(),
});
export type Lesson = z.infer<typeof lessonSchema>;
/** Authoring shape used by content/lessons/*.ts -- defaulted fields optional. */
export type LessonInput = z.input<typeof lessonSchema>;

/**
 * An ordered group of lessons within a course. Modules exist so a learner can
 * see a course's shape before committing to it, and so long courses have
 * meaningful checkpoints instead of a flat 12+ item list.
 *
 * `lessonSlugs` is the single source of truth for module membership and
 * ordering; `scripts/validate-content.ts` fails the build if a module
 * references a lesson that doesn't exist, if a lesson belongs to no module, or
 * if a lesson is claimed by two modules.
 */
export const courseModuleSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  lessonSlugs: z.array(z.string().min(1)).min(1),
});
export type CourseModule = z.infer<typeof courseModuleSchema>;

export const courseSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  trackSlug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().min(0),
  difficulty: difficultySchema,
  estimatedHours: z.number().min(0.5),
  /** Who this course is written for, in plain language. */
  audience: z.string().min(1),
  /**
   * What a learner can actually do after finishing. Phrased as observable
   * capabilities, not "understand X" -- the validator has no way to check
   * phrasing, but docs/CONTENT_AUTHORING.md states the rule for authors.
   */
  learningOutcomes: z.array(z.string().min(1)).min(3),
  /**
   * Course slugs a learner should finish first. Validated to resolve to real
   * courses and to be acyclic, so the catalog can render a genuine sequence
   * rather than an aspirational one.
   */
  prerequisiteCourseSlugs: z.array(z.string().min(1)).default([]),
  /** Suggested continuations, validated to resolve to real courses. */
  nextCourseSlugs: z.array(z.string().min(1)).default([]),
  /** Technology directory slugs this course genuinely teaches (drives guide -> course links). */
  relatedTechnologySlugs: z.array(z.string().min(1)).default([]),
  modules: z.array(courseModuleSchema).min(1),
});
export type Course = z.infer<typeof courseSchema>;
/** Authoring shape -- defaulted array fields may be omitted. */
export type CourseInput = z.input<typeof courseSchema>;

export const trackSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().min(0),
});
export type Track = z.infer<typeof trackSchema>;

export const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string().min(1),
  difficulty: difficultySchema,
  estimatedHours: z.number().min(0.5),
  isCapstone: z.boolean().default(false),
  trackSlugs: z.array(z.string()).min(1),
  prerequisiteLessonIds: z.array(z.string()).default([]),
  objectives: z.array(z.string().min(1)).min(1),
  milestones: z
    .array(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        checklist: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(2),
  references: z.array(referenceSchema).default([]),
});
export type Project = z.infer<typeof projectSchema>;
export type ProjectInput = z.input<typeof projectSchema>;
