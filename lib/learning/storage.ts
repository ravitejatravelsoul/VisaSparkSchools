import {
  createEmptyProgress,
  type ProgressState,
  type NoteState,
  type EnrollmentState,
  type RoadmapProgressState,
  type ProjectProgressState,
  type ActivityEvent,
} from "@/lib/learning/types";

export const STORAGE_KEY = "visasparkschools:progress";

/**
 * Per-account local cache key -- keeps a signed-in user's synced state
 * separate from the shared guest key so that signing out (or switching to a
 * different account on the same device) can never surface another
 * account's data. See lib/sync/lifecycle.ts and components/auth/auth-provider.tsx.
 */
export function perUserStorageKey(userId: string): string {
  return `visasparkschools:progress:${userId}`;
}
/**
 * Storage key used before the CodeWise -> VisaSparkSchools rename. Guest
 * progress is a learner's real study history, so renaming the key must
 * never silently drop it: on first load under the new key we read this one,
 * migrate its contents forward, and copy them to the new key -- see
 * `loadProgress` below. The old key is deliberately left in place afterward
 * (not deleted) as a recoverable backup rather than removed immediately.
 */
const LEGACY_STORAGE_KEY = "codewise:progress";
const CURRENT_VERSION = 3;

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
  return loadProgressFrom(STORAGE_KEY);
}

/**
 * Same loader, parameterized by storage key -- used to read the
 * per-account local cache (`visasparkschools:progress:<userId>`) that keeps
 * a signed-in user's synced state separate from the shared guest key. See
 * lib/sync/lifecycle.ts for why this separation matters for privacy.
 */
export function loadProgressFrom(key: string): ProgressState {
  if (!isBrowser()) return createEmptyProgress();
  try {
    const raw = window.localStorage.getItem(key);
    if (raw) return migrate(JSON.parse(raw));

    if (key === STORAGE_KEY) {
      // Nothing under the new brand's key yet -- check for pre-rename
      // progress under the old CodeWise key so a rebrand never looks like
      // data loss.
      const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        const migrated = migrate(JSON.parse(legacyRaw));
        saveProgress(migrated);
        return migrated;
      }
    }

    return createEmptyProgress();
  } catch {
    return createEmptyProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  saveProgressTo(STORAGE_KEY, state);
}

export function saveProgressTo(key: string, state: ProgressState): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Storage can fail (quota, private browsing). Losing guest progress
    // persistence is not fatal -- the in-memory session still works.
  }
}

