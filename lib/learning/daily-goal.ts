import { getLessonById } from "@/lib/content/registry";
import type { ProgressState } from "@/lib/learning/types";

/**
 * yyyy-mm-dd for a given instant, in a specific IANA timezone. Falls back to
 * UTC if the timezone string is invalid. A malformed/invalid `at` (e.g. from
 * a corrupted merge or hand-edited localStorage) returns a sentinel that can
 * never equal a real "today" key, rather than throwing -- both
 * `Intl.DateTimeFormat.format()` and `Date.prototype.toISOString()` throw a
 * RangeError on an invalid Date, so this must be checked before either is
 * called, not just wrapped in the same try/catch as the timezone fallback.
 */
export function localDateKey(at: Date, timezone: string | null): string {
  if (Number.isNaN(at.getTime())) return "invalid-date";
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: timezone ?? undefined }).format(at);
  } catch {
    return at.toISOString().slice(0, 10);
  }
}

export interface DailyGoalStatus {
  targetMinutes: number;
  minutesToday: number;
  met: boolean;
}

/**
 * Non-punitive, timezone-safe daily goal: "minutes learned today" is a real,
 * derived number (the sum of `estimatedMinutes` for lessons actually
 * completed today, per the activity log), not a fabricated timer. Missing a
 * day never erases anything -- there is no streak reset or history deletion
 * here; `lessonStatus` and `activity` are permanent, and yesterday simply
 * isn't "today" anymore.
 */
export function getDailyGoalStatus(
  state: ProgressState,
  now: Date = new Date(),
  timezone: string | null = state.profile.timezone,
): DailyGoalStatus {
  const today = localDateKey(now, timezone);
  const minutesToday = state.activity
    .filter(
      (event) =>
        event.type === "lesson-completed" && localDateKey(new Date(event.at), timezone) === today,
    )
    .reduce((total, event) => total + (getLessonById(event.refId)?.estimatedMinutes ?? 0), 0);

  return {
    targetMinutes: state.dailyGoalMinutes,
    minutesToday,
    met: minutesToday >= state.dailyGoalMinutes,
  };
}
