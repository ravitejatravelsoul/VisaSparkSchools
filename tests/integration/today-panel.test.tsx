import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodayPanel } from "@/components/study-studio/today-panel";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";

const LESSON_ID = "found-how-computers-run-code";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

describe("TodayPanel", () => {
  it("shows a due review item and lets the learner skip it for today", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        reviewQueue: { [LESSON_ID]: { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 1 } },
      },
    }));
    render(<TodayPanel />);
    expect(screen.getByText("How Computers Run Your Code")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /skip today/i }));
    expect(screen.queryByText("How Computers Run Your Code")).not.toBeInTheDocument();
    expect(useProgressStore.getState().state.todayDismissed.itemIds).toContain(
      `review:${LESSON_ID}`,
    );
  });

  it("reveals a reschedule date field and moves the review's due date", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        reviewQueue: { [LESSON_ID]: { dueAt: "2020-01-01T00:00:00.000Z", intervalDays: 1 } },
      },
    }));
    render(<TodayPanel />);
    fireEvent.click(screen.getByRole("button", { name: /reschedule/i }));
    const dateInput = screen.getByLabelText(/new date/i);
    fireEvent.change(dateInput, { target: { value: "2099-06-15" } });
    fireEvent.click(screen.getByRole("button", { name: /^save$/i }));

    expect(
      useProgressStore.getState().state.reviewQueue[LESSON_ID].dueAt.startsWith("2099-06-15"),
    ).toBe(true);
  });

  it("shows an empty-friendly fallback recommendation when nothing else is queued", () => {
    render(<TodayPanel />);
    // With zero progress, the fallback recommendation renders the platform's first lesson.
    expect(screen.getByText(/suggested/i)).toBeInTheDocument();
  });
});
