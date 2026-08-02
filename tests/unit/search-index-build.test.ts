import { describe, it, expect } from "vitest";
import { buildIndex } from "../../scripts/build-search-index";

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

  it("includes lessons, courses, projects, technologies, categories, and roadmaps", () => {
    const index = buildIndex();
    const types = new Set(index.map((d) => d.type));
    expect(types).toEqual(
      new Set(["lesson", "course", "project", "technology", "category", "learning-path"]),
    );
  });

  it("never includes internal-draft categories, technologies, or learning paths", () => {
    const index = buildIndex();
    const draftIds = ["quantitative-aptitude", "reasoning", "career-gd", "placement-job-readiness"];
    for (const doc of index) {
      expect(draftIds).not.toContain(doc.id);
    }
    // Belt-and-suspenders: no document title/description should mention the
    // draft-only subject areas at all, since nothing public covers them yet.
    const leaked = index.filter((d) =>
      /quantitative aptitude|group discussion|placement and job readiness/i.test(
        `${d.title} ${d.description}`,
      ),
    );
    expect(leaked).toEqual([]);
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
