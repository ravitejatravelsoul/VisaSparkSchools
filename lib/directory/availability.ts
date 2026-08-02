import { getCourseBySlug, getProjectBySlug } from "@/lib/content/registry";
import type { Technology, RunnerRef } from "@/lib/directory/types";

/**
 * The single source of truth for what a technology guide is allowed to show
 * as an action. Every field here is *derived* from the technology's raw
 * references (courseId / runnerSupport / projectIds) resolved against the
 * real content registry -- nothing here is an independently-authored
 * boolean, so a guide page can never claim a course/runner/project exists
 * when it doesn't (the schema-level reference would simply fail to resolve
 * and `content:validate` would fail first).
 */
export type TechAvailabilityStatus =
  "course-available" | "runner-available" | "guide-only" | "internal-draft";

export interface TechnologyAvailability {
  hasCourse: boolean;
  courseSlug?: string;
  courseTitle?: string;
  hasRunner: boolean;
  runnerLanguage?: RunnerRef;
  hasProjects: boolean;
  projectSlugs: string[];
  status: TechAvailabilityStatus;
}

export function getTechnologyAvailability(tech: Technology): TechnologyAvailability {
  if (!tech.publicVisibility) {
    return {
      hasCourse: false,
      hasRunner: false,
      hasProjects: false,
      projectSlugs: [],
      status: "internal-draft",
    };
  }

  const course = tech.courseId ? getCourseBySlug(tech.courseId) : undefined;
  const resolvedProjects = tech.projectIds
    .map((id) => getProjectBySlug(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const hasRunner = tech.runnerSupport !== undefined;

  const status: TechAvailabilityStatus = course
    ? "course-available"
    : hasRunner
      ? "runner-available"
      : "guide-only";

  return {
    hasCourse: Boolean(course),
    courseSlug: course?.slug,
    courseTitle: course?.title,
    hasRunner,
    runnerLanguage: tech.runnerSupport,
    hasProjects: resolvedProjects.length > 0,
    projectSlugs: resolvedProjects.map((p) => p.slug),
    status,
  };
}

/** UI copy helper so every call site describes availability identically. */
export function describeAvailability(status: TechAvailabilityStatus): string {
  switch (status) {
    case "course-available":
      return "Full course available";
    case "runner-available":
      return "Try it in the playground";
    case "guide-only":
      return "Guide only -- no course yet";
    case "internal-draft":
      return "Not yet public";
  }
}
