import {
  interviewQuestionSchema,
  type InterviewQuestion,
  type InterviewQuestionInput,
} from "@/lib/interview-prep/types";
import { ieltsInterviewQuestions } from "@/content/interview-prep/ielts";
import { greInterviewQuestions } from "@/content/interview-prep/gre";
import { pteInterviewQuestions } from "@/content/interview-prep/pte";
import { toeflInterviewQuestions } from "@/content/interview-prep/toefl";
import { javascriptInterviewQuestions } from "@/content/interview-prep/javascript";
import { pythonInterviewQuestions } from "@/content/interview-prep/python";
import { reactInterviewQuestions } from "@/content/interview-prep/react";
import { postgresqlInterviewQuestions } from "@/content/interview-prep/postgresql";
import { playwrightInterviewQuestions } from "@/content/interview-prep/playwright";
import { howComputingWorksInterviewQuestions } from "@/content/interview-prep/how-computing-works";
import { htmlCssInterviewQuestions } from "@/content/interview-prep/html-css";
import { typescriptInterviewQuestions } from "@/content/interview-prep/typescript";
import { gitApisSqlInterviewQuestions } from "@/content/interview-prep/git-apis-sql";
import { aiFoundationsInterviewQuestions } from "@/content/interview-prep/ai-foundations";
import { softwareTestingInterviewQuestions } from "@/content/interview-prep/software-testing";
import { apiTestingInterviewQuestions } from "@/content/interview-prep/api-testing";
import { nodejsExpressInterviewQuestions } from "@/content/interview-prep/nodejs-express";
import { javaInterviewQuestions } from "@/content/interview-prep/java";
import { dsaInterviewQuestions } from "@/content/interview-prep/dsa";
import { seleniumInterviewQuestions } from "@/content/interview-prep/selenium";
import { linuxShellInterviewQuestions } from "@/content/interview-prep/linux-shell";
import { testAutomationFrameworkInterviewQuestions } from "@/content/interview-prep/test-automation-framework";
import { goInterviewQuestions } from "@/content/interview-prep/go";
import { cInterviewQuestions } from "@/content/interview-prep/c";
import { cppInterviewQuestions } from "@/content/interview-prep/cpp";

/**
 * Per-course question banks, added incrementally as content lands (see
 * content/interview-prep/*.ts). Parsed at module load so a malformed bank
 * fails the build, not a page render -- same eager-parse pattern as
 * lib/study-abroad/registry.ts and lib/exam-prep/registry.ts.
 */
const rawBanks: InterviewQuestionInput[][] = [
  ieltsInterviewQuestions,
  greInterviewQuestions,
  pteInterviewQuestions,
  toeflInterviewQuestions,
  javascriptInterviewQuestions,
  pythonInterviewQuestions,
  reactInterviewQuestions,
  postgresqlInterviewQuestions,
  playwrightInterviewQuestions,
  howComputingWorksInterviewQuestions,
  htmlCssInterviewQuestions,
  typescriptInterviewQuestions,
  gitApisSqlInterviewQuestions,
  aiFoundationsInterviewQuestions,
  softwareTestingInterviewQuestions,
  apiTestingInterviewQuestions,
  nodejsExpressInterviewQuestions,
  javaInterviewQuestions,
  dsaInterviewQuestions,
  seleniumInterviewQuestions,
  linuxShellInterviewQuestions,
  testAutomationFrameworkInterviewQuestions,
  goInterviewQuestions,
  cInterviewQuestions,
  cppInterviewQuestions,
];

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
