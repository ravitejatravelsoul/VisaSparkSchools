import { examPrepMetaSchema, type ExamPrepMeta } from "@/lib/exam-prep/types";
import { ieltsExamPrepMeta } from "@/content/exam-prep/ielts";

const rawMeta = [ieltsExamPrepMeta];

/** Parsed at module load so a malformed exam-prep meta record fails the build, not a page render. */
export const examPrepMetas: ExamPrepMeta[] = rawMeta.map((raw) => examPrepMetaSchema.parse(raw));

export function getExamPrepMeta(courseSlug: string): ExamPrepMeta | undefined {
  return examPrepMetas.find((m) => m.courseSlug === courseSlug);
}