/** Removes a stored progress cache entirely (used when clearing the guest key after it's been folded into an account). */
export function clearProgressAt(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function migrateNotes(rawNotes: unknown): Record<string, NoteState> {
  if (!rawNotes || typeof rawNotes !== "object") return {};
  const result: Record<string, NoteState> = {};
  const now = new Date(0).toISOString(); // unknown edit time for pre-v3 notes -- treat as oldest possible
  for (const [lessonId, value] of Object.entries(rawNotes as Record<string, unknown>)) {
    if (typeof value === "string") {
      if (value.trim().length > 0) result[lessonId] = { text: value, updatedAt: now };
    } else if (value && typeof value === "object" && "text" in value) {
      result[lessonId] = value as NoteState;
    }
  }
  return result;
}

function migrate(parsed: unknown): ProgressState {
  const empty = createEmptyProgress();
  if (!parsed || typeof parsed !== "object") return empty;
  const data = parsed as Partial<ProgressState> &
    Record<string, unknown> & { version?: number; notes?: unknown };

  if (data.version === CURRENT_VERSION) {
    return {
      ...empty,
      ...data,
      notes: migrateNotes(data.notes),
      profile: { ...empty.profile, ...(data.profile as object | undefined) },
    } as ProgressState;
  }

  // Any older version (1, 2, or missing): reconstruct a safe v3 shape,
  // keeping every field that still matches and defaulting the rest --
  // never crash or drop unrelated data just because one shape changed.
  return {
    ...empty,
    lessonStatus: (data.lessonStatus as ProgressState["lessonStatus"]) ?? {},
    exerciseAttempts: (data.exerciseAttempts as ProgressState["exerciseAttempts"]) ?? {},
    quizResults: (data.quizResults as ProgressState["quizResults"]) ?? {},
    skillMastery: (data.skillMastery as ProgressState["skillMastery"]) ?? {},
    bookmarks: (data.bookmarks as string[]) ?? [],
    notes: migrateNotes(data.notes),
    dailyGoalMinutes: (data.dailyGoalMinutes as number) ?? 20,
    recentlyViewed: (data.recentlyViewed as string[]) ?? [],
    streak: (data.streak as ProgressState["streak"]) ?? { current: 0, lastActiveDate: null },
    // reviewQueue's shape changed between v1 and v2 -- safest migration for
    // that jump is to drop it and let the schedule rebuild from here.
    reviewQueue:
      data.version === 2 ? ((data.reviewQueue as ProgressState["reviewQueue"]) ?? {}) : {},
    enrollments: {},
    roadmapProgress: {},
    projectProgress: {},
    activity: [],
  };
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

function mergeNote(a: NoteState | undefined, b: NoteState | undefined): NoteState | undefined {
  if (!a) return b;
  if (!b) return a;
  if (a.text === b.text) return a.updatedAt >= b.updatedAt ? a : b;
  // Genuine conflict: both sides edited this lesson's note to different
  // text. Never silently pick one and discard the other -- the more
  // recently edited text wins as the primary value, and the older one is
  // preserved under `conflict` so the learner can review/restore it
  // (see components/lesson/notes-panel.tsx).
  const [winner, loser] = a.updatedAt >= b.updatedAt ? [a, b] : [b, a];
  return {
    text: winner.text,
    updatedAt: winner.updatedAt,
    conflict: { text: loser.text, updatedAt: loser.updatedAt },
  };
}

function mergeEnrollment(
  a: EnrollmentState | undefined,
  b: EnrollmentState | undefined,
): EnrollmentState {
  if (!a) return b!;
  if (!b) return a;
  const useB = (b.lastAccessedAt ?? "") > (a.lastAccessedAt ?? "");
  return {
    enrolledAt: a.enrolledAt <= b.enrolledAt ? a.enrolledAt : b.enrolledAt,
    lastAccessedLessonId: useB ? b.lastAccessedLessonId : a.lastAccessedLessonId,
    lastAccessedAt: useB ? b.lastAccessedAt : a.lastAccessedAt,
  };
}

function mergeRoadmapProgress(
  a: RoadmapProgressState | undefined,
  b: RoadmapProgressState | undefined,
): RoadmapProgressState {
  if (!a) return b!;
  if (!b) return a;
  return {
    startedAt: a.startedAt <= b.startedAt ? a.startedAt : b.startedAt,
    lastAccessedAt: a.lastAccessedAt >= b.lastAccessedAt ? a.lastAccessedAt : b.lastAccessedAt,
    completedStepIds: Array.from(new Set([...a.completedStepIds, ...b.completedStepIds])),
  };
}

function mergeProjectProgress(
  a: ProjectProgressState | undefined,
  b: ProjectProgressState | undefined,
): ProjectProgressState {
  if (!a) return b!;
  if (!b) return a;
  return {
    startedAt: a.startedAt <= b.startedAt ? a.startedAt : b.startedAt,
    completedMilestoneIds: Array.from(
      new Set([...a.completedMilestoneIds, ...b.completedMilestoneIds]),
    ),
  };
}

function mergeActivity(a: ActivityEvent[], b: ActivityEvent[]): ActivityEvent[] {
  const byId = new Map<string, ActivityEvent>();
  for (const event of [...a, ...b]) {
    const existing = byId.get(event.id);
    if (!existing || event.at < existing.at) byId.set(event.id, event);
  }
  return Array.from(byId.values())
    .sort((x, y) => (x.at < y.at ? 1 : -1))
    .slice(0, 50);
}

/**
 * Merge guest progress into an authenticated account's progress the first
 * time a guest signs in (and on every subsequent sign-in, since it's safe
 * to re-run: union/max/latest-wins operations are idempotent). Non-
 * destructive: for any given key, whichever side has "more progress" wins
 * per-field, and nothing is silently discarded.
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

  const noteIds = new Set([...Object.keys(local.notes), ...Object.keys(remote.notes)]);
  for (const id of noteIds) {
    const note = mergeNote(local.notes[id], remote.notes[id]);
    if (note) merged.notes[id] = note;
  }

  merged.streak = local.streak.current >= remote.streak.current ? local.streak : remote.streak;
  merged.dailyGoalMinutes = local.dailyGoalMinutes;
  merged.recentlyViewed = Array.from(
    new Set([...local.recentlyViewed, ...remote.recentlyViewed]),
  ).slice(0, 10);

  const courseIds = new Set([
    ...Object.keys(local.enrollments),
    ...Object.keys(remote.enrollments),
  ]);
  for (const id of courseIds) {
    merged.enrollments[id] = mergeEnrollment(local.enrollments[id], remote.enrollments[id]);
  }

  const pathIds = new Set([
    ...Object.keys(local.roadmapProgress),
    ...Object.keys(remote.roadmapProgress),
  ]);
  for (const id of pathIds) {
    merged.roadmapProgress[id] = mergeRoadmapProgress(
      local.roadmapProgress[id],
      remote.roadmapProgress[id],
    );
  }

  const projectIds = new Set([
    ...Object.keys(local.projectProgress),
    ...Object.keys(remote.projectProgress),
  ]);
  for (const id of projectIds) {
    merged.projectProgress[id] = mergeProjectProgress(
      local.projectProgress[id],
      remote.projectProgress[id],
    );
  }

  merged.activity = mergeActivity(local.activity, remote.activity);

  // Preferences: last-write-wins as a whole object, using the explicit
  // `updatedAt` stamp each `setProfile` call sets -- avoids stitching
  // together fields edited on different devices into a combination the
  // learner never actually chose. Exception: a profile row with every field
  // still null (e.g. the empty row Supabase's `handle_new_user` trigger
  // creates at sign-up, timestamped "now" regardless of whether the learner
  // ever touched it) must never outrank a side that actually has real
  // preferences set, no matter which `updatedAt` is newer -- otherwise
  // signing up right after setting a guest preference would silently erase it.
  if (isEmptyProfile(remote.profile) && !isEmptyProfile(local.profile)) {
    merged.profile = local.profile;
  } else if (isEmptyProfile(local.profile) && !isEmptyProfile(remote.profile)) {
    merged.profile = remote.profile;
  } else {
    merged.profile =
      local.profile.updatedAt >= remote.profile.updatedAt ? local.profile : remote.profile;
  }

  return merged;
}

function isEmptyProfile(profile: ProgressState["profile"]): boolean {
  return (
    profile.displayName === null &&
    profile.learningGoal === null &&
    profile.currentRoadmapId === null &&
    profile.timezone === null
  );
}
