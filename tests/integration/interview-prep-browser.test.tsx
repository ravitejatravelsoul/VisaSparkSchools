import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InterviewPrepBrowser } from "@/components/interview-prep/interview-prep-browser";
import type { InterviewQuestion } from "@/lib/interview-prep/types";

function questions(): InterviewQuestion[] {
  return [
    {
      id: "q1",
      courseSlug: "go-programming",
      question: "What is a goroutine?",
      answer:
        "A lightweight, independently-scheduled function execution started with the go keyword.",
      category: "Concurrency",
      difficulty: "intermediate",
      codeExample: "go doWork()",
      commonMistake: "Letting main return before a goroutine finishes.",
      followUp: "How do channels coordinate goroutines safely?",
      lastReviewed: "2026-08-07",
    },
    {
      id: "q2",
      courseSlug: "go-programming",
      question: "What does the blank identifier _ do?",
      answer: "It discards a value you don't need, such as an unused return value.",
      category: "Syntax",
      difficulty: "beginner",
      lastReviewed: "2026-08-07",
    },
  ];
}

describe("InterviewPrepBrowser", () => {
  it("renders every question and shows a count", () => {
    render(<InterviewPrepBrowser questions={questions()} />);
    expect(screen.getByText("What is a goroutine?")).toBeInTheDocument();
    expect(screen.getByText("What does the blank identifier _ do?")).toBeInTheDocument();
    expect(screen.getByText("2 of 2 questions")).toBeInTheDocument();
  });

  it("filters by search text across question and answer", () => {
    render(<InterviewPrepBrowser questions={questions()} />);
    fireEvent.change(screen.getByPlaceholderText(/search questions/i), {
      target: { value: "goroutine" },
    });
    expect(screen.getByText("What is a goroutine?")).toBeInTheDocument();
    expect(screen.queryByText("What does the blank identifier _ do?")).not.toBeInTheDocument();
  });

  it("filters by category", () => {
    render(<InterviewPrepBrowser questions={questions()} />);
    fireEvent.change(screen.getByLabelText("Filter by category"), {
      target: { value: "Syntax" },
    });
    expect(screen.queryByText("What is a goroutine?")).not.toBeInTheDocument();
    expect(screen.getByText("What does the blank identifier _ do?")).toBeInTheDocument();
  });

  it("filters by difficulty", () => {
    render(<InterviewPrepBrowser questions={questions()} />);
    fireEvent.change(screen.getByLabelText("Filter by difficulty"), {
      target: { value: "beginner" },
    });
    expect(screen.queryByText("What is a goroutine?")).not.toBeInTheDocument();
    expect(screen.getByText("What does the blank identifier _ do?")).toBeInTheDocument();
  });

  it("shows an empty state when no question matches the filters", () => {
    render(<InterviewPrepBrowser questions={questions()} />);
    fireEvent.change(screen.getByPlaceholderText(/search questions/i), {
      target: { value: "nonexistent topic xyz" },
    });
    expect(screen.getByText(/no questions match/i)).toBeInTheDocument();
  });

  it("Expand all reveals answer content for every question", () => {
    render(<InterviewPrepBrowser questions={questions()} />);
    fireEvent.click(screen.getByRole("button", { name: /expand all/i }));
    expect(
      screen.getByText(/A lightweight, independently-scheduled function execution/),
    ).toBeVisible();
  });

  it("Collapse all hides answer content again", () => {
    render(<InterviewPrepBrowser questions={questions()} />);
    fireEvent.click(screen.getByRole("button", { name: /expand all/i }));
    fireEvent.click(screen.getByRole("button", { name: /collapse all/i }));
    expect(
      screen.getByText(/A lightweight, independently-scheduled function execution/),
    ).not.toBeVisible();
  });

  it("shows code example, common mistake, and follow-up once expanded", () => {
    render(<InterviewPrepBrowser questions={questions()} />);
    fireEvent.click(screen.getByRole("button", { name: /expand all/i }));
    expect(screen.getByText("go doWork()")).toBeInTheDocument();
    expect(screen.getByText(/Letting main return before a goroutine finishes/)).toBeInTheDocument();
    expect(screen.getByText(/How do channels coordinate goroutines safely/)).toBeInTheDocument();
  });

  it("uses the itemLabel prop for exam-prep 'preparation question' framing", () => {
    render(<InterviewPrepBrowser questions={questions()} itemLabel="preparation question" />);
    expect(screen.getByPlaceholderText(/search preparation questions/i)).toBeInTheDocument();
    expect(screen.getByText("2 of 2 preparation questions")).toBeInTheDocument();
  });
});
