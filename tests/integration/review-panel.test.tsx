import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewPanel } from "@/components/study-studio/review-panel";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";
import { getLessonById } from "@/lib/content/registry";

const LESSON_ID = "found-how-computers-run-code";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

describe("ReviewPanel", () => {
  it("shows an empty state when nothing is due", () => {
    render(<ReviewPanel />);
    expect(screen.getByText(/nothing due right now/i)).toBeInTheDocument();
  });

  it("lists a due lesson and starts a flashcard session", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        reviewQueue: { [LESSON_ID]: { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 1 } },
      },
    }));
    render(<ReviewPanel />);
    expect(screen.getByText("How Computers Run Your Code")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /start review session/i }));

    const lesson = getLessonById(LESSON_ID)!;
    expect(screen.getByText(lesson.quiz[0].prompt)).toBeInTheDocument();
  });

  it("hides the answer until Reveal is pressed, then shows rating buttons", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        reviewQueue: { [LESSON_ID]: { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 1 } },
      },
    }));
    render(<ReviewPanel />);
    fireEvent.click(screen.getByRole("button", { name: /start review session/i }));

    expect(screen.queryByRole("button", { name: "Good" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /reveal answer/i }));
    expect(screen.getByRole("button", { name: "Good" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Again" })).toBeInTheDocument();
  });

  it("records a review result and reschedules the lesson once the session finishes", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        reviewQueue: { [LESSON_ID]: { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 7 } },
      },
    }));
    render(<ReviewPanel />);
    fireEvent.click(screen.getByRole("button", { name: /start review session/i }));

    const lesson = getLessonById(LESSON_ID)!;
    for (let i = 0; i < lesson.quiz.length; i++) {
      fireEvent.click(screen.getByRole("button", { name: /reveal answer/i }));
      fireEvent.click(screen.getByRole("button", { name: "Good" }));
    }

    // Session ends and returns to the landing view; the lesson is no longer
    // due (its next review is 14 days out), so the due list is now empty.
    expect(screen.getByText("Due for review (0)")).toBeInTheDocument();
    const review = useProgressStore.getState().state.reviewQueue[LESSON_ID];
    expect(review.intervalDays).toBe(14); // "good" advances 7 -> 14
  });

  it("aggregates the worst rating: one 'again' card sends the whole lesson back to day 1", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        reviewQueue: { [LESSON_ID]: { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 7 } },
      },
    }));
    render(<ReviewPanel />);
    fireEvent.click(screen.getByRole("button", { name: /start review session/i }));

    const lesson = getLessonById(LESSON_ID)!;
    fireEvent.click(screen.getByRole("button", { name: /reveal answer/i }));
    fireEvent.click(screen.getByRole("button", { name: "Again" }));
    for (let i = 1; i < lesson.quiz.length; i++) {
      fireEvent.click(screen.getByRole("button", { name: /reveal answer/i }));
      fireEvent.click(screen.getByRole("button", { name: "Easy" }));
    }

    const review = useProgressStore.getState().state.reviewQueue[LESSON_ID];
    expect(review.intervalDays).toBe(1);
  });

  it("requires a confirmation step before resetting a lesson's review schedule", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        reviewQueue: { [LESSON_ID]: { dueAt: "2099-01-01T00:00:00.000Z", intervalDays: 14 } },
      },
    }));
    render(<ReviewPanel />);
    fireEvent.click(screen.getByRole("button", { name: /reset schedule/i }));
    expect(screen.getByText(/reset to day 1/i)).toBeInTheDocument();
    expect(useProgressStore.getState().state.reviewQueue[LESSON_ID].intervalDays).toBe(14);

    fireEvent.click(screen.getByRole("button", { name: /confirm reset/i }));
    expect(useProgressStore.getState().state.reviewQueue[LESSON_ID].intervalDays).toBe(1);
  });
});
