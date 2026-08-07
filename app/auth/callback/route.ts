import { type NextRequest, NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { featureFlags } from "@/lib/site-config";
import { safeRedirectPath } from "@/lib/auth/safe-redirect";

/**
 * Handles every Supabase email link this app sends (sign-up confirmation,
 * password recovery, email change) via the `token_hash`+`type` verify
 * pattern -- see docs/product-expansion/RELEASE_CONFIGURATION.md for the
 * exact email-template link this route expects:
 * `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email&next=/dashboard`.
 *
 * On success, the verified session is established via cookies (the same
 * `@supabase/ssr` cookie-backed session the browser client and middleware
 * already share -- see lib/supabase/server.ts), then redirects to
 * `/welcome`, which shows the explicit "you're verified" state and hands
 * off to `next`. The guest-to-account merge itself needs no new code here:
 * it's already triggered exactly once by AuthProvider's onAuthStateChange
 * listener (lib/sync/orchestrator.ts's generation-guarded handleSignedIn)
 * as soon as the browser picks up this now-valid session on its next
 * render -- this route only needs to make that session valid.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeRedirectPath(searchParams.get("next"));

  if (!featureFlags.supabaseEnabled) {
    return NextResponse.redirect(`${origin}/sign-in`);
  }

  if (tokenHash && type) {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      return NextResponse.redirect(`${origin}/welcome?next=${encodeURIComponent(next)}`);
    }
  }

  return NextResponse.redirect(`${origin}/sign-in?confirmation=error`);
}
