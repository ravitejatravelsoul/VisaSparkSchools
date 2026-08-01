import { z } from "zod";

export const runnerLanguageSchema = z.enum(["html", "javascript", "python", "sql", "none"]);
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
  commonMistakes: z.array(z.string().min(1)).min(1),
  quiz: z.array(quizQuestionSchema).min(3),
  takeaway: z.string().min(1),
  summary: z.string().min(1),
  nextLessonSlug: z.string().optional(),
});
export type Lesson = z.infer<typeof lessonSchema>;
/** Authoring shape used by content/lessons/*.ts -- defaulted fields optional. */
export type LessonInput = z.input<typeof lessonSchema>;

export const courseSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  trackSlug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().min(0),
  difficulty: difficultySchema,
  estimatedHours: z.number().min(0.5),
});
export type Course = z.infer<typeof courseSchema>;

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
