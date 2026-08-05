import { describe, it, expect, beforeEach } from "vitest";
import { loadProgress, saveProgress } from "@/lib/learning/storage";
import { createEmptyProgress } from "@/lib/learning/types";

const NEW_KEY = "visasparkschools:progress";
const LEGACY_KEY = "codewise:progress";

describe("loadProgress brand-rename migration (CodeWise -> VisaSparkSchools)", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns empty progress when nothing is stored under either key", () => {
    const state = loadProgress();
    expect(state).toEqual(createEmptyProgress());
  });

  it("reads directly from the new key when present, ignoring any legacy key", () => {
    const fresh = { ...createEmptyProgress(), dailyGoalMinutes: 45, version: 2 };
    window.localStorage.setItem(NEW_KEY, JSON.stringify(fresh));
    window.localStorage.setItem(
      LEGACY_KEY,
      JSON.stringify({ ...createEmptyProgress(), dailyGoalMinutes: 999, version: 2 }),
    );

    const state = loadProgress();
    expect(state.dailyGoalMinutes).toBe(45);
  });

  it("migrates guest progress from the legacy CodeWise key when no new-key data exists", () => {
    const legacy = {
      ...createEmptyProgress(),
      dailyGoalMinutes: 30,
      bookmarks: ["html-document-structure"],
      version: 2,
    };
    window.localStorage.setItem(LEGACY_KEY, JSON.stringify(legacy));

    const state = loadProgress();
    expect(state.dailyGoalMinutes).toBe(30);
    expect(state.bookmarks).toEqual(["html-document-structure"]);
  });

  it("copies migrated legacy progress onto the new key so future loads don't re-migrate", () => {
    const legacy = { ...createEmptyProgress(), dailyGoalMinutes: 55, version: 2 };
    window.localStorage.setItem(LEGACY_KEY, JSON.stringify(legacy));

    loadProgress();

    const raw = window.localStorage.getItem(NEW_KEY);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!).dailyGoalMinutes).toBe(55);
  });

  it("never deletes the legacy key -- it remains as a recoverable backup", () => {
    const legacy = { ...createEmptyProgress(), dailyGoalMinutes: 55, version: 2 };
    window.localStorage.setItem(LEGACY_KEY, JSON.stringify(legacy));

    loadProgress();

    expect(window.localStorage.getItem(LEGACY_KEY)).not.toBeNull();
  });

  it("saveProgress always writes under the new key", () => {
    saveProgress({ ...createEmptyProgress(), dailyGoalMinutes: 10 });
    expect(window.localStorage.getItem(NEW_KEY)).not.toBeNull();
    expect(window.localStorage.getItem(LEGACY_KEY)).toBeNull();
  });
});

describe("v3 -> v5 migration (Phase 6: practiceAttempts)", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("upgrades stored v3 data to v5, defaulting practiceAttempts to {} and preserving everything else", () => {
    const v3 = {
      ...createEmptyProgress(),
      version: 3,
      dailyGoalMinutes: 42,
      bookmarks: ["html-document-structure"],
      enrollments: { "html-css-fundamentals": { enrolledAt: "2026-01-01T00:00:00.000Z" } },
    };
    delete (v3 as { practiceAttempts?: unknown }).practiceAttempts;
    window.localStorage.setItem(NEW_KEY, JSON.stringify(v3));

    const state = loadProgress();
    expect(state.version).toBe(5);
    expect(state.dailyGoalMinutes).toBe(42);
    expect(state.bookmarks).toEqual(["html-document-structure"]);
    expect(state.enrollments["html-css-fundamentals"]).toBeDefined();
    expect(state.practiceAttempts).toEqual({});
    expect(state.studyPlans).toEqual({});
  });

  it("older/unversioned data reconstructs safely with an empty practiceAttempts map", () => {
    window.localStorage.setItem(NEW_KEY, JSON.stringify({ dailyGoalMinutes: 15 }));
    const state = loadProgress();
    expect(state.version).toBe(5);
    expect(state.practiceAttempts).toEqual({});
  });
});

describe("v4 -> v5 migration (Phase 7: Study Studio)", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("upgrades stored v4 data to v5, defaulting every new Study Studio field and preserving everything else", () => {
    const v4 = {
      ...createEmptyProgress(),
      version: 4,
      dailyGoalMinutes: 42,
      practiceAttempts: {
        "quantitative-aptitude": {
          bestScore: 30,
          bestTotal: 36,
          lastAttemptedAt: "2026-08-01T00:00:00.000Z",
          topicsNeedingReview: ["Percentages"],
        },
      },
    };
    for (const key of [
      "studyPlans",
      "activeFocusSession",
      "focusMinutesByDate",
      "todayDismissed",
    ]) {
      delete (v4 as Record<string, unknown>)[key];
    }
    window.localStorage.setItem(NEW_KEY, JSON.stringify(v4));

    const state = loadProgress();
    expect(state.version).toBe(5);
    expect(state.dailyGoalMinutes).toBe(42);
    expect(state.practiceAttempts["quantitative-aptitude"]).toBeDefined();
    expect(state.studyPlans).toEqual({});
    expect(state.activeFocusSession).toBeNull();
    expect(state.focusMinutesByDate).toEqual({});
    expect(state.todayDismissed).toEqual({ date: "", itemIds: [] });
  });

  it("reads current v5 data (including Study Studio fields) straight through unchanged", () => {
    const v5 = {
      ...createEmptyProgress(),
      studyPlans: {
        "plan-1": {
          id: "plan-1",
          title: "My Plan",
          courseSlugs: ["how-computing-works"],
          createdAt: "2026-08-01T00:00:00.000Z",
          updatedAt: "2026-08-01T00:00:00.000Z",
          targetDate: null,
          preferredDaysOfWeek: [1, 2, 3],
          minutesPerSession: 30,
          status: "active",
          schedule: { "2026-08-10": ["found-how-computers-run-code"] },
        },
      },
      activeFocusSession: {
        id: "focus-1",
        mode: "untimed",
        startedAt: "2026-08-10T00:00:00.000Z",
        accumulatedSeconds: 120,
        runningSince: "2026-08-10T00:01:00.000Z",
      },
      focusMinutesByDate: { "2026-08-09": 25 },
      todayDismissed: { date: "2026-08-09", itemIds: ["review:some-lesson"] },
    };
    window.localStorage.setItem(NEW_KEY, JSON.stringify(v5));

    const state = loadProgress();
    expect(state.studyPlans["plan-1"]).toEqual(v5.studyPlans["plan-1"]);
    expect(state.activeFocusSession).toEqual(v5.activeFocusSession);
    expect(state.focusMinutesByDate).toEqual({ "2026-08-09": 25 });
    expect(state.todayDismissed).toEqual(v5.todayDismissed);
  });

  it("prunes focusMinutesByDate entries older than the retention window on load", () => {
    const v5 = {
      ...createEmptyProgress(),
      focusMinutesByDate: { "2020-01-01": 999, "2026-08-09": 25 },
    };
    window.localStorage.setItem(NEW_KEY, JSON.stringify(v5));
    const state = loadProgress();
    expect(state.focusMinutesByDate["2020-01-01"]).toBeUndefined();
    expect(state.focusMinutesByDate["2026-08-09"]).toBe(25);
  });
});
