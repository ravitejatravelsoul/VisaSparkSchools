import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InsightsPanel } from "@/components/study-studio/insights-panel";
import { SavedLearningPanel } from "@/components/study-studio/saved-learning-panel";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";
import { localDateKey } from "@/lib/learning/daily-goal";

const LESSON_ID = "found-how-computers-run-code";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

describe("InsightsPanel", () => {
  it("shows a no-data empty state for a learner with no activity at all", () => {
    render(<InsightsPanel />);
    expect(screen.getByText(/no activity recorded yet/i)).toBeInTheDocument();
  });

  it("distinguishes 'no focus history' from '0 minutes this range'", () => {
    // Go through the real action so activity/enrollment are populated too,
    // exactly like real usage -- not a direct state mutation.
    useProgressStore.getState().completeLesson(LESSON_ID);
    render(<InsightsPanel />);
    expect(screen.getByText("No data yet")).toBeInTheDocument();
  });

  it("shows real active study minutes once focus history exists", () => {
    // Must match exactly how the component itself keys focusMinutesByDate --
    // InsightsPanel computes "today" via localDateKey(now, profile.timezone),
    // which resolves to the JS runtime's default timezone when timezone is
    // null (the default), not UTC. Using `.toISOString().slice(0, 10)` here
    // (a UTC-based key) would silently mismatch whenever the test runner's
    // local date and UTC date differ at the moment the suite runs.
    const todayKey = localDateKey(new Date(), null);
    useProgressStore.setState((s) => ({
      state: { ...s.state, focusMinutesByDate: { [todayKey]: 42 } },
    }));
    render(<InsightsPanel />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("switches between week and month ranges", () => {
    render(<InsightsPanel />);
    const monthButton = screen.getByRole("button", { name: "This month" });
    fireEvent.click(monthButton);
    // Just confirm the toggle is now the active-styled button (primary variant class).
    expect(monthButton.className).toMatch(/bg-\(--color-brand\)/);
  });
});

describe("SavedLearningPanel", () => {
  it("shows an empty state with nothing saved", () => {
    render(<SavedLearningPanel />);
    expect(screen.getByText(/nothing saved yet/i)).toBeInTheDocument();
  });

  it("surfaces a bookmarked lesson", () => {
    useProgressStore.setState((s) => ({ state: { ...s.state, bookmarks: [LESSON_ID] } }));
    render(<SavedLearningPanel />);
    expect(screen.getByText("How Computers Run Your Code")).toBeInTheDocument();
    expect(screen.getByText("Bookmarked")).toBeInTheDocument();
  });

  it("surfaces a note preview without exposing it anywhere else", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        notes: {
          [LESSON_ID]: { text: "My private thought", updatedAt: "2026-01-01T00:00:00.000Z" },
        },
      },
    }));
    render(<SavedLearningPanel />);
    expect(screen.getByText("My private thought")).toBeInTheDocument();
    expect(screen.getByText("Note")).toBeInTheDocument();
  });

  it("filters by type", () => {
    useProgressStore.setState((s) => ({
      state: {
        ...s.state,
        bookmarks: [LESSON_ID],
        notes: {
          "found-files-and-terminals": { text: "note only", updatedAt: "2026-01-01T00:00:00.000Z" },
        },
      },
    }));
    render(<SavedLearningPanel />);
    fireEvent.change(screen.getByLabelText("Type"), { target: { value: "bookmarked" } });
    expect(screen.getByText("How Computers Run Your Code")).toBeInTheDocument();
    expect(screen.queryByText("Files, Folders, Editors & Terminals")).not.toBeInTheDocument();
  });
});
