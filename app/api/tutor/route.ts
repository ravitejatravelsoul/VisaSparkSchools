import { NextRequest, NextResponse } from "next/server";
import { getAiConfig } from "@/lib/ai/config";
import { chunkAllLessons } from "@/lib/ai/chunking";
import { keywordSearch, dedupeByLesson, MIN_RELEVANCE_THRESHOLD } from "@/lib/ai/retrieval";
import { buildTutorMessages } from "@/lib/ai/prompt";
import { callChatCompletion } from "@/lib/ai/provider";
import { validateQuestion, containsInjectionAttempt } from "@/lib/ai/safety";
import { checkAndIncrementInMemoryQuota } from "@/lib/ai/quota";
import { checkAndIncrementSupabaseQuota } from "@/lib/ai/quota-supabase";
import { getLessonBySlug } from "@/lib/content/registry";
import { featureFlags } from "@/lib/site-config";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { TutorResponseBody, Citation } from "@/lib/ai/types";

export const runtime = "nodejs";

let cachedChunks: ReturnType<typeof chunkAllLessons> | null = null;
function getChunks() {
  if (!cachedChunks) cachedChunks = chunkAllLessons();
  return cachedChunks;
}

export async function POST(request: NextRequest) {
  const config = getAiConfig();
  if (!config.enabled) {
    return NextResponse.json(
      { error: "The AI tutor is not enabled in this deployment." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { question: rawQuestion, lessonSlug } = (body ?? {}) as {
    question?: unknown;
    lessonSlug?: unknown;
  };

  const validated = validateQuestion(rawQuestion);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  // Reject inputs that look like an attempt to hijack the tutor outright,
  // in addition to the system prompt's own instruction-vs-data boundary.
  if (containsInjectionAttempt(validated.value)) {
    return NextResponse.json({
      answer:
        "I can't follow instructions embedded in a question like that. Ask me something about the lesson content instead.",
      citations: [],
      groundedInEvidence: false,
    } satisfies TutorResponseBody);
  }

  let quota: { allowed: boolean; remaining: number };
  if (featureFlags.supabaseEnabled) {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      quota = await checkAndIncrementSupabaseQuota(user.id, config.dailyTutorAllowance);
    } else {
      const identity = request.headers.get("x-forwarded-for") ?? "anonymous";
      quota = checkAndIncrementInMemoryQuota(identity, config.dailyTutorAllowance);
    }
  } else {
    const identity = request.headers.get("x-forwarded-for") ?? "anonymous";
    quota = checkAndIncrementInMemoryQuota(identity, config.dailyTutorAllowance);
  }
  if (!quota.allowed) {
    return NextResponse.json(
      { error: "You've reached today's tutor question limit. Try again tomorrow." },
      { status: 429 },
    );
  }

  const currentLesson = typeof lessonSlug === "string" ? getLessonBySlug(lessonSlug) : undefined;
  const chunks = getChunks();
  const retrieved = dedupeByLesson(keywordSearch(validated.value, chunks, 8)).slice(0, 5);
  const strongEnough = retrieved.some((c) => c.score >= MIN_RELEVANCE_THRESHOLD);

  if (!strongEnough) {
    const response: TutorResponseBody = {
      answer:
        "The course material doesn't clearly cover that yet, so I don't want to guess. Try rephrasing your question, or check the Search page for related lessons.",
      citations: [],
      groundedInEvidence: false,
    };
    return NextResponse.json(response);
  }

  try {
    const messages = buildTutorMessages({
      question: validated.value,
      currentLesson,
      retrievedChunks: retrieved,
    });
    const answer = await callChatCompletion(config, messages);

    const citations: Citation[] = retrieved.map((chunk) => ({
      chunkId: chunk.id,
      lessonTitle: chunk.lessonTitle,
      heading: chunk.heading,
      lessonSlug: chunk.lessonSlug,
    }));

    const response: TutorResponseBody = { answer, citations, groundedInEvidence: true };
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "The AI tutor is temporarily unavailable.",
      },
      { status: 502 },
    );
  }
}
