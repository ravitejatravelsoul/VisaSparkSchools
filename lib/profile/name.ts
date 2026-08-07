const MAX_NAME_LENGTH = 80;

/**
 * Trims and collapses internal whitespace, without restricting to the
 * English alphabet -- legitimate names use Unicode letters, spaces,
 * hyphens, and apostrophes (e.g. "María José", "Nguyễn Văn An",
 * "O'Brien-Smith"). The database column enforces the same 80-character cap
 * (see migration 0007) so this normalizer's cap can never silently diverge
 * from what will actually be stored.
 */
export function normalizeName(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, MAX_NAME_LENGTH);
}

export interface NameValidationResult {
  valid: boolean;
  error?: string;
}

/** A name field just needs *something* after normalization -- no alphabet/script restriction. */
export function validateName(raw: string, fieldLabel: string): NameValidationResult {
  const normalized = normalizeName(raw);
  if (normalized.length === 0) {
    return { valid: false, error: `${fieldLabel} is required.` };
  }
  return { valid: true };
}

export { MAX_NAME_LENGTH };
