import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Atomic, serverless-safe quota check backed by the `increment_tutor_usage`
 * Postgres function (supabase/migrations/0001_init.sql), which does the
 * read-check-increment in a single SQL statement so concurrent requests
 * across serverless instances can't race past the daily allowance -- unlike
 * the in-memory fallback in lib/ai/quota.ts.
 */
export async function checkAndIncrementSupabaseQuota(
  userId: string,
  dailyAllowance: number,
): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase.rpc("increment_tutor_usage", {
    p_user_id: userId,
    p_allowance: dailyAllowance,
  });
  if (error || !data || data.length === 0) {
    // Fail closed: if the quota check itself fails, don't let the request through.
    return { allowed: false, remaining: 0 };
  }
  return { allowed: data[0].allowed, remaining: data[0].remaining };
}
