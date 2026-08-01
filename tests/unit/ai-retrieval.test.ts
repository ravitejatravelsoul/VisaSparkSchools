import { describe, it, expect } from "vitest";
import { keywordSearch, dedupeByLesson } from "@/lib/ai/retrieval";
import type { ContentChunk } from "@/lib/ai/types";

const chunks: ContentChunk[] = [
  {
    id: "lesson-1::a",
    lessonId: "lesson-1",
    lessonSlug: "refunds",
    lessonTitle: "Refund Policy",
    heading: "Overview",
    text: "Refunds are available within 30 days of purchase for unopened items.",
  },
  {
    id: "lesson-1::b",
    lessonId: "lesson-1",
    lessonSlug: "refunds",
    lessonTitle: "Refund Policy",
    heading: "Exceptions",
    text: "Digital downloads are not eligible for a refund once accessed.",
  },
  {
    id: "lesson-2::a",
    lessonId: "lesson-2",
    lessonSlug: "shipping",
    lessonTitle: "Shipping Times",
    heading: "Overview",
    text: "Standard shipping takes three to five business days.",
  },
];

describe("keywordSearch", () => {
  it("ranks a chunk mentioning the query terms above an unrelated chunk", () => {
    const results = keywordSearch("refund policy", chunks, 5);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].lessonId).toBe("lesson-1");
  });

  it("returns an empty array for a query with no meaningful terms", () => {
    const results = keywordSearch("the a an", chunks, 5);
    expect(results).toEqual([]);
  });

  it("returns no results when nothing matches", () => {
    const results = keywordSearch("quantum entanglement", chunks, 5);
    expect(results).toEqual([]);
  });

  it("respects the topK limit", () => {
    const results = keywordSearch("refund shipping days", chunks, 1);
    expect(results.length).toBeLessThanOrEqual(1);
  });
});

describe("dedupeByLesson", () => {
  it("keeps only the highest-scoring chunk per lesson", () => {
    const scored = [
      { ...chunks[0], score: 0.9 },
      { ...chunks[1], score: 0.5 },
      { ...chunks[2], score: 0.7 },
    ];
    const result = dedupeByLesson(scored);
    expect(result).toHaveLength(2);
    const lesson1Result = result.find((r) => r.lessonId === "lesson-1");
    expect(lesson1Result?.id).toBe("lesson-1::a");
  });
});
