"use client";

import { useId, useState } from "react";
import type { Lesson } from "@/lib/content/types";
import { featureFlags } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/lesson/markdown";
import type { Citation } from "@/lib/ai/types";

interface ChatTurn {
  question: string;
  answer?: string;
  citations?: Citation[];
  error?: string;
}

function useTutorChat(lessonSlug: string) {
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [pending, setPending] = useState(false);

  const ask = async (question: string) => {
    setPending(true);
    setTurns((t) => [...t, { question }]);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, lessonSlug }),
      });
      const data = await res.json();
      setTurns((t) => {
        const next = [...t];
        const last = next[next.length - 1];
        if (!res.ok) {
          next[next.length - 1] = { ...last, error: data.error ?? "Something went wrong." };
        } else {
          next[next.length - 1] = { ...last, answer: data.answer, citations: data.citations };
        }
        return next;
      });
    } catch {
      setTurns((t) => {
        const next = [...t];
        next[next.length - 1] = {
          ...next[next.length - 1],
          error: "Network error — please try again.",
        };
        return next;
      });
    } finally {
      setPending(false);
    }
  };

  return { turns, pending, ask };
}

function TutorPanelContent({ lesson }: { lesson: Lesson }) {
  const { turns, pending, ask } = useTutorChat(lesson.slug);
  const [draft, setDraft] = useState("");
  const inputId = useId();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || pending) return;
    setDraft("");
    ask(trimmed);
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <p className="text-xs text-(--color-ink-faint)">
        Answers are grounded in this course&apos;s own lesson content and cite their sources. It may
        say it doesn&apos;t know — that&apos;s expected when the material doesn&apos;t cover
        something yet.
      </p>
      <div className="flex-1 space-y-4 overflow-y-auto">
        {turns.map((turn, i) => (
          <div key={i} className="space-y-2">
            <p className="rounded-lg bg-(--color-canvas) p-2 text-sm font-medium">
              {turn.question}
            </p>
            {turn.answer && (
              <div className="rounded-lg border border-(--color-border) p-2 text-sm">
                <Markdown>{turn.answer}</Markdown>
                {turn.citations && turn.citations.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-1">
                    {turn.citations.map((c) => (
                      <li
                        key={c.chunkId}
                        className="rounded-full bg-(--color-canvas) px-2 py-0.5 text-xs text-(--color-ink-muted)"
                      >
                        {c.lessonTitle} — {c.heading || "overview"}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {turn.error && <p className="text-sm text-(--color-danger)">{turn.error}</p>}
          </div>
        ))}
        {pending && <p className="text-sm text-(--color-ink-faint)">Thinking…</p>}
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <label htmlFor={inputId} className="sr-only">
          Ask the tutor a question about this lesson
        </label>
        <input
          id={inputId}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about this lesson…"
          maxLength={2000}
          className="flex-1 rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm"
        />
        <Button type="submit" size="sm" disabled={pending || !draft.trim()}>
          Ask
        </Button>
      </form>
    </div>
  );
}

function DisabledTutorNotice() {
  return (
    <div className="text-sm text-(--color-ink-muted)">
      <p>
        The optional AI tutor isn&apos;t enabled in this deployment. All lessons, exercises,
        quizzes, and search work fully without it.
      </p>
    </div>
  );
}

export function TutorLauncher({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden w-72 shrink-0 xl:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
          <p className="mb-3 text-sm font-semibold">AI tutor</p>
          {featureFlags.aiTutorEnabled ? (
            <TutorPanelContent lesson={lesson} />
          ) : (
            <DisabledTutorNotice />
          )}
        </div>
      </div>

      <div className="fixed right-4 bottom-4 z-40 xl:hidden">
        <Button type="button" size="sm" onClick={() => setOpen(true)} aria-haspopup="dialog">
          AI tutor
        </Button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="AI tutor"
            className="absolute inset-x-0 bottom-0 flex h-[80vh] flex-col rounded-t-2xl bg-(--color-surface) p-4 shadow-[var(--shadow-lg)]"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold">AI tutor</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-(--color-border-strong) px-2 py-1 text-xs"
              >
                Close
              </button>
            </div>
            {featureFlags.aiTutorEnabled ? (
              <TutorPanelContent lesson={lesson} />
            ) : (
              <DisabledTutorNotice />
            )}
          </div>
        </div>
      )}
    </>
  );
}
