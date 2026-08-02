import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import { mergeProgress } from "@/lib/learning/storage";
import type { ProgressState } from "@/lib/learning/types";
import { pullProgress } from "@/lib/sync/pull";
import { pushProgress } from "@/lib/sync/push";

type Client = SupabaseClient<Database>;

/**
 * The guest-to-account sync lifecycle, steps 3-5 of the 11-step flow (see
 * PROJECT_STATUS.md's Phase 4 section for the full list): load remote,
 * deterministically merge with the snapshot the caller took *before*
 * signing in, and persist the merged result back. Pure aside from the two
 * network calls -- no localStorage or Zustand access here, so it's directly
 * unit-testable with a fake Supabase client and safe to call again on
 * retry: merge is a union/max/latest-wins operation and push is upsert-
 * based, so re-running this with the same inputs is a no-op past the first
 * successful call (idempotent repeat sign-in).
 *
 * Steps 1-2 (snapshot guest state, sign in) and 6-9 (apply the result only
 * if not stale, update the local cache, record sync completion, handle
 * retry) are the caller's responsibility -- see components/auth/auth-provider.tsx,
 * since they require access to the Zustand store and localStorage that this
 * function deliberately doesn't touch.
 */
export async function syncGuestToAccount(
  supabase: Client,
  userId: string,
  guestState: ProgressState,
): Promise<ProgressState> {
  const remote = await pullProgress(supabase, userId);
  const merged = mergeProgress(guestState, remote);
  await pushProgress(supabase, userId, merged);
  return merged;
}
