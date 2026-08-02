import { describe, it, expect } from "vitest";
import Fuse from "fuse.js";
import { getPublicTechnologies } from "@/lib/directory/registry";
import type { SearchDocument } from "@/lib/search/types";

/**
 * Mirrors the exact Fuse.js configuration in components/search/search-client.tsx
 * so this test proves the real search experience resolves common
 * abbreviations to the right technology -- not just that the keyword
 * string happens to exist somewhere in the data.
 */
function toSearchDocs(): SearchDocument[] {
  return getPublicTechnologies().map((t) => ({
    id: t.id,
    type: "technology",
    title: t.name,
    description: t.description,
    url: `/technologies/${t.slug}`,
    trackTitle: "",
    difficulty: t.difficulty,
    keywords: t.searchKeywords,
  }));
}

function search(query: string) {
  const fuse = new Fuse(toSearchDocs(), {
    keys: [
      { name: "title", weight: 2 },
      { name: "keywords", weight: 1.5 },
      { name: "description", weight: 1 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
  });
  return fuse.search(query).map((r) => r.item);
}

describe("technology search aliases", () => {
  const cases: Array<[query: string, expectedTitle: string]> = [
    ["JS", "JavaScript"],
    ["TS", "TypeScript"],
    ["DSA", "Data Structures and Algorithms"],
    ["AI", "Artificial Intelligence"],
    ["ML", "Machine Learning"],
    ["LLM", "Large Language Models"],
    ["RAG", "Retrieval-Augmented Generation"],
    ["CI/CD", "CI/CD"],
    ["QA", "Software Testing Fundamentals"],
  ];

  it.each(cases)("searching %s finds %s among the top results", (query, expectedTitle) => {
    const results = search(query);
    const titles = results.slice(0, 5).map((r) => r.title);
    expect(
      titles,
      `searching "${query}" did not surface "${expectedTitle}" in the top 5`,
    ).toContain(expectedTitle);
  });

  it("is case-insensitive", () => {
    const lower = search("javascript").map((r) => r.id);
    const upper = search("JAVASCRIPT").map((r) => r.id);
    expect(lower).toEqual(upper);
  });

  it("resolves an ambiguous short query without throwing and returns a bounded result set", () => {
    // "go" is genuinely ambiguous (the Go language vs. general prose) --
    // the important behavior is that it doesn't crash and returns
    // something reasonable, not that it's the *only* correct top result.
    const results = search("go");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.title === "Go")).toBe(true);
  });
});
