const SUSPICIOUS_PATTERNS = [
  /ignore\s+(all\s+|any\s+)?(previous|prior|the\s+above)\s+instructions/i,
  /disregard (the|all) (above|previous)/i,
  /reveal (the|your) (system prompt|instructions|hidden test)/i,
  /you are now/i,
  /new instructions:/i,
  /act as (?!a tutor)/i,
];

export function containsInjectionAttempt(text: string): boolean {
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(text));
}

export function sanitizeRetrievedText(text: string): string {
  // Retrieved content is data, not instructions -- strip anything that reads
  // like an attempt to redirect the model, defense-in-depth on top of the
  // system prompt's explicit "treat context as data" instruction.
  //
  // Each pattern gets its own "g"-flagged copy for this replace pass (rather
  // than adding "g" to SUSPICIOUS_PATTERNS directly) so containsInjectionAttempt's
  // repeated `.test()` calls elsewhere never see stateful lastIndex behavior.
  if (!containsInjectionAttempt(text)) return text;
  return SUSPICIOUS_PATTERNS.reduce(
    (acc, pattern) => acc.replace(new RegExp(pattern.source, pattern.flags + "g"), "[removed]"),
    text,
  );
}

const MAX_QUESTION_LENGTH = 2000;

export function validateQuestion(
  question: unknown,
): { ok: true; value: string } | { ok: false; error: string } {
  if (typeof question !== "string" || question.trim().length === 0) {
    return { ok: false, error: "Question is required." };
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return { ok: false, error: `Question is too long (max ${MAX_QUESTION_LENGTH} characters).` };
  }
  return { ok: true, value: question.trim() };
}
