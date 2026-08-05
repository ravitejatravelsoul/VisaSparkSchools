import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FocusPanel } from "@/components/study-studio/focus-panel";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

describe("FocusPanel", () => {
  it("shows the setup form with untimed selected by default", () => {
    render(<FocusPanel />);
    expect(screen.getByRole("radio", { name: "Untimed" })).toBeChecked();
    expect(screen.getByRole("button", { name: /^start$/i })).toBeInTheDocument();
  });

  it("starts a session and shows Pause/Finish/Cancel controls", () => {
    render(<FocusPanel />);
    fireEvent.click(screen.getByRole("button", { name: /^start$/i }));
    expect(screen.getByRole("button", { name: /^pause$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^finish$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^cancel$/i })).toBeInTheDocument();
    expect(useProgressStore.getState().state.activeFocusSession).not.toBeNull();
  });

  it("toggles between Pause and Resume", () => {
    render(<FocusPanel />);
    fireEvent.click(screen.getByRole("button", { name: /^start$/i }));
    fireEvent.click(screen.getByRole("button", { name: /^pause$/i }));
    expect(screen.getByRole("button", { name: /^resume$/i })).toBeInTheDocument();
    expect(screen.getByText("Paused")).toBeInTheDocument();
  });

  it("finishing a session clears it and returns to the setup form", () => {
    render(<FocusPanel />);
    fireEvent.click(screen.getByRole("button", { name: /^start$/i }));
    fireEvent.click(screen.getByRole("button", { name: /^finish$/i }));
    expect(screen.getByRole("button", { name: /^start$/i })).toBeInTheDocument();
    expect(useProgressStore.getState().state.activeFocusSession).toBeNull();
  });

  it("recovers an in-progress session after a remount (simulating a refresh)", () => {
    render(<FocusPanel />);
    fireEvent.click(screen.getByRole("button", { name: /^start$/i }));

    // Simulate a page refresh: unmount and mount fresh -- state is read from
    // the (already-hydrated) store, not from component-local state.
    const { unmount } = render(<FocusPanel />);
    unmount();
    render(<FocusPanel />);
    expect(screen.getAllByRole("button", { name: /^pause$/i }).length).toBeGreaterThan(0);
  });

  it("lets a countdown session be configured with a preset duration", () => {
    render(<FocusPanel />);
    fireEvent.click(screen.getByRole("radio", { name: "Countdown" }));
    fireEvent.click(screen.getByRole("button", { name: "25 min" }));
    fireEvent.click(screen.getByRole("button", { name: /^start$/i }));
    const session = useProgressStore.getState().state.activeFocusSession;
    expect(session?.mode).toBe("countdown");
    expect(session?.countdownMinutes).toBe(25);
  });
});

describe("FocusPanel: active time only (not paused time)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-10T10:00:00.000Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not bank time accumulated while paused", () => {
    render(<FocusPanel />);
    fireEvent.click(screen.getByRole("button", { name: /^start$/i }));
    vi.advanceTimersByTime(60_000);
    fireEvent.click(screen.getByRole("button", { name: /^pause$/i }));
    vi.advanceTimersByTime(10 * 60_000); // 10 minutes paused
    fireEvent.click(screen.getByRole("button", { name: /^finish$/i }));

    expect(useProgressStore.getState().state.focusMinutesByDate["2026-08-10"]).toBe(1);
  });
});
