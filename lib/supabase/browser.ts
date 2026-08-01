"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";
import { featureFlags } from "@/lib/site-config";

let cachedClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

/** Returns null when Supabase isn't configured -- callers must handle that (demo/guest mode). */
export function getSupabaseBrowserClient() {
  if (!featureFlags.supabaseEnabled) return null;
  if (!cachedClient) {
    cachedClient = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return cachedClient;
}
