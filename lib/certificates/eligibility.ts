import { getCourseBySlug, getProjectBySlug } from "@/lib/content/registry";
import { isCourseComplete, isProjectComplete } from "@/lib/learning/completion";
import type { ProgressState } from "@/lib/learning/types";

/** Minimum best-score ratio on a course's practice session required for Skill Achievement. */
export const SKILL_PRACTICE_THRESHOLD = 0.7;

/**
 * Which courses are eligible for a Skill Achievement certificate, and which
 * single capstone/guided project stands in for "a required project" for
 * that course. Small and hand-curated on purpose -- NOT derived from
 * `trackSlugs` alone, because several tracks are shared by 2-3 projects
 * (placement-prep, git-api-sql, software-testing, ai-llm-rag), so a loose
 * track-based match would ambiguously wire a course to the wrong project.
 * Every entry below is a genuine, unambiguous 1:1 course<->project
 * correspondence, checked directly against content/courses.ts and
 * content/projects.ts (see tests/unit/certificate-eligibility.test.ts,
 * which verifies each entry programmatically).
 *
 * Deliberately excluded, with reasons -- this is the "do not enable this
 * type for courses lacking sufficient measurable requirements" and "do not
 * turn all existing eligibility flags on globally" part of the brief:
 * - how-computing-works: no project maps to the "foundations" track at all.
 * - ai-foundations: two capstones share the "ai-llm-rag" track
 *   (document-qa-rag-capstone, ai-support-agent-capstone) with no single
 *   unambiguous "the" capstone, and both genuinely depend on generation
 *   quality this platform cannot itself verify.
 * - git-apis-sql: three projects reference the "git-api-sql" track
 *   (git-collaboration-workflow, api-powered-weather-app,
 *   document-qa-rag-capstone) -- ambiguous.
 * - software-testing-foundations / api-testing-and-automation: both share
 *   the "software-testing" track with two projects
 *   (learning-app-test-strategy, sample-api-validation-suite) -- ambiguous
 *   which course each belongs to.
 */
export const SKILL_ACHIEVEMENT_COURSES: Record<string, { projectId: string }> = {
  "html-css-fundamentals": { projectId: "personal-portfolio-page" },
  "javascript-fundamentals": { projectId: "interactive-quiz-app" },
  "python-fundamentals": { projectId: "expense-tracker-cli" },
  "typescript-foundations": { projectId: "typed-study-tracker" },
  "react-application-development": { projectId: "accessible-learning-dashboard" },
  "nodejs-express-backend-development": { projectId: "validated-learning-progress-api" },
  "java-programming-foundations": { projectId: "course-enrollment-progress-manager" },
  "data-structures-and-algorithms": { projectId: "learning-path-recommendation-engine" },
  "database-design-and-postgresql": { projectId: "learning-platform-database" },
  "playwright-web-automation": { projectId: "cross-browser-learning-platform-test-suite" },
  "selenium-webdriver-automation": { projectId: "maintainable-learning-portal-selenium-suite" },
  "linux-shell-fundamentals": { projectId: "safe-project-validation-cli" },
  "test-automation-framework-engineering": {
    projectId: "production-grade-learning-platform-automation-framework",
  },
  "quantitative-aptitude": { projectId: "quantitative-aptitude-practice-portfolio" },
  "logical-analytical-reasoning": { projectId: "reasoning-practice-portfolio" },
  "career-and-gd-preparation": { projectId: "career-readiness-capstone" },
};

export interface EligibilityResult {
  eligible: boolean;
  /** Criteria already met, human-readable. */
  met: string[];
  /** Criteria not yet met, human-readable. */
  unmet: string[];
}

/** Course Completion: every course qualifies -- the only requirement is genuinely finishing every required lesson. */
export function getCourseCompletionEligibility(
  courseSlug: string,
  state: ProgressState,
): EligibilityResult {
  const course = getCourseBySlug(courseSlug);
  if (!course) {
    return { eligible: false, met: [], unmet: ["This course no longer exists."] };
  }
  const complete = isCourseComplete(courseSlug, state);
  return {
    eligible: complete,
    met: complete ? ["All required lessons in this course are completed."] : [],
    unmet: complete ? [] : ["Complete every required lesson in this course."],
  };
}

/**
 * Skill Achievement: only defined for courses in SKILL_ACHIEVEMENT_COURSES,
 * and only eligible once all three objective signals are true -- every
 * required lesson completed, a practice-session best score at or above
 * SKILL_PRACTICE_THRESHOLD, and the mapped project's milestones all
 * completed.
 */
export function getSkillAchievementEligibility(
  courseSlug: string,
  state: ProgressState,
): EligibilityResult {
  const mapping = SKILL_ACHIEVEMENT_COURSES[courseSlug];
  if (!mapping) {
    return {
      eligible: false,
      met: [],
      unmet: ["This course doesn't have a defined skill-achievement path."],
    };
  }
  const course = getCourseBySlug(courseSlug);
  const project = getProjectBySlug(mapping.projectId);
  if (!course || !project) {
    return {
      eligible: false,
      met: [],
      unmet: ["This certificate's requirements reference content that no longer exists."],
    };
  }

  const met: string[] = [];
  const unmet: string[] = [];

  const lessonsComplete = isCourseComplete(courseSlug, state);
  (lessonsComplete ? met : unmet).push("All required lessons in this course are completed.");

  const practice = state.practiceAttempts[courseSlug];
  const practiceRatio = practice ? practice.bestScore / practice.bestTotal : 0;
  const practicePassed = practice !== undefined && practiceRatio >= SKILL_PRACTICE_THRESHOLD;
  const thresholdPercent = Math.round(SKILL_PRACTICE_THRESHOLD * 100);
  (practicePassed ? met : unmet).push(
    `A practice session best score of at least ${thresholdPercent}%.`,
  );

  const projectComplete = isProjectComplete(mapping.projectId, state);
  (projectComplete ? met : unmet).push(
    `The "${project.title}" project's milestones are all completed.`,
  );

  return { eligible: lessonsComplete && practicePassed && projectComplete, met, unmet };
}

/** Deterministic id: the same (type, course) pair can only ever produce this one id. */
export function buildCertificateId(
  type: "course-completion" | "skill-achievement",
  targetId: string,
): string {
  return `${type}:${targetId}`;
}

/** Fixed marker for the eligibility ruleset in effect at issuance -- bump only if the rules themselves change in a way that should be distinguishable on old certificates. */
export const ELIGIBILITY_RULESET_VERSION = "v1";
