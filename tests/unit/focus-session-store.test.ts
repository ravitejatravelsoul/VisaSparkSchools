import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-10T10:00:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("startFocusSession", () => {
  it("starts a running (not paused) session", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    const session = useProgressStore.getState().state.activeFocusSession;
    expect(session).toBeDefined();
    expect(session!.runningSince).not.toBeNull();
    expect(session!.accumulatedSeconds).toBe(0);
  });

  it("records the optional lesson/course association", () => {
    useProgressStore.getState().startFocusSession({
      mode: "countdown",
      countdownMinutes: 25,
      lessonId: "l1",
      courseSlug: "how-computing-works",
    });
    const session = useProgressStore.getState().state.activeFocusSession;
    expect(session!.mode).toBe("countdown");
    expect(session!.countdownMinutes).toBe(25);
    expect(session!.lessonId).toBe("l1");
  });
});

describe("pauseFocusSession / resumeFocusSession", () => {
  it("banks elapsed time into accumulatedSeconds on pause and stops running", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    vi.advanceTimersByTime(30_000); // 30 seconds
    useProgressStore.getState().pauseFocusSession();
    const session = useProgressStore.getState().state.activeFocusSession;
    expect(session!.runningSince).toBeNull();
    expect(session!.accumulatedSeconds).toBeCloseTo(30, 0);
  });

  it("does not accumulate additional time while paused", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    vi.advanceTimersByTime(10_000);
    useProgressStore.getState().pauseFocusSession();
    const pausedElapsed = useProgressStore.getState().state.activeFocusSession!.accumulatedSeconds;
    vi.advanceTimersByTime(60_000); // time passes while paused
    expect(useProgressStore.getState().state.activeFocusSession!.accumulatedSeconds).toBe(
      pausedElapsed,
    );
  });

  it("resumes from where it left off, not from zero", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    vi.advanceTimersByTime(10_000);
    useProgressStore.getState().pauseFocusSession();
    useProgressStore.getState().resumeFocusSession();
    vi.advanceTimersByTime(10_000);
    useProgressStore.getState().pauseFocusSession();
    expect(useProgressStore.getState().state.activeFocusSession!.accumulatedSeconds).toBeCloseTo(
      20,
      0,
    );
  });

  it("pausing an already-paused session is a safe no-op", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    useProgressStore.getState().pauseFocusSession();
    const first = useProgressStore.getState().state.activeFocusSession;
    useProgressStore.getState().pauseFocusSession();
    expect(useProgressStore.getState().state.activeFocusSession).toEqual(first);
  });
});

describe("finishFocusSession", () => {
  it("banks the elapsed minutes into today's focusMinutesByDate and clears the session", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    vi.advanceTimersByTime(90_000); // 90s -> rounds to 2 minutes... actually 1.5 min rounds to 2
    useProgressStore.getState().finishFocusSession();
    const state = useProgressStore.getState().state;
    expect(state.activeFocusSession).toBeNull();
    expect(state.focusMinutesByDate["2026-08-10"]).toBeGreaterThan(0);
  });

  it("accumulates minutes across multiple sessions on the same day", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    vi.advanceTimersByTime(60_000);
    useProgressStore.getState().finishFocusSession();
    const afterFirst = useProgressStore.getState().state.focusMinutesByDate["2026-08-10"];

    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    vi.advanceTimersByTime(60_000);
    useProgressStore.getState().finishFocusSession();
    const afterSecond = useProgressStore.getState().state.focusMinutesByDate["2026-08-10"];

    expect(afterSecond).toBeGreaterThan(afterFirst);
  });

  it("is idempotent -- finishing twice in a row does not double-bank time", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    vi.advanceTimersByTime(60_000);
    useProgressStore.getState().finishFocusSession();
    const afterFirst = useProgressStore.getState().state.focusMinutesByDate["2026-08-10"];
    useProgressStore.getState().finishFocusSession();
    expect(useProgressStore.getState().state.focusMinutesByDate["2026-08-10"]).toBe(afterFirst);
  });

  it("counts only active (unpaused) time, never paused time", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    vi.advanceTimersByTime(60_000); // 60s active
    useProgressStore.getState().pauseFocusSession();
    vi.advanceTimersByTime(600_000); // 10 minutes paused -- must not count
    useProgressStore.getState().resumeFocusSession();
    useProgressStore.getState().finishFocusSession();
    // 60s active total should round to 1 minute, not include the paused 10 minutes.
    expect(useProgressStore.getState().state.focusMinutesByDate["2026-08-10"]).toBe(1);
  });

  it("logs a focus-session-completed activity event only when minutes were actually banked", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    vi.advanceTimersByTime(60_000);
    useProgressStore.getState().finishFocusSession();
    const events = useProgressStore
      .getState()
      .state.activity.filter((e) => e.type === "focus-session-completed");
    expect(events).toHaveLength(1);
  });

  it("does not log an activity event or bank 0 minutes for a near-instant finish", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    useProgressStore.getState().finishFocusSession();
    const events = useProgressStore
      .getState()
      .state.activity.filter((e) => e.type === "focus-session-completed");
    expect(events).toHaveLength(0);
    expect(useProgressStore.getState().state.focusMinutesByDate["2026-08-10"]).toBeUndefined();
  });
});

describe("cancelFocusSession", () => {
  it("discards the session without banking any time", () => {
    useProgressStore.getState().startFocusSession({ mode: "untimed" });
    vi.advanceTimersByTime(120_000);
    useProgressStore.getState().cancelFocusSession();
    const state = useProgressStore.getState().state;
    expect(state.activeFocusSession).toBeNull();
    expect(state.focusMinutesByDate["2026-08-10"]).toBeUndefined();
  });

  it("is a safe no-op with no active session", () => {
    useProgressStore.getState().cancelFocusSession();
    expect(useProgressStore.getState().state.activeFocusSession).toBeNull();
  });
});
