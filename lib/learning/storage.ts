import { createEmptyProgress, type ProgressState } from "@/lib/learning/types";

const STORAGE_KEY = "visasparkschools:progress";
/**
 * Storage key used before the CodeWise -> VisaSparkSchools rename. Guest
 * progress is a learner's real study history, so renaming the key must
 * never silently drop it: on first load under the new key we read this one,
 * migrate its contents forward, and copy them to the new key -- see
 * `loadProgress` below. The old key is deliberately left in place afterward
 * (not deleted) as a recoverable backup rather than removed immediately.
 */
const LEGACY_STORAGE_KEY = "codewise:progress";
const CURRENT_VERSION = 2;

function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * Loads guest progress from localStorage, migrating older versions forward.
 * Any parse failure or corruption falls back to a fresh, empty state rather
 * than crashing the app -- guest data is convenience, not a source of truth
 * we should ever let break page load.
 */
export function loadProgress(): ProgressState {
  if (!isBrowser()) return createEmptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return migrate(JSON.parse(raw));

    // Nothing under the new brand's key yet -- check for pre-rename progress
    // under the old CodeWise key so a rebrand never looks like data loss.
    const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      const migrated = migrate(JSON.parse(legacyRaw));
      saveProgress(migrated);
      return migrated;
    }

    return createEmptyProgress();
  } catch {
    return createEmptyProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can fail (quota, private browsing). Losing guest progress
    // persistence is not fatal -- the in-memory session still works.
  }
}

function migrate(parsed: unknown): ProgressState {
  const empty = createEmptyProgress();
  if (!parsed || typeof parsed !== "object") return empty;
  const data = parsed as Partial<ProgressState> & { version?: number };

  if (data.version === CURRENT_VERSION) {
    return { ...empty, ...data };
  }

  // version 1 -> 2: reviewQueue changed shape slightly; safest migration is
  // to keep everything that still matches and drop anything unrecognized.
  return {
    ...empty,
    lessonStatus: data.lessonStatus ?? {},
    exerciseAttempts: data.exerciseAttempts ?? {},
    quizResults: data.quizResults ?? {},
    skillMastery: data.skillMastery ?? {},
    bookmarks: data.bookmarks ?? [],
    notes: data.notes ?? {},
    dailyGoalMinutes: data.dailyGoalMinutes ?? 20,
    recentlyViewed: data.recentlyViewed ?? [],
    streak: data.streak ?? { current: 0, lastActiveDate: null },
    reviewQueue: {},
  };
}

/**
 * Merge guest progress into an authenticated account's progress the first
 * time a guest signs in. Non-destructive: for any given key, whichever side
 * has "more progress" wins per-field, and nothing is silently discarded.
 */
export function mergeProgress(local: ProgressState, remote: ProgressState): ProgressState {
  const merged = createEmptyProgress();

  const lessonIds = new Set([
    ...Object.keys(local.lessonStatus),
    ...Object.keys(remote.lessonStatus),
  ]);
  for (const id of lessonIds) {
    merged.lessonStatus[id] = pickBetterStatus(local.lessonStatus[id], remote.lessonStatus[id]);
  }

  const exerciseIds = new Set([
    ...Object.keys(local.exerciseAttempts),
    ...Object.keys(remote.exerciseAttempts),
  ]);
  for (const id of exerciseIds) {
    const a = local.exerciseAttempts[id];
    const b = remote.exerciseAttempts[id];
    if (a && b) {
      merged.exerciseAttempts[id] = {
        attempts: Math.max(a.attempts, b.attempts),
        completed: a.completed || b.completed,
        hintsUsed: Math.max(a.hintsUsed, b.hintsUsed),
      };
    } else {
      merged.exerciseAttempts[id] = a ?? b;
    }
  }

  const quizLessonIds = new Set([
    ...Object.keys(local.quizResults),
    ...Object.keys(remote.quizResults),
  ]);
  for (const id of quizLessonIds) {
    const a = local.quizResults[id];
    const b = remote.quizResults[id];
    if (!a) merged.quizResults[id] = b;
    else if (!b) merged.quizResults[id] = a;
    else merged.quizResults[id] = a.correct / a.total >= b.correct / b.total ? a : b;
  }

  merged.skillMastery = { ...local.skillMastery, ...remote.skillMastery };
  for (const skill of Object.keys(merged.skillMastery)) {
    merged.skillMastery[skill] = Math.max(
      local.skillMastery[skill] ?? 0,
      remote.skillMastery[skill] ?? 0,
    );
  }

  const reviewIds = new Set([
    ...Object.keys(local.reviewQueue),
    ...Object.keys(remote.reviewQueue),
  ]);
  for (const id of reviewIds) {
    const a = local.reviewQueue[id];
    const b = remote.reviewQueue[id];
    if (!a) merged.reviewQueue[id] = b;
    else if (!b) merged.reviewQueue[id] = a;
    else merged.reviewQueue[id] = new Date(a.dueAt) < new Date(b.dueAt) ? a : b;
  }

  merged.bookmarks = Array.from(new Set([...local.bookmarks, ...remote.bookmarks]));
  merged.notes = { ...remote.notes, ...local.notes }; // prefer local (most recently edited on this device)
  merged.streak = local.streak.current >= remote.streak.current ? local.streak : remote.streak;
  merged.dailyGoalMinutes = local.dailyGoalMinutes;
  merged.recentlyViewed = Array.from(
    new Set([...local.recentlyViewed, ...remote.recentlyViewed]),
  ).slice(0, 10);

  return merged;
}

function pickBetterStatus(
  a: ProgressState["lessonStatus"][string] | undefined,
  b: ProgressState["lessonStatus"][string] | undefined,
) {
  const rank = { "not-started": 0, "in-progress": 1, completed: 2 } as const;
  if (!a) return b!;
  if (!b) return a;
  return rank[a] >= rank[b] ? a : b;
}
