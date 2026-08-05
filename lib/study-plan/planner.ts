/**
 * Deterministic study-plan scheduling (Phase 7). Pure functions only -- no
 * registry imports, no Date.now(), no randomness -- everything takes plain
 * data and a reference date/time as arguments, so the same inputs always
 * produce the same schedule and every rule here is directly unit-testable.
 * `lib/learning/store.ts` is the only place that connects this to real
 * lesson/course data and today's actual date.
 */
import type { LessonStatus } from "@/lib/learning/types";

/** dateKey (yyyy-mm-dd) -> lesson ids scheduled that day, in order. */
export type StudySchedule = Record<string, string[]>;

export interface PlannerInput {
  /** Ordered list of lesson ids to schedule (already filtered to whatever should be included). */
  lessonIds: string[];
  /** yyyy-mm-dd; the earliest day any lesson can be scheduled on. */
  startDate: string;
  /** 0 (Sunday) - 6 (Saturday); which days of the week the learner studies. */
  preferredDaysOfWeek: number[];
  /** Minutes budget per study day. */
  minutesPerSession: number;
}

/** Safety valve against an unbounded loop if preferredDaysOfWeek or lessonIds is malformed -- roughly 10 years of days. */
const MAX_DAYS_TO_SCAN = 3650;

export function parseDateKey(key: string): Date {
  return new Date(`${key}T00:00:00.000Z`);
}

export function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addOneDayUTC(date: Date): Date {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + 1);
  return next;
}

/**
 * Greedily packs `lessonIds` onto preferred days of the week starting at
 * `startDate`, filling each day up to `minutesPerSession` (a lesson with no
 * known duration counts as 0 minutes). A single lesson longer than the
 * whole session budget still gets its own day rather than being permanently
 * unplaceable -- every day always gets at least one lesson before the
 * budget check applies.
 */
export function buildSchedule(
  input: PlannerInput,
  lessonMinutesById: Record<string, number>,
): StudySchedule {
  const schedule: StudySchedule = {};
  if (input.lessonIds.length === 0 || input.preferredDaysOfWeek.length === 0) return schedule;

  let cursor = parseDateKey(input.startDate);
  let lessonIndex = 0;
  let daysScanned = 0;

  while (lessonIndex < input.lessonIds.length && daysScanned < MAX_DAYS_TO_SCAN) {
    daysScanned += 1;
    if (input.preferredDaysOfWeek.includes(cursor.getUTCDay())) {
      const dayLessons: string[] = [];
      let minutesUsed = 0;
      while (lessonIndex < input.lessonIds.length) {
        const lessonId = input.lessonIds[lessonIndex];
        const minutes = lessonMinutesById[lessonId] ?? 0;
        if (dayLessons.length > 0 && minutesUsed + minutes > input.minutesPerSession) break;
        dayLessons.push(lessonId);
        minutesUsed += minutes;
        lessonIndex += 1;
      }
      if (dayLessons.length > 0) schedule[toDateKey(cursor)] = dayLessons;
    }
    cursor = addOneDayUTC(cursor);
  }

  return schedule;
}

/** The last (latest) scheduled date, or null for an empty schedule -- dateKeys sort lexicographically = chronologically. */
export function estimateCompletionDate(schedule: StudySchedule): string | null {
  const keys = Object.keys(schedule);
  if (keys.length === 0) return null;
  return keys.sort().at(-1)!;
}

/**
 * An open-ended plan (no target) is always "realistic" -- there is nothing
 * to miss. An empty schedule (e.g. every lesson already complete) is also
 * trivially realistic, not a warning-worthy state.
 */
export function isTargetRealistic(
  estimatedCompletionDate: string | null,
  targetDate: string | null,
): boolean {
  if (!targetDate) return true;
  if (!estimatedCompletionDate) return true;
  return estimatedCompletionDate <= targetDate;
}

/**
 * Rebalances a schedule around `today` without ever marking anything
 * complete: every already-completed lesson keeps its original historical
 * date (real history is never rewritten), and every other scheduled lesson
 * -- whether it's overdue (a past date, still incomplete) or simply upcoming
 * -- is collected and rebuilt into a fresh schedule starting today, using
 * the same greedy day-packing as `buildSchedule`. This is what lets missed
 * days get folded back in around the learner's real pace instead of
 * silently piling up on the original date forever.
 */
export function rebalanceSchedule(
  schedule: StudySchedule,
  lessonStatus: Record<string, LessonStatus>,
  today: string,
  preferredDaysOfWeek: number[],
  minutesPerSession: number,
  lessonMinutesById: Record<string, number>,
): StudySchedule {
  const kept: StudySchedule = {};
  const toReschedule: string[] = [];

  for (const dateKey of Object.keys(schedule).sort()) {
    const lessonIds = schedule[dateKey];
    if (dateKey < today) {
      const keptToday = lessonIds.filter((id) => lessonStatus[id] === "completed");
      const overdue = lessonIds.filter((id) => lessonStatus[id] !== "completed");
      if (keptToday.length > 0) kept[dateKey] = keptToday;
      toReschedule.push(...overdue);
    } else {
      toReschedule.push(...lessonIds);
    }
  }

  if (toReschedule.length === 0) return kept;

  const rebuilt = buildSchedule(
    { lessonIds: toReschedule, startDate: today, preferredDaysOfWeek, minutesPerSession },
    lessonMinutesById,
  );

  return { ...kept, ...rebuilt };
}

/** Every lesson id currently scheduled anywhere in the plan, in schedule order. */
export function scheduledLessonIds(schedule: StudySchedule): string[] {
  return Object.keys(schedule)
    .sort()
    .flatMap((date) => schedule[date]);
}
