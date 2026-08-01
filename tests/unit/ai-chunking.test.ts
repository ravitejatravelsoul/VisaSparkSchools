import { describe, it, expect } from "vitest";
import { chunkAllLessons } from "@/lib/ai/chunking";
import { keywordSearch, dedupeByLesson } from "@/lib/ai/retrieval";
import { allLessons, getLessonById, getLessonBySlug } from "@/lib/content/registry";

describe("chunkAllLessons (tutor retrieval source of truth)", () => {
  const chunks = chunkAllLessons();

  it("produces at least one chunk per lesson", () => {
    expect(chunks.length).toBeGreaterThanOrEqual(allLessons.length);
  });

  it("every chunk's lessonId corresponds to a real, existing lesson (no fabricated sources)", () => {
    for (const chunk of chunks) {
      const lesson = getLessonById(chunk.lessonId);
      expect(
        lesson,
        `chunk ${chunk.id} references unknown lessonId ${chunk.lessonId}`,
      ).toBeDefined();
    }
  });

  it("every chunk's lessonSlug and lessonTitle match the real lesson's actual slug/title", () => {
    for (const chunk of chunks) {
      const lesson = getLessonById(chunk.lessonId)!;
      expect(chunk.lessonSlug).toBe(lesson.slug);
      expect(chunk.lessonTitle).toBe(lesson.title);
    }
  });

  it("every chunk has non-empty text (no blank/placeholder chunks reach retrieval)", () => {
    for (const chunk of chunks) {
      expect(chunk.text.trim().length).toBeGreaterThan(0);
    }
  });

  it("chunk ids are unique (stable, non-duplicated retrieval sources)", () => {
    const ids = chunks.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("citations built from retrieval always resolve to real lessons", () => {
  it("a keyword-search result's lessonSlug resolves via getLessonBySlug, matching how citations are built", () => {
    const chunks = chunkAllLessons();
    const results = dedupeByLesson(keywordSearch("variable", chunks, 5));
    expect(results.length).toBeGreaterThan(0);
    for (const chunk of results) {
      const lesson = getLessonBySlug(chunk.lessonSlug);
      expect(
        lesson,
        `citation would reference unknown lesson slug ${chunk.lessonSlug}`,
      ).toBeDefined();
      expect(lesson!.title).toBe(chunk.lessonTitle);
    }
  });
});
