import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/lib/supabase/types";
import { featureFlags } from "@/lib/site-config";

/**
 * Refreshes the Supabase auth session cookie on every request so a Server
 * Component's session (read via lib/supabase/server.ts#getSupabaseServerClient)
 * doesn't go stale -- that file's own `setAll` is a no-op during a Server
 * Component render (cookies can't be written there) and relies on this
 * middleware to do the actual refresh instead. A no-op when Supabase isn't
 * configured, same as every other Supabase touchpoint in this app.
 */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  if (!featureFlags.supabaseEnabled) return supabaseResponse;

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          supabaseResponse = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // Touching the session is what actually triggers a refresh when the
  // access token is stale -- required even though the return value here is
  // unused (getSupabaseServerClient reads the refreshed cookie afterward).
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Every route except static assets and image optimization files.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
