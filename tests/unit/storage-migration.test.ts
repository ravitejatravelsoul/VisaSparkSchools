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
