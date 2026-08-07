import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WritingPractice } from "@/components/exam-prep/writing-practice";
import type { WritingTask } from "@/lib/exam-prep/types";

function tasks(): WritingTask[] {
  return [
    {
      id: "task-1",
      taskName: "Task 1: Report",
      instructions: "Describe the chart.",
      prompt: "The chart shows internet access over time.",
      timeLimitMinutes: 20,
      minWords: 150,
      rubric: [
        { criterion: "Task achievement", guidance: "Covers the main trends." },
        { criterion: "Coherence", guidance: "Organized clearly." },
        { criterion: "Grammar", guidance: "Mostly accurate." },
      ],
    },
    {
      id: "task-2",
      taskName: "Task 2: Essay",
      instructions: "Write an essay.",
      prompt: "Some people believe X. Discuss.",
      timeLimitMinutes: 40,
      minWords: 250,
      rubric: [
        { criterion: "Task response", guidance: "Answers the question." },
        { criterion: "Coherence", guidance: "Logical paragraphs." },
        { criterion: "Grammar", guidance: "Range of structures." },
      ],
    },
  ];
}

describe("WritingPractice", () => {
  it("shows the first task's prompt by default", () => {
    render(<WritingPractice tasks={tasks()} />);
    expect(screen.getByText("The chart shows internet access over time.")).toBeInTheDocument();
  });

  it("switching tasks resets the response and shows the new prompt", () => {
    render(<WritingPractice tasks={tasks()} />);
    fireEvent.click(screen.getByRole("button", { name: "Task 2: Essay" }));
    expect(screen.getByText("Some people believe X. Discuss.")).toBeInTheDocument();
  });

  it("starting writing reveals a live word count as the learner types", () => {
    render(<WritingPractice tasks={tasks()} />);
    fireEvent.click(screen.getByRole("button", { name: /start timed writing/i }));
    const textarea = screen.getByLabelText("Your response");
    fireEvent.change(textarea, { target: { value: "one two three" } });
    expect(screen.getByText(/3 words/)).toBeInTheDocument();
  });

  it("finishing shows a self-review rubric and an explicit not-graded disclaimer", () => {
    render(<WritingPractice tasks={tasks()} />);
    fireEvent.click(screen.getByRole("button", { name: /start timed writing/i }));
    fireEvent.change(screen.getByLabelText("Your response"), {
      target: { value: "a response" },
    });
    fireEvent.click(screen.getByRole("button", { name: /finish and self-review/i }));

    expect(screen.getByText(/Self-review, not an automated score/)).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Task achievement/ })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Coherence/ })).toBeInTheDocument();
  });

  it("checking a rubric criterion toggles its checked state", () => {
    render(<WritingPractice tasks={tasks()} />);
    fireEvent.click(screen.getByRole("button", { name: /start timed writing/i }));
    fireEvent.click(screen.getByRole("button", { name: /finish and self-review/i }));
    const checkbox = screen.getByRole("checkbox", { name: /Task achievement/ });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("the response textarea becomes read-only during self-review", () => {
    render(<WritingPractice tasks={tasks()} />);
    fireEvent.click(screen.getByRole("button", { name: /start timed writing/i }));
    fireEvent.click(screen.getByRole("button", { name: /finish and self-review/i }));
    expect(screen.getByLabelText("Your response")).toHaveAttribute("readonly");
  });
});
