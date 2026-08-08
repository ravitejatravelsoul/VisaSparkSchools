import { allCourses } from "@/lib/content/registry";
import { EXAM_PREP_COURSE_SLUGS, isExamPrepCourseSlug } from "@/lib/exam-prep/types";

/**
 * Single source of truth for which of the 33 catalog courses (verified
 * programmatically from `allCourses`, not hand-counted) get an
 * "Interview Questions" bank, a "Preparation Questions" bank, or neither.
 * `scripts/validate-content.ts` imports this to hard-fail the build if any
 * applicable course is missing its required minimum -- see
 * `scripts/interview-prep-inventory.ts` for the human-readable report.
 */
export type CourseExperienceClassification = "technical" | "exam-prep" | "exempt";

/**
 * Every non-exam-prep course not in this list is "technical" by default --
 * this keeps the default inclusive (a newly-added course automatically
 * requires a bank unless deliberately exempted here) rather than requiring
 * every future course to be manually opted in.
 *
 * Exemptions, with reasons:
 * - Placement/aptitude courses are not technology/programming courses and
 *   not English-proficiency/admissions exam-prep courses either; they
 *   already have their own dedicated practice-question quiz system
 *   (`lib/practice`) covering this exact subject matter, and
 *   "career-and-gd-preparation" specifically already teaches interview
 *   technique as its own curriculum (see its "Interview preparation"
 *   module) -- a bolt-on "Interview Questions" bank would be redundant
 *   with, not additive to, the course's actual content.
 */
const EXEMPT_COURSE_SLUGS: Record<string, string> = {
  "quantitative-aptitude":
    "Placement-prep aptitude course (mental math/data interpretation), not a technology/programming course and not an English-proficiency/admissions exam -- already served by its own dedicated practice-question system covering this exact subject matter.",
  "logical-analytical-reasoning":
    "Placement-prep aptitude course (puzzles/logical structures), not a technology/programming course and not an English-proficiency/admissions exam -- already served by its own dedicated practice-question system covering this exact subject matter.",
  "career-and-gd-preparation":
    'Course is itself about interview technique and professional communication (its own curriculum includes a dedicated "Interview preparation" module) -- a bolt-on generic "Interview Questions" bank would be redundant with, not additive to, the course\'s actual subject matter.',
};

export interface CourseClassification {
  slug: string;
  title: string;
  classification: CourseExperienceClassification;
  /** Only set when classification === "exempt". */
  exemptionReason?: string;
}

/** Classifies every course in the live catalog -- computed fresh from `allCourses`, never hand-maintained as a separate list. */
export function classifyAllCourses(): CourseClassification[] {
  return allCourses.map((course) => {
    if (isExamPrepCourseSlug(course.slug)) {
      return { slug: course.slug, title: course.title, classification: "exam-prep" as const };
    }
    const exemptionReason = EXEMPT_COURSE_SLUGS[course.slug];
    if (exemptionReason) {
      return {
        slug: course.slug,
        title: course.title,
        classification: "exempt" as const,
        exemptionReason,
      };
    }
    return { slug: course.slug, title: course.title, classification: "technical" as const };
  });
}

export function getApplicableCourseSlugs(): string[] {
  return classifyAllCourses()
    .filter((c) => c.classification !== "exempt")
    .map((c) => c.slug);
}

export { EXAM_PREP_COURSE_SLUGS };
