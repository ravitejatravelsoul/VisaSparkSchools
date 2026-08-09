/**
 * Builds the absolute `/auth/callback` URL a Supabase Auth email should
 * redirect to once the link is verified. Used for password recovery
 * (components/auth/auth-form.tsx) so the learner lands on the dedicated
 * password-completion step (`/update-password`) instead of the
 * signup-specific "You're verified!" page -- see app/auth/callback/route.ts's
 * type-aware redirect, which only takes this `next` destination when the
 * verified link's `type` is `recovery`.
 */
export function buildAuthCallbackUrl(origin: string, next: string): string {
  return `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
}
