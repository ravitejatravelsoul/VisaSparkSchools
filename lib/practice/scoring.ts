import type { PracticeQuestion, PracticeScoreResult, TopicBreakdownEntry } from "./types";

/** A topic scoring below this accuracy on an attempt is flagged for review. */
export const REVIEW_THRESHOLD = 0.7;

/**
 * A tiny, deterministic PRNG (mulberry32) -- not cryptographic, not meant to
 * be. Its only job is making "shuffle this question order" reproducible from
 * a single numeric seed, so the same seed always produces the same order
 * (testable) and a session can be resumed/replayed without hydration
 * mismatches between server and client.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic Fisher-Yates shuffle: the same `seed` always yields the same order for the same input array. */
export function shuffleWithSeed<T>(items: readonly T[], seed: number): T[] {
  const result = [...items];
  const random = mulberry32(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Pure, deterministic scoring: the same (questions, answers) pair always
 * produces the same result, with no randomness, timers, or external state
 * involved -- this is the function `tests/unit/practice-scoring.test.ts`
 * exercises directly. `answers` maps a practice question id to the chosen
 * choice index; a question with no entry (skipped) counts as incorrect but
 * is never treated as a crash.
 */
export function scorePracticeSession(
  questions: readonly PracticeQuestion[],
  answers: Readonly<Record<string, number>>,
): PracticeScoreResult {
  const incorrectQuestionIds: string[] = [];
  const byTopic = new Map<string, { correct: number; total: number }>();

  let correct = 0;
  for (const question of questions) {
    const chosen = answers[question.id];
    const isCorrect = chosen === question.correctIndex;
    if (isCorrect) correct += 1;
    else incorrectQuestionIds.push(question.id);

    const bucket = byTopic.get(question.topic) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (isCorrect) bucket.correct += 1;
    byTopic.set(question.topic, bucket);
  }

  const topicBreakdown: TopicBreakdownEntry[] = Array.from(byTopic.entries()).map(
    ([topic, { correct: c, total }]) => ({ topic, correct: c, total }),
  );

  const topicsNeedingReview = topicBreakdown
    .filter((t) => t.total > 0 && t.correct / t.total < REVIEW_THRESHOLD)
    .map((t) => t.topic);

  return {
    correct,
    total: questions.length,
    incorrectQuestionIds,
    topicBreakdown,
    topicsNeedingReview,
  };
}

/** Selects just the questions whose id is in `ids`, preserving `ids`' order -- used to build a "retry incorrect" session. */
export function selectQuestionsByIds(
  bank: readonly PracticeQuestion[],
  ids: readonly string[],
): PracticeQuestion[] {
  const byId = new Map(bank.map((q) => [q.id, q]));
  return ids.map((id) => byId.get(id)).filter((q): q is PracticeQuestion => Boolean(q));
}
