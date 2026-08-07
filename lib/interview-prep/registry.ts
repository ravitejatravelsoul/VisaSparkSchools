import {
  interviewQuestionSchema,
  type InterviewQuestion,
  type InterviewQuestionInput,
} from "@/lib/interview-prep/types";

/**
 * Per-course question banks, added incrementally as content lands (see
 * content/interview-prep/*.ts). Parsed at module load so a malformed bank
 * fails the build, not a page render -- same eager-parse pattern as
 * lib/study-abroad/registry.ts and lib/exam-prep/registry.ts.
 */
const rawBanks: InterviewQuestionInput[][] = [];

export const allInterviewQuestions: InterviewQuestion[] = rawBanks
  .flat()
  .map((q) => interviewQuestionSchema.parse(q));

export function getInterviewQuestionsForCourse(courseSlug: string): InterviewQuestion[] {
  return allInterviewQuestions.filter((q) => q.courseSlug === courseSlug);
}

/** Every course slug that has at least one registered question -- drives which courses show an "Interview Prep" link. */
export function getCoursesWithInterviewPrep(): string[] {
  return Array.from(new Set(allInterviewQuestions.map((q) => q.courseSlug)));
}
