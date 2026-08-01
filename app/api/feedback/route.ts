import { NextRequest, NextResponse } from "next/server";
import { featureFlags } from "@/lib/site-config";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 4000;
const MAX_SUBMISSIONS_PER_DAY = 10;

/**
 * Minimal in-memory per-IP daily cap so this public, unauthenticated endpoint
 * can't be trivially spammed. Like the tutor's in-memory fallback (see
 * lib/ai/quota.ts), this is a soft, single-instance-only limit -- it resets
 * on restart and doesn't coordinate across multiple server instances. That's
 * an acceptable tradeoff for a low-value target (a feedback form, not the
 * paid AI tutor), but should move to a shared store (e.g. the same atomic
 * Postgres approach used for tutor_usage) before a high-traffic launch.
 */
const submissionsByIp = new Map<string, { count: number; day: string }>();

function isRateLimited(identity: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const existing = submissionsByIp.get(identity);
  if (!existing || existing.day !== today) {
    submissionsByIp.set(identity, { count: 1, day: today });
    return false;
  }
  if (existing.count >= MAX_SUBMISSIONS_PER_DAY) {
    return true;
  }
  existing.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  const identity = request.headers.get("x-forwarded-for") ?? "anonymous";
  if (isRateLimited(identity)) {
    return NextResponse.json(
      { error: "Too many submissions from this connection today. Please try again tomorrow." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { message, email } = (body ?? {}) as { message?: unknown; email?: unknown };

  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Please include a message." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }
  if (email !== undefined && typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  if (featureFlags.supabaseEnabled) {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.from("user_feedback").insert({
      message: message.trim(),
      email: typeof email === "string" && email.trim() ? email.trim() : null,
    });
    if (error) {
      return NextResponse.json({ error: "Could not save feedback right now." }, { status: 500 });
    }
  } else {
    // Demo mode: no database configured. Log server-side so local
    // development can still see submissions; nothing is silently discarded
    // in a way that misleads the learner -- we tell them it isn't persisted.
    console.info("[feedback:demo-mode]", { message, email });
  }

  return NextResponse.json({ ok: true, persisted: featureFlags.supabaseEnabled });
}
