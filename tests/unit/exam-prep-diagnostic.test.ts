import { describe, it, expect } from "vitest";
import { buildSectionMap, questionsBySection, buildDiagnostic } from "@/lib/exam-prep/diagnostic";
import type { CourseModule } from "@/lib/content/types";
import type { PracticeQuestion } from "@/lib/practice/types";

function modules(): CourseModule[] {
  return [
    { id: "listening", title: "Listening", summary: "", lessonSlugs: ["l1", "l2"] },
    { id: "reading", title: "Reading", summary: "", lessonSlugs: ["r1"] },
  ];
}

function question(id: string, lessonSlug: string): PracticeQuestion {
  return {
    id,
    prompt: `Prompt ${id}`,
    choices: ["A", "B"],
    correctIndex: 0,
    explanation: "because",
    topic: lessonSlug,
    courseSlug: "ielts-preparation",
    lessonSlug,
    lessonId: lessonSlug,
    difficulty: "beginner",
    source: "test",
  };
}

describe("buildSectionMap", () => {
  it("maps every lesson slug to its owning module id", () => {
    const map = buildSectionMap(modules());
    expect(map.get("l1")).toBe("listening");
    expect(map.get("l2")).toBe("listening");
    expect(map.get("r1")).toBe("reading");
    expect(map.get("unknown")).toBeUndefined();
  });
});

describe("questionsBySection", () => {
  it("returns only questions whose lesson belongs to the given module", () => {
    const map = buildSectionMap(modules());
    const questions = [question("q1", "l1"), question("q2", "l2"), question("q3", "r1")];
    expect(questionsBySection(questions, map, "listening")).toHaveLength(2);
    expect(questionsBySection(questions, map, "reading")).toHaveLength(1);
  });
});

describe("buildDiagnostic", () => {
  it("takes up to 2 questions per module, preserving module order", () => {
    const mods = modules();
    const questions = [
      question("q1", "l1"),
      question("q2", "l1"),
      question("q3", "l2"),
      question("q4", "r1"),
    ];
    const diagnostic = buildDiagnostic(questions, mods);
    // 2 from listening (l1 has 2, capped at 2), 1 from reading (only 1 exists)
    expect(diagnostic.map((q) => q.id)).toEqual(["q1", "q2", "q4"]);
  });

  it("returns an empty array when there are no questions", () => {
    expect(buildDiagnostic([], modules())).toEqual([]);
  });
});
