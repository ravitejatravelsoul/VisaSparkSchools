import { describe, it, expect } from "vitest";
import { checkAndIncrementInMemoryQuota } from "@/lib/ai/quota";

describe("checkAndIncrementInMemoryQuota", () => {
  it("allows requests up to the daily allowance and then blocks", () => {
    const key = `test-user-${Math.random()}`;
    const allowance = 3;
    const results = [
      checkAndIncrementInMemoryQuota(key, allowance),
      checkAndIncrementInMemoryQuota(key, allowance),
      checkAndIncrementInMemoryQuota(key, allowance),
      checkAndIncrementInMemoryQuota(key, allowance),
    ];
    expect(results.map((r) => r.allowed)).toEqual([true, true, true, false]);
  });

  it("cannot be bypassed by a burst of synchronous 'concurrent' requests", () => {
    // The Node event loop processes each of these synchronous calls to
    // completion before the next one starts (no `await` inside the
    // check-then-increment), so a burst of calls issued back-to-back behaves
    // the same as truly sequential calls -- the allowance is never exceeded.
    const key = `burst-user-${Math.random()}`;
    const allowance = 5;
    const attempts = Array.from({ length: 20 }, () =>
      checkAndIncrementInMemoryQuota(key, allowance),
    );
    const allowedCount = attempts.filter((r) => r.allowed).length;
    expect(allowedCount).toBe(allowance);
  });

  it("tracks separate identities independently", () => {
    const allowance = 1;
    const a = checkAndIncrementInMemoryQuota(`alice-${Math.random()}`, allowance);
    const b = checkAndIncrementInMemoryQuota(`bob-${Math.random()}`, allowance);
    expect(a.allowed).toBe(true);
    expect(b.allowed).toBe(true);
  });

  it("never returns a negative remaining count", () => {
    const key = `negative-check-${Math.random()}`;
    const allowance = 1;
    checkAndIncrementInMemoryQuota(key, allowance);
    const second = checkAndIncrementInMemoryQuota(key, allowance);
    expect(second.allowed).toBe(false);
    expect(second.remaining).toBe(0);
  });
});
