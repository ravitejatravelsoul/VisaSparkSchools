import { describe, it, expect } from "vitest";
import { buildIndex } from "../../scripts/build-search-index";
import { allCategories, allTechnologies, allLearningPaths } from "@/lib/directory/registry";

/**
 * Verifies the search index generation is deterministic and safe to run on
 * every clean checkout/build (both `predev` and `npm run build` call
 * `content:search-index` -- see package.json), not dependent on a stale
 * local copy of public/search-index.json (which is gitignored).
 */
describe("search index generation (npm run content:search-index)", () => {
  it("is deterministic: building twice from the same content produces identical output", () => {
    const first = buildIndex();
    const second = buildIndex();
    expect(JSON.stringify(first)).toEqual(JSON.stringify(second));
  });

  it("includes lessons, courses, projects, technologies, categories, topics, roadmaps, and tools", () => {
    const index = buildIndex();
    const types = new Set(index.map((d) => d.type));
    expect(types).toEqual(
      new Set([
        "lesson",
        "course",
        "project",
        "technology",
        "category",
        "topic",
        "learning-path",
        "tool",
      ]),
    );
  });

  it("never includes internal-draft categories, technologies, or learning paths", () => {
    const index = buildIndex();
    const indexIds = new Set(index.map((d) => d.id));
    // Derived from the live registries rather than a hardcoded list, so this
    // stays correct as content moves from draft to public over time (e.g.
    // Phase 6 made Aptitude/Reasoning/Career-GD public) instead of quietly
    // testing against stale ids.
    const draftCategoryIds = allCategories.filter((c) => !c.publicVisibility).map((c) => c.id);
    const draftTechnologyIds = allTechnologies.filter((t) => !t.publicVisibility).map((t) => t.id);
    const draftPathIds = allLearningPaths.filter((p) => !p.publicVisibility).map((p) => p.id);
    for (const id of [...draftCategoryIds, ...draftTechnologyIds, ...draftPathIds]) {
      expect(indexIds).not.toContain(id);
    }
  });

  it("never includes raw lesson body content -- only title/description/keywords metadata", () => {
    const index = buildIndex();
    for (const doc of index) {
      // A reasonable upper bound for a title+description+keywords summary;
      // full lesson bodies run to several thousand characters.
      const size = JSON.stringify(doc).length;
      expect(
        size,
        `search document for "${doc.title}" is suspiciously large (${size} chars)`,
      ).toBeLessThan(1000);
    }
  });

  it("every document has a real, resolvable-looking url starting with /", () => {
    const index = buildIndex();
    for (const doc of index) {
      expect(doc.url.startsWith("/"), `${doc.id} has a non-relative url "${doc.url}"`).toBe(true);
    }
  });
});
