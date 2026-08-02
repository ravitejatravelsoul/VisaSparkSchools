import {
  allCategories,
  allTechnologies,
  allLearningPaths,
  getTechnologyById,
} from "@/lib/directory/registry";
import { getCourseBySlug, getProjectBySlug } from "@/lib/content/registry";
import { getTechnologyAvailability } from "@/lib/directory/availability";
import type { Category, Technology, LearningPath } from "@/lib/directory/types";

export interface ValidationIssue {
  record: string;
  field: string;
  message: string;
}

function fail(issues: ValidationIssue[], record: string, field: string, message: string) {
  issues.push({ record, field, message });
}

function validateCategories(issues: ValidationIssue[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const c of allCategories) {
    if (ids.has(c.id)) fail(issues, `category:${c.id}`, "id", "Duplicate category id.");
    ids.add(c.id);
    if (slugs.has(c.slug)) fail(issues, `category:${c.id}`, "slug", "Duplicate category slug.");
    slugs.add(c.slug);
    if (c.order < 0) fail(issues, `category:${c.id}`, "order", "order must be >= 0.");
    for (const rel of c.relatedCategoryIds) {
      if (!allCategories.some((other) => other.id === rel)) {
        fail(
          issues,
          `category:${c.id}`,
          "relatedCategoryIds",
          `Unknown related category "${rel}".`,
        );
      }
    }
  }

  // A public category must have at least one public technology or lead
  // somewhere real -- otherwise it's exactly the "public empty category
  // page" the brief prohibits.
  for (const c of allCategories.filter((cat) => cat.publicVisibility)) {
    const techCount = allTechnologies.filter(
      (t) => t.category === c.id && t.publicVisibility,
    ).length;
    if (techCount === 0) {
      fail(
        issues,
        `category:${c.id}`,
        "publicVisibility",
        "Public category has zero public technologies -- would render an empty page.",
      );
    }
  }
}

