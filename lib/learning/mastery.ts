/**
 * Deterministic, documented mastery model (0-100 per skill tag). This is a
 * transparent point formula, not a machine-learned model -- easy to explain
 * to a learner and to test.
 *
 * Per-lesson contribution to each of its tagged skills:
 *   +40  lesson marked completed
 *   +15  guided exercise solved
 *   +20  independent exercise solved
 *   +25 * quiz accuracy (correct / total)
 *   -2 per hint used across both exercises, capped at -10
 * Clamped to [0, 100].
 *
 * A learner's mastery for a skill is the average of that skill's per-lesson
 * contributions across every lesson tagged with that skill which the learner
 * has touched at all (appears in lessonStatus). Untouched lessons don't drag
 * the average down -- mastery reflects lessons attempted, not the whole track.
 */
export interface LessonMasteryInputs {
  lessonCompleted: boolean;
  guidedExerciseSolved: boolean;
  independentExerciseSolved: boolean;
  quizCorrect: number;
  quizTotal: number;
  hintsUsed: number;
}

export function calculateLessonMasteryContribution(inputs: LessonMasteryInputs): number {
  let score = 0;
  if (inputs.lessonCompleted) score += 40;
  if (inputs.guidedExerciseSolved) score += 15;
  if (inputs.independentExerciseSolved) score += 20;
  if (inputs.quizTotal > 0) {
    score += 25 * (inputs.quizCorrect / inputs.quizTotal);
  }
  const hintPenalty = Math.min(10, inputs.hintsUsed * 2);
  score -= hintPenalty;
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function averageMastery(contributions: number[]): number {
  if (contributions.length === 0) return 0;
  const sum = contributions.reduce((total, value) => total + value, 0);
  return Math.round(sum / contributions.length);
}
