/**
 * Daily tutor usage quota. When Supabase is configured, usage should be
 * checked/incremented atomically in the `tutor_usage` table (see
 * supabase/migrations) via a single `UPDATE ... RETURNING` / RPC call so
 * concurrent serverless invocations can't race past the limit. That
 * Supabase-backed path is wired in lib/supabase/tutor-quota.ts.
 *
 * This in-memory fallback is what's active whenever Supabase is NOT
 * configured -- it keeps the tutor usable in local/demo mode, but is only
 * ever a soft, single-instance limit (it resets on server restart and does
 * not coordinate across multiple server instances). It must never be the
 * only mechanism in a real multi-instance production deployment.
 */
const usageByKey = new Map<string, { count: number; day: string }>();

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function checkAndIncrementInMemoryQuota(
  key: string,
  dailyAllowance: number,
): { allowed: boolean; remaining: number } {
  const today = todayKey();
  const existing = usageByKey.get(key);

  if (!existing || existing.day !== today) {
    usageByKey.set(key, { count: 1, day: today });
    return { allowed: true, remaining: dailyAllowance - 1 };
  }

  if (existing.count >= dailyAllowance) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: dailyAllowance - existing.count };
}
