import type { LearnerLevel } from "@/lib/learning/types";

/**
 * Self-described experience level. This is PERSONALIZATION ONLY:
 * - It never gates access to a course, lesson, project, practice session,
 *   assessment, or certificate. Every eligibility check in
 *   lib/certificates/eligibility.ts and lib/learning/completion.ts reads
 *   only real completion data, never this field.
 * - It may only ever be read to influence a *recommendation* (e.g. a future
 *   "courses that might suit you" ordering), never an authorization
 *   decision. Do not add a check anywhere that compares `learnerLevel`
 *   before allowing an action.
 */
export const LEARNER_LEVEL_OPTIONS: { value: LearnerLevel; label: string }[] = [
  { value: "new", label: "I'm completely new to coding" },
  { value: "basics", label: "I'm learning the basics" },
  { value: "small-projects", label: "I already build small projects" },
  { value: "experienced", label: "I'm an experienced coder" },
];

export function isLearnerLevel(value: string): value is LearnerLevel {
  return LEARNER_LEVEL_OPTIONS.some((o) => o.value === value);
}
