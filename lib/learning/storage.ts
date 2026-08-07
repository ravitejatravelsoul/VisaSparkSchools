import {
  createEmptyProgress,
  type ProgressState,
  type NoteState,
  type EnrollmentState,
  type RoadmapProgressState,
  type ProjectProgressState,
  type PracticeAttemptState,
  type StudyPlanState,
  type FocusSessionState,
  type ActivityEvent,
  type CertificateState,
} from "@/lib/learning/types";

/** focusMinutesByDate keeps at most this many most-recent days -- bounded history, never unbounded. */
const FOCUS_MINUTES_RETENTION_DAYS = 90;

/** Drops any focusMinutesByDate entry older than the retention window, relative to `now`. */
export function pruneFocusMinutes(
  minutesByDate: Record<string, number>,
  now: Date = new Date(),
): Record<string, number> {
  const cutoff = new Date(now.getTime());
  cutoff.setDate(cutoff.getDate() - FOCUS_MINUTES_RETENTION_DAYS);
  const cutoffKey = cutoff.toISOString().slice(0, 10);
  const result: Record<string, number> = {};
  for (const [date, minutes] of Object.entries(minutesByDate)) {
    if (date >= cutoffKey) result[date] = minutes;
  }
  return result;
}

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
 * Tiny, synchronously-readable pointer to the most recently signed-in
 * account on this device. The progress store's very first hydration runs
 * before Supabase's async auth check resolves (see lib/learning/store.ts'
 * module-scope `activeStorageKey` init), so without this pointer that first
 * hydration always defaults to the shared guest key -- which is empty (or
 * gone) for a returning signed-in learner, since it's cleared once their
 * data is safely folded into their per-account key. That produced a real
 * flash of empty progress (and a snapshot the sync lifecycle could echo
 * back) on every single page load for a signed-in learner, not just the
 * first one. Written on a successful sync, cleared on sign-out -- see
 * lib/sync/orchestrator.ts.
 */
const LAST_USER_ID_KEY = "visasparkschools:last-user-id";

export function getLastUserId(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(LAST_USER_ID_KEY);
}

export function setLastUserId(userId: string | null) {
  if (!isBrowser()) return;
  if (userId) window.localStorage.setItem(LAST_USER_ID_KEY, userId);
  else window.localStorage.removeItem(LAST_USER_ID_KEY);
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
const CURRENT_VERSION = 6;

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
      practiceAttempts: (data.practiceAttempts as ProgressState["practiceAttempts"]) ?? {},
      studyPlans: (data.studyPlans as ProgressState["studyPlans"]) ?? {},
      activeFocusSession: (data.activeFocusSession as ProgressState["activeFocusSession"]) ?? null,
      focusMinutesByDate: pruneFocusMinutes(
        (data.focusMinutesByDate as ProgressState["focusMinutesByDate"]) ?? {},
      ),
      todayDismissed: (data.todayDismissed as ProgressState["todayDismissed"]) ?? {
        date: "",
        itemIds: [],
      },
      profile: { ...empty.profile, ...(data.profile as object | undefined) },
      certificates: (data.certificates as ProgressState["certificates"]) ?? {},
    } as ProgressState;
  }

  // v5 -> v6 (Phase 8 + Phase 9): every field already matches the current
  // shape except `certificates`, which didn't exist yet. Phase 8 (Tools Hub,
  // Project Studio) added no new persisted fields at all -- it reuses
  // projectProgress/notes/bookmarks unchanged -- so v5 is exactly v6 minus
  // certificates.
  if (data.version === 5) {
    return {
      ...empty,
      ...data,
      version: CURRENT_VERSION,
      notes: migrateNotes(data.notes),
      practiceAttempts: (data.practiceAttempts as ProgressState["practiceAttempts"]) ?? {},
      studyPlans: (data.studyPlans as ProgressState["studyPlans"]) ?? {},
      activeFocusSession: (data.activeFocusSession as ProgressState["activeFocusSession"]) ?? null,
      focusMinutesByDate: pruneFocusMinutes(
        (data.focusMinutesByDate as ProgressState["focusMinutesByDate"]) ?? {},
      ),
      todayDismissed: (data.todayDismissed as ProgressState["todayDismissed"]) ?? {
        date: "",
        itemIds: [],
      },
      profile: { ...empty.profile, ...(data.profile as object | undefined) },
      certificates: {},
    } as ProgressState;
  }

  // v4 -> v6: every field already matches the current shape except the
  // Study Studio fields (Phase 7) and certificates (Phase 9), none of which
  // existed yet -- keep everything else exactly as v4's own "current
  // version" branch would have.
  if (data.version === 4) {
    return {
      ...empty,
      ...data,
      version: CURRENT_VERSION,
      notes: migrateNotes(data.notes),
      practiceAttempts: (data.practiceAttempts as ProgressState["practiceAttempts"]) ?? {},
      studyPlans: {},
      activeFocusSession: null,
      focusMinutesByDate: {},
      todayDismissed: { date: "", itemIds: [] },
      profile: { ...empty.profile, ...(data.profile as object | undefined) },
      certificates: {},
    } as ProgressState;
  }

  // v3 -> v6 (Phase 6, 7, and 9 fields all missing): every field already
  // matches the current shape except practiceAttempts, the Study Studio
  // fields, and certificates, none of which existed yet -- keep everything
  // else exactly as v3's own "current version" branch would have.
  if (data.version === 3) {
    return {
      ...empty,
      ...data,
      version: CURRENT_VERSION,
      notes: migrateNotes(data.notes),
      practiceAttempts: {},
      studyPlans: {},
      activeFocusSession: null,
      focusMinutesByDate: {},
      todayDismissed: { date: "", itemIds: [] },
      profile: { ...empty.profile, ...(data.profile as object | undefined) },
      certificates: {},
    } as ProgressState;
  }

  // Any older version (1, 2, or missing): reconstruct a safe v6 shape,
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
    practiceAttempts: {},
    studyPlans: {},
    activeFocusSession: null,
    focusMinutesByDate: {},
    todayDismissed: { date: "", itemIds: [] },
    activity: [],
    certificates: {},
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

