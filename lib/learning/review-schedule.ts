/**
 * Simple spaced-repetition schedule: 1, 3, 7, 14, 30 days. A "good" review
 * advances to the next interval; an "again" review resets to the first
 * interval WITHOUT erasing mastery or completion -- missing a review is a
 * scheduling nudge, not a punishment.
 */
export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30] as const;

/**
 * Phase 7 extends the original two-button "again"/"good" rating (still
 * fully supported -- the dashboard's existing "Due for review" section
 * calls this unchanged) with Anki-style "hard" and "easy": hard repeats the
 * current interval instead of resetting it to the first day, and easy
 * skips ahead an extra step. This is a strict extension of the type (a
 * union widened, not narrowed), so every existing caller passing "again" or
 * "good" keeps compiling and behaving exactly as before.
 */
export type ReviewResult = "again" | "hard" | "good" | "easy";

export function nextIntervalDays(currentIntervalDays: number, result: ReviewResult): number {
  const currentIndex = REVIEW_INTERVALS_DAYS.indexOf(
    currentIntervalDays as (typeof REVIEW_INTERVALS_DAYS)[number],
  );
  const lastIndex = REVIEW_INTERVALS_DAYS.length - 1;
  switch (result) {
    case "again":
      return REVIEW_INTERVALS_DAYS[0];
    case "hard":
      return REVIEW_INTERVALS_DAYS[Math.max(0, currentIndex)];
    case "good": {
      const nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, lastIndex);
      return REVIEW_INTERVALS_DAYS[nextIndex];
    }
    case "easy": {
      const nextIndex = currentIndex === -1 ? 1 : Math.min(currentIndex + 2, lastIndex);
      return REVIEW_INTERVALS_DAYS[nextIndex];
    }
  }
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

export function isDue(dueAtIso: string, now: Date = new Date()): boolean {
  return new Date(dueAtIso).getTime() <= now.getTime();
}
