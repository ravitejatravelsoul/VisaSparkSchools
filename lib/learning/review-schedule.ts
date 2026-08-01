/**
 * Simple spaced-repetition schedule: 1, 3, 7, 14, 30 days. A "good" review
 * advances to the next interval; an "again" review resets to the first
 * interval WITHOUT erasing mastery or completion -- missing a review is a
 * scheduling nudge, not a punishment.
 */
export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30] as const;

export type ReviewResult = "again" | "good";

export function nextIntervalDays(currentIntervalDays: number, result: ReviewResult): number {
  if (result === "again") {
    return REVIEW_INTERVALS_DAYS[0];
  }
  const currentIndex = REVIEW_INTERVALS_DAYS.indexOf(
    currentIntervalDays as (typeof REVIEW_INTERVALS_DAYS)[number],
  );
  const nextIndex =
    currentIndex === -1 ? 0 : Math.min(currentIndex + 1, REVIEW_INTERVALS_DAYS.length - 1);
  return REVIEW_INTERVALS_DAYS[nextIndex];
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

export function isDue(dueAtIso: string, now: Date = new Date()): boolean {
  return new Date(dueAtIso).getTime() <= now.getTime();
}
