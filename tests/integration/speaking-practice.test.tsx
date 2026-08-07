import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SpeakingPractice } from "@/components/exam-prep/speaking-practice";
import type { SpeakingTask } from "@/lib/exam-prep/types";

function tasks(): SpeakingTask[] {
  return [
    {
      id: "part-1",
      taskName: "Part 1",
      instructions: "Answer naturally.",
      prompt: "Tell me about your hometown.",
      prepSeconds: 0,
      speakSeconds: 3,
      rubric: [
        { criterion: "Fluency", guidance: "Natural pace." },
        { criterion: "Vocabulary", guidance: "Accurate words." },
        { criterion: "Grammar", guidance: "Reasonable accuracy." },
      ],
    },
    {
      id: "part-2",
      taskName: "Part 2",
      instructions: "Use the cue card.",
      prompt: "Describe a skill you want to learn.",
      prepSeconds: 2,
      speakSeconds: 3,
      rubric: [
        { criterion: "Fluency", guidance: "Speaks for the full time." },
        { criterion: "Vocabulary", guidance: "Topic-specific words." },
        { criterion: "Grammar", guidance: "Range of tenses." },
      ],
    },
  ];
}

// jsdom has no MediaRecorder/getUserMedia by default, so recordingSupported
// resolves to false -- these tests exercise the honest fallback path
// (timer-only practice), which is exactly what a browser without mic
// permission or API support would also see.
describe("SpeakingPractice", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows an unsupported-recording notice when MediaRecorder isn't available", () => {
    render(<SpeakingPractice tasks={tasks()} />);
    expect(screen.getByText(/doesn't support local audio recording/i)).toBeInTheDocument();
  });

  it("a task with no prep time starts speaking immediately", () => {
    render(<SpeakingPractice tasks={tasks()} />);
    fireEvent.click(screen.getByRole("button", { name: /start speaking/i }));
    expect(screen.getByText(/^Speaking:/)).toBeInTheDocument();
  });

  it("a task with prep time counts down preparation before speaking begins", () => {
    render(<SpeakingPractice tasks={tasks()} />);
    fireEvent.click(screen.getByRole("button", { name: "Part 2" }));
    fireEvent.click(screen.getByRole("button", { name: /start preparation/i }));
    expect(screen.getByText(/^Preparing:/)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText(/^Speaking:/)).toBeInTheDocument();
  });

  it("reaching zero on the speak timer moves to self-review with the rubric", () => {
    render(<SpeakingPractice tasks={tasks()} />);
    fireEvent.click(screen.getByRole("button", { name: /start speaking/i }));
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText(/Self-review, not an automated score/)).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Fluency/ })).toBeInTheDocument();
  });

  it("never renders an audio player when nothing was recorded", () => {
    render(<SpeakingPractice tasks={tasks()} />);
    fireEvent.click(screen.getByRole("button", { name: /start speaking/i }));
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByText("Your recording")).not.toBeInTheDocument();
  });
});
