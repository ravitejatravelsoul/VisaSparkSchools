import { describe, it, expect } from "vitest";
import {
  allCategories,
  allTechnologies,
  allLearningPaths,
  getTechnologyBySlug,
  getTechnologyById,
  getCategoryById,
  getTechnologiesByCategory,
  getPublicCategories,
  getPublicTechnologies,
  getPublicLearningPaths,
} from "@/lib/directory/registry";
import { validateDirectory } from "@/lib/directory/validate";
import { getTechnologyAvailability } from "@/lib/directory/availability";
import { getCourseBySlug, getProjectBySlug } from "@/lib/content/registry";

describe("directory registry: uniqueness and referential integrity", () => {
  it("passes full validation with zero issues", () => {
    // This is the same check `content:validate` runs -- asserting it here
    // means `npm run test` alone catches a broken reference, not only the
    // separate content-validation script.
    expect(validateDirectory()).toEqual([]);
  });

  it("has no duplicate category ids or slugs", () => {
    expect(new Set(allCategories.map((c) => c.id)).size).toBe(allCategories.length);
    expect(new Set(allCategories.map((c) => c.slug)).size).toBe(allCategories.length);
  });

  it("has no duplicate technology ids or slugs", () => {
    expect(new Set(allTechnologies.map((t) => t.id)).size).toBe(allTechnologies.length);
    expect(new Set(allTechnologies.map((t) => t.slug)).size).toBe(allTechnologies.length);
  });

  it("has no duplicate learning path ids or slugs", () => {
    expect(new Set(allLearningPaths.map((p) => p.id)).size).toBe(allLearningPaths.length);
    expect(new Set(allLearningPaths.map((p) => p.slug)).size).toBe(allLearningPaths.length);
  });

  it("registers all 16 canonical taxonomy categories", () => {
    const expectedIds = [
      "foundations",
      "frontend",
      "backend",
      "programming-languages",
      "mobile",
      "databases",
      "data-science",
      "artificial-intelligence",
      "cloud-devops",
      "cybersecurity",
      "testing-qa",
      "dsa",
      "developer-tools",
      "quantitative-aptitude",
      "reasoning",
      "career-gd",
    ];
    expect(allCategories.map((c) => c.id).sort()).toEqual(expectedIds.sort());
  });

  it("Aptitude, Reasoning, and Career/GD categories are public (Phase 6: real courses now exist)", () => {
    for (const id of ["quantitative-aptitude", "reasoning", "career-gd"] as const) {
      const category = getCategoryById(id);
      expect(category?.publicVisibility).toBe(true);
    }
  });

  it("normalizes Data Structures and Algorithms into exactly one canonical technology record", () => {
    const dsaMatches = allTechnologies.filter(
      (t) => t.id === "dsa-field" || /data structures and algorithms/i.test(t.name),
    );
    expect(dsaMatches).toHaveLength(1);
    expect(dsaMatches[0].category).toBe("dsa");
  });

  it("marks every legacy-status technology with a non-empty legacyNote", () => {
    const legacyTechs = allTechnologies.filter((t) => t.status === "legacy");
    expect(legacyTechs.length).toBeGreaterThan(0); // sanity: at least AngularJS/jQuery exist
    for (const t of legacyTechs) {
      expect(t.legacyNote, `${t.id} is legacy but has no legacyNote`).toBeTruthy();
      expect(t.legacyNote!.length).toBeGreaterThan(20);
    }
  });

  it("marks AngularJS specifically as legacy with an explanation distinguishing it from modern Angular", () => {
    const angularjs = getTechnologyBySlug("angularjs");
    expect(angularjs?.status).toBe("legacy");
    expect(angularjs?.legacyNote?.toLowerCase()).toContain("angular");
  });

  it("every prerequisiteId and relatedId resolves to a real technology (no dangling references)", () => {
    const ids = new Set(allTechnologies.map((t) => t.id));
    for (const t of allTechnologies) {
      for (const pre of t.prerequisiteIds) {
        expect(ids.has(pre), `${t.id} has unknown prerequisite "${pre}"`).toBe(true);
      }
      for (const rel of t.relatedIds) {
        expect(ids.has(rel), `${t.id} has unknown related technology "${rel}"`).toBe(true);
      }
    }
  });

  it("has no technology that lists itself as a prerequisite or related technology", () => {
    for (const t of allTechnologies) {
      expect(t.prerequisiteIds).not.toContain(t.id);
      expect(t.relatedIds).not.toContain(t.id);
    }
  });

  it("requires every technology's courseId (when set) to resolve to a real course", () => {
    for (const t of allTechnologies) {
      if (t.courseId) {
        expect(
          getCourseBySlug(t.courseId),
          `${t.id} has unresolvable courseId "${t.courseId}"`,
        ).toBeDefined();
      }
    }
  });

  it("requires every technology's projectIds to resolve to real projects", () => {
    for (const t of allTechnologies) {
      for (const projId of t.projectIds) {
        expect(
          getProjectBySlug(projId),
          `${t.id} has unresolvable projectId "${projId}"`,
        ).toBeDefined();
      }
    }
  });

  it("getTechnologiesByCategory only returns technologies actually in that category", () => {
    const frontend = getTechnologiesByCategory("frontend");
    expect(frontend.length).toBeGreaterThan(0);
    for (const t of frontend) expect(t.category).toBe("frontend");
  });

  it("getPublicCategories/getPublicTechnologies/getPublicLearningPaths never include drafts", () => {
    expect(getPublicCategories().every((c) => c.publicVisibility)).toBe(true);
    expect(getPublicTechnologies().every((t) => t.publicVisibility)).toBe(true);
    expect(getPublicLearningPaths().every((p) => p.publicVisibility)).toBe(true);
  });

  it("getTechnologyById returns undefined for an unknown id rather than throwing", () => {
    expect(getTechnologyById("does-not-exist")).toBeUndefined();
  });
});

