import { examPrepMetaSchema, type ExamPrepMeta } from "@/lib/exam-prep/types";
import { ieltsExamPrepMeta } from "@/content/exam-prep/ielts";
import { greExamPrepMeta } from "@/content/exam-prep/gre";
import { pteExamPrepMeta } from "@/content/exam-prep/pte";
import { toeflExamPrepMeta } from "@/content/exam-prep/toefl";

const rawMeta = [ieltsExamPrepMeta, greExamPrepMeta, pteExamPrepMeta, toeflExamPrepMeta];

/** Parsed at module load so a malformed exam-prep meta record fails the build, not a page render. */
export const examPrepMetas: ExamPrepMeta[] = rawMeta.map((raw) => examPrepMetaSchema.parse(raw));

export function getExamPrepMeta(courseSlug: string): ExamPrepMeta | undefined {
  return examPrepMetas.find((m) => m.courseSlug === courseSlug);
}
