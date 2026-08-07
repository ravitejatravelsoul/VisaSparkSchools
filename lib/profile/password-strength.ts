export type PasswordStrength = "too-short" | "weak" | "fair" | "good" | "strong";

const MIN_LENGTH = 8;

/**
 * A UX hint only -- never an enforcement gate. The only hard requirement is
 * the existing `minLength={8}` on the input; this just helps a learner pick
 * a stronger password than the bare minimum.
 */
export function estimatePasswordStrength(password: string): PasswordStrength {
  if (password.length < MIN_LENGTH) return "too-short";
  let variety = 0;
  if (/[a-z]/.test(password)) variety++;
  if (/[A-Z]/.test(password)) variety++;
  if (/[0-9]/.test(password)) variety++;
  if (/[^a-zA-Z0-9]/.test(password)) variety++;
  const longEnough = password.length >= 12;
  if (variety <= 1) return "weak";
  if (variety === 2) return "fair";
  if (variety >= 3 && !longEnough) return "good";
  return "strong";
}

export const PASSWORD_STRENGTH_LABEL: Record<PasswordStrength, string> = {
  "too-short": "Too short — use at least 8 characters",
  weak: "Weak — try adding numbers, symbols, or capital letters",
  fair: "Fair — a longer password or another character type would help",
  good: "Good",
  strong: "Strong",
};