describe("technology availability (the single source of truth for course/runner claims)", () => {
  it("a technology with a real courseId reports course-available and hasCourse", () => {
    const react = getTechnologyBySlug("javascript")!;
    const availability = getTechnologyAvailability(react);
    expect(availability.hasCourse).toBe(true);
    expect(availability.status).toBe("course-available");
    expect(availability.courseSlug).toBe("javascript-fundamentals");
  });

  it("a guide-only technology (no courseId, no runnerSupport) never claims course or runner availability", () => {
    const kotlin = getTechnologyBySlug("kotlin")!;
    expect(kotlin.courseId).toBeUndefined();
    expect(kotlin.runnerSupport).toBeUndefined();
    const availability = getTechnologyAvailability(kotlin);
    expect(availability.hasCourse).toBe(false);
    expect(availability.hasRunner).toBe(false);
    expect(availability.status).toBe("guide-only");
  });

  it("a technology with runnerSupport but no courseId reports runner-available, not course-available", () => {
    // No *current* registry entry happens to have a runner without also having
    // a course (verified by the "runner-only" count test below) -- so this
    // exercises the priority logic itself via a synthetic fixture rather than
    // depending on that coincidence of today's data remaining true tomorrow.
    const kotlin = getTechnologyBySlug("kotlin")!;
    const synthetic = { ...kotlin, courseId: undefined, runnerSupport: "html" as const };
    const availability = getTechnologyAvailability(synthetic);
    expect(availability.hasCourse).toBe(false);
    expect(availability.hasRunner).toBe(true);
    expect(availability.status).toBe("runner-available");
  });

  it("no technology currently claims runner support without also being backed by a real course", () => {
    // Documents current reality precisely (see PROJECT_STATUS.md's Phase 3
    // correction: the original "Developer Tools" runner mapping was removed
    // as inaccurate -- the generic HTML/CSS/JS playground isn't a distinct
    // Developer Tools learning activity). Not a hard product requirement,
    // just an accurate snapshot this test keeps honest.
    const runnerOnly = allTechnologies.filter(
      (t) => t.runnerSupport !== undefined && t.courseId === undefined,
    );
    expect(runnerOnly).toEqual([]);
  });

  it("course-available takes priority over runner-available when both exist", () => {
    const python = getTechnologyBySlug("python")!;
    expect(python.courseId).toBeDefined();
    expect(python.runnerSupport).toBeDefined();
    const availability = getTechnologyAvailability(python);
    expect(availability.status).toBe("course-available");
    expect(availability.hasRunner).toBe(true); // still true, just not the headline status
  });

  it("every technology in the registry is publicVisibility -- internal-draft is reserved for future content", () => {
    // Sanity guard: if this ever changes, the "internal-draft" branch of
    // getTechnologyAvailability needs a real test fixture, not just this
    // structural check.
    expect(allTechnologies.every((t) => t.publicVisibility)).toBe(true);
  });
});
