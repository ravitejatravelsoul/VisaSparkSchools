import { z } from "zod";
import { difficultySchema } from "@/lib/content/types";

/**
 * A single interview-prep (or, for exam-prep courses, "preparation
 * question") item. `id` only needs to be unique within its own courseSlug
 * (not globally) -- see lib/interview-prep/registry.ts, which namespaces by
 * course when building the combined index.
 */
export const interviewQuestionSchema = z.object({
  id: z.string().min(1),
  courseSlug: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().min(1),
  difficulty: difficultySchema,
  /** Optional short, safe code snippet illustrating the answer -- plain text, never executed. */
  codeExample: z.string().optional(),
  /** A common misconception or mistake related to this question, distinct from the answer itself. */
  commonMistake: z.string().optional(),
  /** A natural follow-up question an interviewer might ask next. */
  followUp: z.string().optional(),
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
export type InterviewQuestion = z.infer<typeof interviewQuestionSchema>;
export type InterviewQuestionInput = z.input<typeof interviewQuestionSchema>;

/** Minimum number of questions every registered course's bank must contain. */
export const MIN_QUESTIONS_PER_COURSE = 50;
