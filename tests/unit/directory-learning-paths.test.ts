import { describe, it, expect } from "vitest";
import {
  allLearningPaths,
  getPublicLearningPaths,
  getLearningPathBySlug,
} from "@/lib/directory/registry";
import { getCourseBySlug, getProjectBySlug } from "@/lib/content/registry";
import { getTechnologyById } from "@/lib/directory/registry";

describe("learning path registry", () => {
  it("registers all 16 intended paths from the product brief", () => {
    expect(allLearningPaths).toHaveLength(16);
  });

  it("never marks a path certificate-eligible (no certificate system exists yet)", () => {
    for (const p of allLearningPaths) {
      expect(p.certificateEligible, `${p.id} incorrectly claims certificate eligibility`).toBe(
        false,
      );
    }
  });

  it("never requires a final assessment (no assessment system exists yet)", () => {
    for (const p of allLearningPaths) {
      expect(p.finalAssessmentRequired, `${p.id} incorrectly requires a final assessment`).toBe(
        false,
      );
    }
  });

  it("marks every public path as roadmapOnly, not a certifiable course path", () => {
    for (const p of getPublicLearningPaths()) {
      expect(p.roadmapOnly).toBe(true);
    }
  });

  it("keeps Placement and Job Readiness internal (depends on unbuilt Aptitude/Reasoning/GD content)", () => {
    const placement = getLearningPathBySlug("placement-and-job-readiness");
    expect(placement).toBeDefined();
    expect(placement!.publicVisibility).toBe(false);
  });

  it("every public path has every required step resolving to real, available content", () => {
    for (const p of getPublicLearningPaths()) {
      for (const step of p.steps.filter((s) => s.required)) {
        let resolved = false;
        if (step.type === "technology-guide") {
          const tech = getTechnologyById(step.refId);
          resolved = Boolean(tech?.publicVisibility);
        } else if (step.type === "course") {
          resolved = Boolean(getCourseBySlug(step.refId));
        } else if (step.type === "project") {
          resolved = Boolean(getProjectBySlug(step.refId));
        }
        expect(
          resolved,
          `${p.id} step "${step.title}" (${step.type}:${step.refId}) does not resolve`,
        ).toBe(true);
      }
    }
  });

  it("no public path is empty (every path has at least one step)", () => {
    for (const p of getPublicLearningPaths()) {
      expect(p.steps.length).toBeGreaterThan(0);
    }
  });

  it("AI and Generative AI Engineer path's required steps are backed by the real AI, LLMs & RAG course", () => {
    const path = getLearningPathBySlug("ai-and-generative-ai-engineer")!;
    const courseSteps = path.steps.filter((s) => s.type === "course");
    expect(courseSteps.length).toBeGreaterThan(0);
    for (const step of courseSteps) {
      expect(getCourseBySlug(step.refId)).toBeDefined();
    }
  });

  it("Complete Beginner to Web Developer path's steps are in a sensible order (foundations before frameworks)", () => {
    const path = getLearningPathBySlug("complete-beginner-to-web-developer")!;
    const stepRefIds = path.steps.map((s) => s.refId);
    const foundationsIndex = stepRefIds.indexOf("how-computing-works");
    const htmlCssIndex = stepRefIds.indexOf("html-css-fundamentals");
    const jsIndex = stepRefIds.indexOf("javascript-fundamentals");
    expect(foundationsIndex).toBeGreaterThanOrEqual(0);
    expect(htmlCssIndex).toBeGreaterThan(foundationsIndex);
    expect(jsIndex).toBeGreaterThan(htmlCssIndex);
  });
});
