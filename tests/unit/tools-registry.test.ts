import { describe, it, expect } from "vitest";
import { tools, getToolBySlug, getToolsByCategory } from "@/lib/tools/registry";
import { getCourseBySlug } from "@/lib/content/registry";

describe("tools registry", () => {
  it("has at least six genuinely distinct tools", () => {
    expect(tools.length).toBeGreaterThanOrEqual(6);
  });

  it("every tool has a unique id and slug", () => {
    expect(new Set(tools.map((t) => t.id)).size).toBe(tools.length);
    expect(new Set(tools.map((t) => t.slug)).size).toBe(tools.length);
  });

  it("every tool has non-empty title, descriptions, and keywords", () => {
    for (const tool of tools) {
      expect(tool.title.length).toBeGreaterThan(0);
      expect(tool.shortDescription.length).toBeGreaterThan(0);
      expect(tool.description.length).toBeGreaterThan(0);
      expect(tool.keywords.length).toBeGreaterThan(0);
    }
  });

  it("every relatedCourseSlug resolves to a real course", () => {
    for (const tool of tools) {
      for (const slug of tool.relatedCourseSlugs) {
        expect(
          getCourseBySlug(slug),
          `${tool.id} references unknown course "${slug}"`,
        ).toBeDefined();
      }
    }
  });

  it("getToolBySlug finds an existing tool and returns undefined for an unknown one", () => {
    expect(getToolBySlug("json-formatter")?.id).toBe("json-formatter");
    expect(getToolBySlug("not-a-real-tool")).toBeUndefined();
  });

  it("getToolsByCategory only returns tools in that category", () => {
    const dataTools = getToolsByCategory("data");
    expect(dataTools.length).toBeGreaterThan(0);
    for (const tool of dataTools) expect(tool.category).toBe("data");
  });
});