function validateTechnologies(issues: ValidationIssue[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const byId = new Map(allTechnologies.map((t) => [t.id, t]));

  for (const t of allTechnologies) {
    if (ids.has(t.id)) fail(issues, `technology:${t.id}`, "id", "Duplicate technology id.");
    ids.add(t.id);
    if (slugs.has(t.slug)) fail(issues, `technology:${t.id}`, "slug", "Duplicate technology slug.");
    slugs.add(t.slug);

    if (!allCategories.some((c) => c.id === t.category)) {
      fail(issues, `technology:${t.id}`, "category", `Unknown category "${t.category}".`);
    }

    for (const preId of t.prerequisiteIds) {
      if (!byId.has(preId)) {
        fail(
          issues,
          `technology:${t.id}`,
          "prerequisiteIds",
          `Unknown prerequisite technology "${preId}".`,
        );
      }
    }
    for (const relId of t.relatedIds) {
      if (!byId.has(relId)) {
        fail(issues, `technology:${t.id}`, "relatedIds", `Unknown related technology "${relId}".`);
      }
    }

    if (t.courseId && !getCourseBySlug(t.courseId)) {
      fail(
        issues,
        `technology:${t.id}`,
        "courseId",
        `courseId "${t.courseId}" does not resolve to a real course.`,
      );
    }
    for (const projId of t.projectIds) {
      if (!getProjectBySlug(projId)) {
        fail(
          issues,
          `technology:${t.id}`,
          "projectIds",
          `projectIds entry "${projId}" does not resolve to a real project.`,
        );
      }
    }

    if (t.status === "legacy" && !t.legacyNote) {
      fail(
        issues,
        `technology:${t.id}`,
        "legacyNote",
        "Legacy technology must explain its legacy status.",
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.lastReviewed)) {
      fail(
        issues,
        `technology:${t.id}`,
        "lastReviewed",
        "lastReviewed must be a valid YYYY-MM-DD date.",
      );
    }
  }

  // Circular prerequisite detection (DFS with a recursion stack).
  const visiting = new Set<string>();
  const done = new Set<string>();
  function visit(t: Technology, chain: string[]): void {
    if (done.has(t.id)) return;
    if (visiting.has(t.id)) {
      fail(
        issues,
        `technology:${t.id}`,
        "prerequisiteIds",
        `Circular prerequisite chain: ${[...chain, t.id].join(" -> ")}.`,
      );
      return;
    }
    visiting.add(t.id);
    for (const preId of t.prerequisiteIds) {
      const pre = byId.get(preId);
      if (pre) visit(pre, [...chain, t.id]);
    }
    visiting.delete(t.id);
    done.add(t.id);
  }
  for (const t of allTechnologies) visit(t, []);
}

function validateLearningPaths(issues: ValidationIssue[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const p of allLearningPaths) {
    if (ids.has(p.id)) fail(issues, `path:${p.id}`, "id", "Duplicate learning path id.");
    ids.add(p.id);
    if (slugs.has(p.slug)) fail(issues, `path:${p.id}`, "slug", "Duplicate learning path slug.");
    slugs.add(p.slug);

    if (p.steps.length === 0) fail(issues, `path:${p.id}`, "steps", "Path has no steps.");

    // No system exists yet for either of these -- a public path claiming
    // either would be a false promise.
    if (p.certificateEligible) {
      fail(
        issues,
        `path:${p.id}`,
        "certificateEligible",
        "No certificate system exists yet (Phase 8) -- must be false.",
      );
    }
    if (p.finalAssessmentRequired) {
      fail(
        issues,
        `path:${p.id}`,
        "finalAssessmentRequired",
        "No assessment system exists yet -- must be false.",
      );
    }

    for (const catId of p.primaryCategoryIds) {
      if (!allCategories.some((c) => c.id === catId)) {
        fail(issues, `path:${p.id}`, "primaryCategoryIds", `Unknown category "${catId}".`);
      }
    }

    if (!p.publicVisibility) continue; // internal drafts aren't held to the "every required step resolves" bar

    for (const step of p.steps) {
      if (!step.required) continue;
      let resolved = false;
      if (step.type === "technology-guide") {
        const tech = getTechnologyById(step.refId);
        resolved = Boolean(tech && tech.publicVisibility);
      } else if (step.type === "course") {
        resolved = Boolean(getCourseBySlug(step.refId));
      } else if (step.type === "project") {
        resolved = Boolean(getProjectBySlug(step.refId));
      } else {
        // "practice" / "assessment" steps have no real system to resolve
        // against yet -- a public path cannot require one.
        resolved = false;
      }
      if (!resolved) {
        fail(
          issues,
          `path:${p.id}`,
          "steps",
          `Public path has a required step ("${step.title}", type ${step.type}) that does not resolve to real, available content.`,
        );
      }
    }

    for (const techId of p.relatedTechnologyIds) {
      if (!getTechnologyById(techId)) {
        fail(issues, `path:${p.id}`, "relatedTechnologyIds", `Unknown technology "${techId}".`);
      }
    }
    for (const courseId of p.relatedCourseIds) {
      if (!getCourseBySlug(courseId)) {
        fail(issues, `path:${p.id}`, "relatedCourseIds", `Unknown course "${courseId}".`);
      }
    }
  }
}

/** Sanity check that `getTechnologyAvailability` never claims a status a public guide can't back up. */
function validateAvailabilityConsistency(issues: ValidationIssue[]) {
  for (const t of allTechnologies.filter((tech) => tech.publicVisibility)) {
    const availability = getTechnologyAvailability(t);
    if (availability.status === "internal-draft") {
      fail(
        issues,
        `technology:${t.id}`,
        "publicVisibility",
        "Public technology resolved to internal-draft availability -- inconsistent state.",
      );
    }
    if (t.courseId && !availability.hasCourse) {
      fail(
        issues,
        `technology:${t.id}`,
        "courseId",
        "courseId set but availability resolution found no course -- inconsistent state.",
      );
    }
  }
}

export function validateDirectory(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  validateCategories(issues);
  validateTechnologies(issues);
  validateLearningPaths(issues);
  validateAvailabilityConsistency(issues);
  return issues;
}

export function assertDirectoryValid(): void {
  const issues = validateDirectory();
  if (issues.length > 0) {
    const message = issues.map((i) => `  - [${i.record}] ${i.field}: ${i.message}`).join("\n");
    throw new Error(`Directory validation failed (${issues.length} issue(s)):\n${message}`);
  }
}

// Re-exported for convenience so callers don't need two imports.
export type { Category, Technology, LearningPath };
