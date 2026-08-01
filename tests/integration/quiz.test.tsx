import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Quiz } from "@/components/lesson/quiz";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";

const questions = [
  {
    id: "q1",
    prompt: "2 + 2 = ?",
    choices: ["3", "4"],
    correctIndex: 1,
    explanation: "Basic math.",
  },
  {
    id: "q2",
    prompt: "Sky color?",
    choices: ["Blue", "Green"],
    correctIndex: 0,
    explanation: "Rayleigh scattering.",
  },
  {
    id: "q3",
    prompt: "Water formula?",
    choices: ["H2O", "CO2"],
    correctIndex: 0,
    explanation: "Two hydrogen, one oxygen.",
  },
];

beforeEach(() => {
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

describe("Quiz", () => {
  it("disables submission until every question is answered", () => {
    render(<Quiz lessonId="test-lesson" questions={questions} />);
    const submit = screen.getByRole("button", { name: /check answers/i });
    expect(submit).toBeDisabled();
  });

  it("shows a score and explanations after submitting", () => {
    render(<Quiz lessonId="test-lesson" questions={questions} />);

    fireEvent.click(screen.getByLabelText("4"));
    fireEvent.click(screen.getByLabelText("Blue"));
    fireEvent.click(screen.getByLabelText("H2O"));

    const submit = screen.getByRole("button", { name: /check answers/i });
    expect(submit).not.toBeDisabled();
    fireEvent.click(submit);

    expect(screen.getByText(/you scored 3 out of 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Rayleigh scattering\./)).toBeInTheDocument();
  });

  it("records the quiz result in the progress store", () => {
    render(<Quiz lessonId="test-lesson" questions={questions} />);
    fireEvent.click(screen.getByLabelText("3")); // wrong answer
    fireEvent.click(screen.getByLabelText("Blue"));
    fireEvent.click(screen.getByLabelText("H2O"));
    fireEvent.click(screen.getByRole("button", { name: /check answers/i }));

    const result = useProgressStore.getState().state.quizResults["test-lesson"];
    expect(result).toBeDefined();
    expect(result.correct).toBe(2);
    expect(result.total).toBe(3);
  });

  it("allows retrying the quiz, clearing previous answers", () => {
    render(<Quiz lessonId="test-lesson" questions={questions} />);
    fireEvent.click(screen.getByLabelText("4"));
    fireEvent.click(screen.getByLabelText("Blue"));
    fireEvent.click(screen.getByLabelText("H2O"));
    fireEvent.click(screen.getByRole("button", { name: /check answers/i }));

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(screen.getByRole("button", { name: /check answers/i })).toBeDisabled();
  });
});
