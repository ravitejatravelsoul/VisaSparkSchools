import { z } from "zod";
import { referenceSchema } from "@/lib/content/types";

/**
 * The four exam-preparation course slugs (Phase 6). Single source of truth --
 * `scripts/validate-content.ts` imports this instead of keeping its own
 * separate list, so the "which courses may omit example/exercises" rule and
 * "which courses need exam-prep meta" rule can never drift apart.
 */
export const EXAM_PREP_COURSE_SLUGS = [
  "ielts-preparation",
  "pte-academic-preparation",
  "toefl-ibt-preparation",
  "gre-general-test-preparation",
] as const;
export type ExamPrepCourseSlug = (typeof EXAM_PREP_COURSE_SLUGS)[number];

export function isExamPrepCourseSlug(slug: string): slug is ExamPrepCourseSlug {
  return (EXAM_PREP_COURSE_SLUGS as readonly string[]).includes(slug);
}

const rubricCriterionSchema = z.object({
  criterion: z.string().min(1),
  guidance: z.string().min(1),
});

/**
 * A self-review writing task. There is no automated grading anywhere in this
 * platform (see docs/product-expansion/DECISIONS.md's "Exam-preparation
 * scoring limitations") -- `rubric` is a checklist the learner scores
 * themselves against, never a claimed AI or official score.
 */
export const writingTaskSchema = z.object({
  id: z.string().min(1),
  taskName: z.string().min(1),
  instructions: z.string().min(1),
  prompt: z.string().min(1),
  timeLimitMinutes: z.number().int().min(1),
  minWords: z.number().int().min(1).optional(),
  maxWords: z.number().int().min(1).optional(),
  rubric: z.array(rubricCriterionSchema).min(3),
});
export type WritingTask = z.infer<typeof writingTaskSchema>;
export type WritingTaskInput = z.input<typeof writingTaskSchema>;

/** A self-review speaking task -- recorded locally via MediaRecorder where the browser supports it, or a structured talking-points outline otherwise. Never claims automated speech scoring. */
export const speakingTaskSchema = z.object({
  id: z.string().min(1),
  taskName: z.string().min(1),
  instructions: z.string().min(1),
  prompt: z.string().min(1),
  prepSeconds: z.number().int().min(0),
  speakSeconds: z.number().int().min(1),
  rubric: z.array(rubricCriterionSchema).min(3),
});
export type SpeakingTask = z.infer<typeof speakingTaskSchema>;
export type SpeakingTaskInput = z.input<typeof speakingTaskSchema>;

export const examPrepMetaSchema = z.object({
  courseSlug: z.enum(EXAM_PREP_COURSE_SLUGS),
  /** The exam's own full official name, e.g. "International English Language Testing System". Used only descriptively, never as a claim of affiliation. */
  officialFullName: z.string().min(1),
  officialAbbreviation: z.string().min(1),
  /** The real organization(s) that administer/own the exam and its trademark -- named accurately so the independence notice can name them specifically instead of vaguely. */
  administeringBodies: z.array(z.string().min(1)).min(1),
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  officialSources: z.array(referenceSchema).min(1),
  writingTasks: z.array(writingTaskSchema).min(2),
  /**
   * Empty for exams with no speaking component at all (e.g. the GRE General
   * Test -- Verbal/Quantitative/Analytical Writing only). Never fabricate a
   * speaking task for an exam that doesn't have one; the UI hides the
   * Speaking tab entirely when this is empty (see ExamPracticeHub).
   */
  speakingTasks: z.array(speakingTaskSchema).default([]),
});
export type ExamPrepMeta = z.infer<typeof examPrepMetaSchema>;
export type ExamPrepMetaInput = z.input<typeof examPrepMetaSchema>;
