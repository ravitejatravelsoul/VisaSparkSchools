import { describe, it, expect } from "vitest";
import { interviewQuestionSchema, MIN_QUESTIONS_PER_COURSE } from "@/lib/interview-prep/types";

describe("interviewQuestionSchema", () => {
  it("accepts a minimal, well-formed question", () => {
    const result = interviewQuestionSchema.safeParse({
      id: "q1",
      courseSlug: "go-programming",
      question: "What is a goroutine?",
      answer: "A lightweight concurrent function execution.",
      category: "Concurrency",
      difficulty: "intermediate",
      lastReviewed: "2026-08-07",
    });
    expect(result.success).toBe(true);
  });

  it("accepts the optional codeExample/commonMistake/followUp fields", () => {
    const result = interviewQuestionSchema.safeParse({
      id: "q1",
      courseSlug: "go-programming",
      question: "What is a goroutine?",
      answer: "A lightweight concurrent function execution.",
      category: "Concurrency",
      difficulty: "intermediate",
      codeExample: "go doWork()",
      commonMistake: "Forgetting main can exit before it finishes.",
      followUp: "How do channels help?",
      lastReviewed: "2026-08-07",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a question with no answer text", () => {
    const result = interviewQuestionSchema.safeParse({
      id: "q1",
      courseSlug: "go-programming",
      question: "What is a goroutine?",
      answer: "",
      category: "Concurrency",
      difficulty: "intermediate",
      lastReviewed: "2026-08-07",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid lastReviewed date format", () => {
    const result = interviewQuestionSchema.safeParse({
      id: "q1",
      courseSlug: "go-programming",
      question: "What is a goroutine?",
      answer: "A lightweight concurrent function execution.",
      category: "Concurrency",
      difficulty: "intermediate",
      lastReviewed: "not-a-date",
    });
    expect(result.success).toBe(false);
  });

  it("MIN_QUESTIONS_PER_COURSE is the documented minimum of 50", () => {
    expect(MIN_QUESTIONS_PER_COURSE).toBe(50);
  });
});