/**
 * Best score wins by accuracy (matching mergeProgress's quizResults rule
 * below); topicsNeedingReview is a union rather than picking one side's list
 * wholesale, since a topic either side found weak is still worth reviewing.
 */
function mergePracticeAttempt(
  a: PracticeAttemptState | undefined,
  b: PracticeAttemptState | undefined,
): PracticeAttemptState {
  if (!a) return b!;
  if (!b) return a;
  const aAccuracy = a.bestTotal > 0 ? a.bestScore / a.bestTotal : 0;
  const bAccuracy = b.bestTotal > 0 ? b.bestScore / b.bestTotal : 0;
  const best = aAccuracy >= bAccuracy ? a : b;
  return {
    bestScore: best.bestScore,
    bestTotal: best.bestTotal,
    lastAttemptedAt: a.lastAttemptedAt >= b.lastAttemptedAt ? a.lastAttemptedAt : b.lastAttemptedAt,
    topicsNeedingReview: Array.from(new Set([...a.topicsNeedingReview, ...b.topicsNeedingReview])),
  };
}

/**
 * A study plan is a coherent object (schedule + settings edited together as
 * a unit), so it's merged whole via last-write-wins on `updatedAt` -- like
 * `profile` below -- rather than stitching individual fields from each side,
 * which could produce a schedule that doesn't match either side's settings.
 */
function mergeStudyPlan(
  a: StudyPlanState | undefined,
  b: StudyPlanState | undefined,
): StudyPlanState {
  if (!a) return b!;
  if (!b) return a;
  return a.updatedAt >= b.updatedAt ? a : b;
}

/**
 * At most one active focus session can exist at a time, so a genuine
 * conflict (two devices both mid-session) is resolved by keeping whichever
 * started more recently -- focus sessions are ephemeral working state, not
 * permanent history, so this is a reasonable, low-stakes tiebreak rather
 * than something requiring a conflict UI like notes get.
 */
function mergeActiveFocusSession(
  a: FocusSessionState | null,
  b: FocusSessionState | null,
): FocusSessionState | null {
  if (!a) return b;
  if (!b) return a;
  return a.startedAt >= b.startedAt ? a : b;
}

/**
 * Per-date minutes are merged by MAX, not sum, deliberately: `mergeProgress`
 * must be safe to re-run (see the module doc below), and summing two values
 * that already include a prior merge's result would double-count on every
 * subsequent merge. This undercounts genuine same-day study split across two
 * devices, but stays correct under repeated merges -- the same tradeoff
 * `quizResults`/`practiceAttempts` already make with best-of instead of sum.
 */
function mergeFocusMinutesByDate(
  a: Record<string, number>,
  b: Record<string, number>,
): Record<string, number> {
  const merged: Record<string, number> = { ...a };
  for (const [date, minutes] of Object.entries(b)) {
    merged[date] = Math.max(merged[date] ?? 0, minutes);
  }
  return pruneFocusMinutes(merged);
}

/**
 * Certificates are immutable once issued and keyed by a deterministic id
 * (`${type}:${targetId}`), so a genuine id collision only happens if the
 * *same* certificate was independently issued on two devices before they
 * ever synced (each with its own random `verificationCode`). Keep whichever
 * side issued first -- this is what "cannot create duplicates through
 * refresh or multiple tabs" actually requires: exactly one canonical record
 * per id, chosen deterministically, never a coin-flip.
 */
function mergeCertificates(
  a: Record<string, CertificateState>,
  b: Record<string, CertificateState>,
): Record<string, CertificateState> {
  const merged: Record<string, CertificateState> = { ...a };
  for (const [id, cert] of Object.entries(b)) {
    const existing = merged[id];
    merged[id] = !existing || cert.issuedAt < existing.issuedAt ? cert : existing;
  }
  return merged;
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

  const practiceCourseIds = new Set([
    ...Object.keys(local.practiceAttempts),
    ...Object.keys(remote.practiceAttempts),
  ]);
  for (const id of practiceCourseIds) {
    merged.practiceAttempts[id] = mergePracticeAttempt(
      local.practiceAttempts[id],
      remote.practiceAttempts[id],
    );
  }

  const planIds = new Set([...Object.keys(local.studyPlans), ...Object.keys(remote.studyPlans)]);
  for (const id of planIds) {
    merged.studyPlans[id] = mergeStudyPlan(local.studyPlans[id], remote.studyPlans[id]);
  }

  merged.activeFocusSession = mergeActiveFocusSession(
    local.activeFocusSession,
    remote.activeFocusSession,
  );

  merged.focusMinutesByDate = mergeFocusMinutesByDate(
    local.focusMinutesByDate,
    remote.focusMinutesByDate,
  );

  // Session/device-local UI preference, not meaningful data to merge across
  // devices -- same rationale as `dailyGoalMinutes` above.
  merged.todayDismissed = local.todayDismissed;

  merged.activity = mergeActivity(local.activity, remote.activity);

  merged.certificates = mergeCertificates(local.certificates, remote.certificates);

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
    profile.timezone === null &&
    profile.firstName === null &&
    profile.lastName === null &&
    profile.phoneE164 === null &&
    profile.learnerLevel === null
  );
}
