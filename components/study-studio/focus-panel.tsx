"use client";

import { useEffect, useRef, useState } from "react";
import { useProgressStore } from "@/lib/learning/store";
import { getLessonById } from "@/lib/content/registry";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const COUNTDOWN_PRESETS = [10, 25, 45] as const;

function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function elapsedSeconds(
  session: { accumulatedSeconds: number; runningSince: string | null },
  nowMs: number,
): number {
  const running = session.runningSince
    ? (nowMs - new Date(session.runningSince).getTime()) / 1000
    : 0;
  return session.accumulatedSeconds + running;
}

export function FocusPanel() {
  const hydrated = useProgressStore((s) => s.hydrated);
  const session = useProgressStore((s) => s.state.activeFocusSession);
  const recentlyViewed = useProgressStore((s) => s.state.recentlyViewed);
  const startFocusSession = useProgressStore((s) => s.startFocusSession);
  const pauseFocusSession = useProgressStore((s) => s.pauseFocusSession);
  const resumeFocusSession = useProgressStore((s) => s.resumeFocusSession);
  const finishFocusSession = useProgressStore((s) => s.finishFocusSession);
  const cancelFocusSession = useProgressStore((s) => s.cancelFocusSession);

  const [mode, setMode] = useState<"untimed" | "countdown">("untimed");
  const [countdownMinutes, setCountdownMinutes] = useState<number>(25);
  const [lessonId, setLessonId] = useState<string>("");
  const [now, setNow] = useState<number>(() => Date.now());
  const announceRef = useRef<HTMLDivElement>(null);
  const announcedMilestones = useRef<Set<string>>(new Set());
  const autoFinishedRef = useRef(false);

  // Ticks the display once a second while a session is actively running --
  // never writes to the store itself, so this never triggers a localStorage
  // write every second (only start/pause/resume/finish do).
  useEffect(() => {
    if (!session || !session.runningSince) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    if (!session) {
      autoFinishedRef.current = false;
      announcedMilestones.current = new Set();
    }
  }, [session]);

  const elapsed = session ? elapsedSeconds(session, now) : 0;
  const countdownTotalSeconds = (session?.countdownMinutes ?? 0) * 60;
  const remaining = session?.mode === "countdown" ? countdownTotalSeconds - elapsed : null;

  // Auto-finish a countdown session once time is up (mirrors the Phase 6
  // practice-session timer pattern) -- finishFocusSession is idempotent, so
  // this is safe even if it somehow fires more than once.
  useEffect(() => {
    if (
      session?.mode === "countdown" &&
      remaining !== null &&
      remaining <= 0 &&
      !autoFinishedRef.current
    ) {
      autoFinishedRef.current = true;
      announce("Time is up. Focus session finished.");
      finishFocusSession();
    }
  }, [remaining, session?.mode, finishFocusSession]);

  function announce(message: string) {
    if (announceRef.current) announceRef.current.textContent = message;
  }

  useEffect(() => {
    if (session?.mode !== "countdown" || remaining === null) return;
    const milestone = remaining <= 60 && remaining > 55 ? "one-minute" : null;
    if (milestone && !announcedMilestones.current.has(milestone)) {
      announcedMilestones.current.add(milestone);
      announce("One minute remaining.");
    }
  }, [remaining, session?.mode]);

  if (!hydrated) {
    return <Skeleton className="h-40 w-full" />;
  }

  const recentLessons = recentlyViewed
    .map((id) => getLessonById(id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))
    .slice(0, 8);

  return (
    <Card>
      <CardBody className="flex flex-col gap-4">
        <div ref={announceRef} aria-live="polite" className="sr-only" />

        {!session ? (
          <>
            <h3 className="font-semibold">Start a focus session</h3>
            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-medium">Session type</legend>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={mode === "untimed"}
                  onChange={() => setMode("untimed")}
                />
                Untimed
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={mode === "countdown"}
                  onChange={() => setMode("countdown")}
                />
                Countdown
              </label>
              {mode === "countdown" && (
                <div className="flex flex-wrap gap-2 pl-6">
                  {COUNTDOWN_PRESETS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setCountdownMinutes(m)}
                      aria-pressed={countdownMinutes === m}
                      className="rounded-lg border border-(--color-border-strong) px-3 py-1 text-sm aria-pressed:bg-(--color-brand) aria-pressed:text-(--color-brand-contrast)"
                    >
                      {m} min
                    </button>
                  ))}
                </div>
              )}
            </fieldset>

            {recentLessons.length > 0 && (
              <label className="flex flex-col gap-1 text-sm font-medium">
                Associate with a lesson (optional)
                <select
                  value={lessonId}
                  onChange={(e) => setLessonId(e.target.value)}
                  className="rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-sm font-normal"
                >
                  <option value="">No specific lesson</option>
                  {recentLessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <Button
              type="button"
              onClick={() => {
                announce(
                  mode === "countdown"
                    ? `Focus session started: ${countdownMinutes} minutes.`
                    : "Focus session started.",
                );
                const lesson = lessonId ? getLessonById(lessonId) : undefined;
                startFocusSession({
                  mode,
                  countdownMinutes: mode === "countdown" ? countdownMinutes : undefined,
                  lessonId: lesson?.id,
                  courseSlug: lesson?.courseSlug,
                });
              }}
            >
              Start
            </Button>
          </>
        ) : (
          <>
            <h3 className="font-semibold">
              {session.mode === "countdown" ? "Countdown session" : "Untimed session"}
            </h3>
            <p className="text-4xl font-bold tabular-nums" aria-hidden="true">
              {session.mode === "countdown" ? formatClock(remaining ?? 0) : formatClock(elapsed)}
            </p>
            <p className="text-sm text-(--color-ink-muted)">
              {session.runningSince ? "Running" : "Paused"}
              {session.lessonId && getLessonById(session.lessonId)
                ? ` · ${getLessonById(session.lessonId)!.title}`
                : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              {session.runningSince ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    announce("Focus session paused.");
                    pauseFocusSession();
                  }}
                >
                  Pause
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    announce("Focus session resumed.");
                    resumeFocusSession();
                  }}
                >
                  Resume
                </Button>
              )}
              <Button
                type="button"
                onClick={() => {
                  announce("Focus session finished.");
                  finishFocusSession();
                }}
              >
                Finish
              </Button>
              <Button type="button" variant="ghost" onClick={cancelFocusSession}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
