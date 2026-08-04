import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { PracticeSession } from "@/components/practice/practice-session";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";
import type { PracticeQuestion } from "@/lib/practice/types";

const questions: PracticeQuestion[] = [
  {
    id: "lesson-a:q1",
    prompt: "2 + 2 = ?",
    choices: ["3", "4"],
    correctIndex: 1,
    explanation: "Basic addition.",
    topic: "Topic A",
    courseSlug: "test-course",
    lessonSlug: "lesson-a",
    lessonId: "lesson-a",
    difficulty: "beginner",
    source: "Lesson quiz: Lesson A",
  },
  {
    id: "lesson-a:q2",
    prompt: "Sky color?",
    choices: ["Blue", "Green"],
    correctIndex: 0,
    explanation: "Rayleigh scattering.",
    topic: "Topic A",
    courseSlug: "test-course",
    lessonSlug: "lesson-a",
    lessonId: "lesson-a",
    difficulty: "beginner",
    source: "Lesson quiz: Lesson A",
  },
  {
    id: "lesson-b:q1",
    prompt: "Water formula?",
    choices: ["H2O", "CO2"],
    correctIndex: 0,
    explanation: "Two hydrogen, one oxygen.",
    topic: "Topic B",
    courseSlug: "test-course",
    lessonSlug: "lesson-b",
    lessonId: "lesson-b",
    difficulty: "beginner",
    source: "Lesson quiz: Lesson B",
  },
];

beforeEach(() => {
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

function startUntimedSession() {
  render(
    <PracticeSession courseSlug="test-course" courseTitle="Test Course" questions={questions} />,
  );
  fireEvent.click(screen.getByRole("button", { name: /start practice/i }));
}

describe("PracticeSession", () => {
  it("shows a setup screen with a mode choice before any question is shown", () => {
    render(
      <PracticeSession courseSlug="test-course" courseTitle="Test Course" questions={questions} />,
    );
    expect(screen.getByRole("button", { name: /start practice/i })).toBeInTheDocument();
    expect(screen.queryByText(/2 \+ 2 = \?/)).not.toBeInTheDocument();
  });

  it("never claims to be a proctored or certified exam", () => {
    render(
      <PracticeSession courseSlug="test-course" courseTitle="Test Course" questions={questions} />,
    );
    expect(screen.getByText(/not a proctored or officially scored exam/i)).toBeInTheDocument();
  });

  it("shows an empty-state message instead of a broken form when a course has no questions", () => {
    render(<PracticeSession courseSlug="test-course" courseTitle="Test Course" questions={[]} />);
    expect(screen.getByText(/doesn.t have any practice questions yet/i)).toBeInTheDocument();
  });

  it("untimed mode reveals correctness and the explanation as soon as a question is answered", () => {
    startUntimedSession();
    const firstQuestion = screen.getByText(/2 \+ 2 = \?/).closest("fieldset")!;
    fireEvent.click(within(firstQuestion).getByLabelText("4"));
    expect(within(firstQuestion).getByText(/\(Correct\)/)).toBeInTheDocument();
    expect(within(firstQuestion).getByText(/Basic addition\./)).toBeInTheDocument();
  });

  it("requires every question answered before the finish button is enabled", () => {
    startUntimedSession();
    const finish = screen.getByRole("button", { name: /finish practice session/i });
    expect(finish).toBeDisabled();
  });

  it("scores the session and shows a topic breakdown on finish", () => {
    startUntimedSession();
    fireEvent.click(screen.getByLabelText("4")); // correct
    fireEvent.click(screen.getByLabelText("Green")); // incorrect
    fireEvent.click(screen.getByLabelText("H2O")); // correct
    fireEvent.click(screen.getByRole("button", { name: /finish practice session/i }));

    expect(screen.getByText(/you scored 2 out of 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Topic A: 1\/2/)).toBeInTheDocument();
    expect(screen.getByText(/Topic B: 1\/1/)).toBeInTheDocument();
  });

  it("records a practice attempt summary in the progress store on finish", () => {
    startUntimedSession();
    fireEvent.click(screen.getByLabelText("4"));
    fireEvent.click(screen.getByLabelText("Blue"));
    fireEvent.click(screen.getByLabelText("H2O"));
    fireEvent.click(screen.getByRole("button", { name: /finish practice session/i }));

    const attempt = useProgressStore.getState().state.practiceAttempts["test-course"];
    expect(attempt).toBeDefined();
    expect(attempt.bestScore).toBe(3);
    expect(attempt.bestTotal).toBe(3);
  });

  it("offers to retry only the incorrectly-answered questions", () => {
    startUntimedSession();
    fireEvent.click(screen.getByLabelText("3")); // wrong
    fireEvent.click(screen.getByLabelText("Blue")); // correct
    fireEvent.click(screen.getByLabelText("H2O")); // correct
    fireEvent.click(screen.getByRole("button", { name: /finish practice session/i }));

    const retryButton = screen.getByRole("button", { name: /retry incorrect questions/i });
    fireEvent.click(retryButton);

    // Only the one incorrect question should now be in the active session.
    expect(screen.getByText(/2 \+ 2 = \?/)).toBeInTheDocument();
    expect(screen.queryByText(/Sky color\?/)).not.toBeInTheDocument();
  });

  it("start a new session returns to the setup screen", () => {
    startUntimedSession();
    fireEvent.click(screen.getByLabelText("4"));
    fireEvent.click(screen.getByLabelText("Blue"));
    fireEvent.click(screen.getByLabelText("H2O"));
    fireEvent.click(screen.getByRole("button", { name: /finish practice session/i }));

    fireEvent.click(screen.getByRole("button", { name: /start a new session/i }));
    expect(screen.getByRole("button", { name: /start practice/i })).toBeInTheDocument();
  });

  it("timed mode withholds per-question feedback until the session is finished", () => {
    render(
      <PracticeSession courseSlug="test-course" courseTitle="Test Course" questions={questions} />,
    );
    fireEvent.click(screen.getByLabelText(/timed \(explanations shown at the end\)/i));
    fireEvent.click(screen.getByRole("button", { name: /start practice/i }));

    const firstQuestion = screen.getByText(/2 \+ 2 = \?/).closest("fieldset")!;
    fireEvent.click(within(firstQuestion).getByLabelText("4"));
    expect(within(firstQuestion).queryByText(/\(Correct\)/)).not.toBeInTheDocument();
  });

  it("shows a best-score summary on the setup screen after a prior attempt", () => {
    useProgressStore.getState().recordPracticeAttempt("test-course", {
      score: 2,
      total: 3,
      topicsNeedingReview: ["Topic A"],
    });
    render(
      <PracticeSession courseSlug="test-course" courseTitle="Test Course" questions={questions} />,
    );
    expect(screen.getByText(/Best score:/)).toBeInTheDocument();
    expect(screen.getByText("2", { selector: "strong" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /practice weak topics only/i })).toBeInTheDocument();
  });
});
