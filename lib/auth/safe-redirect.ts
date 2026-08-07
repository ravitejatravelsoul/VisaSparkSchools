/**
 * Guards the `next=` destination carried through sign-up/confirmation/
 * sign-in redirects against becoming an open-redirect vector. Only a
 * same-origin, absolute internal path is ever allowed -- anything else
 * (a protocol-relative `//evil.com`, a full `https://` URL, a
 * javascript:/data: scheme, or a value that isn't even a string) falls back
 * to the safe default.
 */
export function safeRedirectPath(raw: string | null | undefined, fallback = "/dashboard"): string {
  if (!raw) return fallback;
  if (!raw.startsWith("/")) return fallback;
  if (raw.startsWith("//")) return fallback;
  if (raw.includes("://")) return fallback;
  // Reject any embedded control characters or backslashes some browsers
  // normalize into a scheme-relative URL.
  if (/[\s\\]/.test(raw)) return fallback;
  return raw;
}
