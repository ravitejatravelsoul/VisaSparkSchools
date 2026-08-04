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

describe("v3 -> v4 migration (Phase 6: practiceAttempts)", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("upgrades stored v3 data to v4, defaulting practiceAttempts to {} and preserving everything else", () => {
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
    expect(state.version).toBe(4);
    expect(state.dailyGoalMinutes).toBe(42);
    expect(state.bookmarks).toEqual(["html-document-structure"]);
    expect(state.enrollments["html-css-fundamentals"]).toBeDefined();
    expect(state.practiceAttempts).toEqual({});
  });

  it("reads current v4 data (including practiceAttempts) straight through unchanged", () => {
    const v4 = {
      ...createEmptyProgress(),
      practiceAttempts: {
        "quantitative-aptitude": {
          bestScore: 30,
          bestTotal: 36,
          lastAttemptedAt: "2026-08-01T00:00:00.000Z",
          topicsNeedingReview: ["Percentages"],
        },
      },
    };
    window.localStorage.setItem(NEW_KEY, JSON.stringify(v4));

    const state = loadProgress();
    expect(state.practiceAttempts["quantitative-aptitude"]).toEqual(
      v4.practiceAttempts["quantitative-aptitude"],
    );
  });

  it("older/unversioned data reconstructs safely with an empty practiceAttempts map", () => {
    window.localStorage.setItem(NEW_KEY, JSON.stringify({ dailyGoalMinutes: 15 }));
    const state = loadProgress();
    expect(state.version).toBe(4);
    expect(state.practiceAttempts).toEqual({});
  });
});
