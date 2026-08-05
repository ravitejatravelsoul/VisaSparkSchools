"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import {
  scorePracticeSession,
  selectQuestionsByIds,
  shuffleWithSeed,
} from "@/lib/practice/scoring";
import { TIMED_MODE_MINUTES, type PracticeMode, type PracticeQuestion } from "@/lib/practice/types";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

type Phase = "setup" | "active";

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function PracticeSession({
  courseSlug,
  courseTitle,
  questions,
}: {
  courseSlug: string;
  courseTitle: string;
  questions: PracticeQuestion[];
}) {
  const formId = useId();
  const hydrated = useProgressStore((s) => s.hydrated);
  const bestAttempt = useProgressStore((s) => s.state.practiceAttempts[courseSlug]);
  const recordPracticeAttempt = useProgressStore((s) => s.recordPracticeAttempt);

  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<PracticeMode>("untimed");
  const [timedMinutes, setTimedMinutes] = useState<(typeof TIMED_MODE_MINUTES)[number]>(20);
  const [sessionQuestions, setSessionQuestions] = useState<PracticeQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const announceRef = useRef<HTMLDivElement>(null);
  const announcedMilestones = useRef<Set<string>>(new Set());

  const revealImmediately = mode === "untimed";

  const result = useMemo(
    () => (submitted ? scorePracticeSession(sessionQuestions, answers) : null),
    [submitted, sessionQuestions, answers],
  );

  // Timed-mode countdown. Runs once per active timed session -- the tick and
  // the eventual auto-submit both happen inside the interval callback, never
  // synchronously in the effect body itself, so mounting this effect never
  // itself triggers a cascading render.
  useEffect(() => {
    if (phase !== "active" || mode !== "timed") return;
    const interval = setInterval(() => {
      setSecondsRemaining((s) => {
        if (s === null) return s;
        if (s <= 1) {
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, mode]);

  // Announce only at meaningful milestones, never every tick -- a per-second
  // aria-live update would be an unusable wall of noise for screen reader
  // users. The visible countdown text still updates every second.
  useEffect(() => {
    if (secondsRemaining === null || !announceRef.current) return;
    const milestone =
      secondsRemaining === timedMinutes * 60
        ? "start"
        : secondsRemaining === 60
          ? "one-minute"
          : secondsRemaining === 0
            ? "time-up"
            : null;
    if (milestone && !announcedMilestones.current.has(milestone)) {
      announcedMilestones.current.add(milestone);
      announceRef.current.textContent =
        milestone === "one-minute"
          ? "One minute remaining."
          : milestone === "time-up"
            ? "Time is up. Submitting your answers."
            : `Timed practice started: ${timedMinutes} minutes.`;
    }
  }, [secondsRemaining, timedMinutes]);

  useEffect(() => {
    if (submitted && result) {
      recordPracticeAttempt(courseSlug, {
        score: result.correct,
        total: result.total,
        topicsNeedingReview: result.topicsNeedingReview,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  if (!hydrated) {
    return (
      <Card>
        <CardBody className="flex flex-col gap-3 p-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-40" />
        </CardBody>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Alert tone="info">
        This course doesn&apos;t have any practice questions yet. Complete a lesson to add questions
        to the practice pool.
      </Alert>
    );
  }

  function startSession(pool: PracticeQuestion[]) {
    announcedMilestones.current = new Set();
    // Seed is chosen at the moment the learner starts a session (a client
    // event), never during render -- this keeps the very first render
    // (server-rendered and the client's initial hydration pass) free of any
    // randomness, so there is nothing for hydration to mismatch on.
    const seed = Date.now();
    setSessionQuestions(shuffleWithSeed(pool, seed));
    setAnswers({});
    setSubmitted(false);
    setSecondsRemaining(mode === "timed" ? timedMinutes * 60 : null);
    setPhase("active");
  }

  function retryIncorrect() {
    if (!result) return;
    const pool = selectQuestionsByIds(questions, result.incorrectQuestionIds);
    setMode("untimed");
    startSession(pool.length > 0 ? pool : questions);
  }

  function practiceWeakTopics() {
    if (!bestAttempt || bestAttempt.topicsNeedingReview.length === 0) return;
    const pool = questions.filter((q) => bestAttempt.topicsNeedingReview.includes(q.topic));
    startSession(pool.length > 0 ? pool : questions);
  }

  function resetToSetup() {
    setPhase("setup");
    setSessionQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setSecondsRemaining(null);
  }

  const allAnswered = sessionQuestions.every((q) => answers[q.id] !== undefined);

  return (
    <div className="flex flex-col gap-6">
      <div ref={announceRef} aria-live="polite" className="sr-only" />

      {phase === "setup" && (
        <Card>
          <CardBody className="flex flex-col gap-4 p-6">
            <h2 className="text-lg font-semibold">Session setup</h2>
            <p className="text-sm text-(--color-ink-muted)">
              {questions.length} questions drawn from every lesson in this course. This is
              self-paced practice, not a proctored or officially scored exam.
            </p>

            {bestAttempt && (
              <div className="rounded-lg border border-(--color-border) bg-(--color-canvas) p-3 text-sm">
                <p>
                  Best score: <strong>{bestAttempt.bestScore}</strong> / {bestAttempt.bestTotal}
                  {" · "}
                  Last practiced {new Date(bestAttempt.lastAttemptedAt).toLocaleDateString()}
                </p>
                {bestAttempt.topicsNeedingReview.length > 0 && (
                  <p className="mt-1 text-(--color-ink-muted)">
                    Topics to review: {bestAttempt.topicsNeedingReview.join(", ")}
                  </p>
                )}
              </div>
            )}

            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-medium">Practice mode</legend>
              <div className="flex flex-wrap gap-2">
                <label
                  htmlFor={`${formId}-mode-untimed`}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-(--color-border) p-2 has-[:checked]:border-(--color-border-strong)"
                >
                  <input
                    id={`${formId}-mode-untimed`}
                    type="radio"
                    name="mode"
                    checked={mode === "untimed"}
                    onChange={() => setMode("untimed")}
                  />
                  <span className="text-sm">Untimed (see explanations as you go)</span>
                </label>
                <label
                  htmlFor={`${formId}-mode-timed`}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-(--color-border) p-2 has-[:checked]:border-(--color-border-strong)"
                >
                  <input
                    id={`${formId}-mode-timed`}
                    type="radio"
                    name="mode"
                    checked={mode === "timed"}
                    onChange={() => setMode("timed")}
                  />
                  <span className="text-sm">Timed (explanations shown at the end)</span>
                </label>
              </div>
              {mode === "timed" && (
                <label htmlFor={`${formId}-minutes`} className="mt-1 text-sm">
                  Time limit:{" "}
                  <select
                    id={`${formId}-minutes`}
                    value={timedMinutes}
                    onChange={(e) =>
                      setTimedMinutes(Number(e.target.value) as (typeof TIMED_MODE_MINUTES)[number])
                    }
                    className="rounded-md border border-(--color-border-strong) bg-(--color-canvas) px-2 py-1"
                  >
                    {TIMED_MODE_MINUTES.map((m) => (
                      <option key={m} value={m}>
                        {m} minutes
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </fieldset>

            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={() => startSession(questions)}>
                Start practice
              </Button>
              {bestAttempt && bestAttempt.topicsNeedingReview.length > 0 && (
                <Button type="button" variant="secondary" onClick={practiceWeakTopics}>
                  Practice weak topics only
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {phase === "active" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!allAnswered) return;
            setSubmitted(true);
          }}
          aria-labelledby={`${formId}-active-heading`}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id={`${formId}-active-heading`} className="text-lg font-semibold">
              {courseTitle} practice
            </h2>
            {mode === "timed" && secondsRemaining !== null && (
              <p className="text-sm font-medium" aria-hidden="true">
                Time remaining: {formatClock(Math.max(0, secondsRemaining))}
              </p>
            )}
          </div>

          {sessionQuestions.map((question, qIndex) => {
            const selected = answers[question.id];
            const isCorrect = selected === question.correctIndex;
            const showFeedback = selected !== undefined && (revealImmediately || submitted);
            return (
              <fieldset key={question.id} className="rounded-xl border border-(--color-border) p-4">
                <legend className="px-1 text-sm font-medium">
                  {qIndex + 1}. {question.prompt}
                </legend>
                <p className="px-1 text-xs text-(--color-ink-muted)">Topic: {question.topic}</p>
                <div className="mt-2 flex flex-col gap-2">
                  {question.choices.map((choice, choiceIndex) => {
                    const inputId = `${formId}-${question.id}-${choiceIndex}`;
                    const isChosen = selected === choiceIndex;
                    return (
                      <label
                        key={choiceIndex}
                        htmlFor={inputId}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-transparent p-2 hover:bg-(--color-canvas) has-[:checked]:border-(--color-border-strong)"
                      >
                        <input
                          id={inputId}
                          type="radio"
                          name={question.id}
                          value={choiceIndex}
                          checked={isChosen}
                          disabled={submitted}
                          onChange={() => setAnswers((a) => ({ ...a, [question.id]: choiceIndex }))}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">{choice}</span>
                        {showFeedback && isChosen && (
                          <span className="text-xs font-medium">
                            {isCorrect ? "(Correct)" : "(Not quite)"}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
                {showFeedback && (
                  <p className="mt-2 rounded-lg bg-(--color-canvas) p-2 text-sm text-(--color-ink-muted)">
                    {isCorrect ? "Correct. " : "Not quite. "}
                    {question.explanation}
                  </p>
                )}
              </fieldset>
            );
          })}

          {!submitted && (
            <Button type="submit" disabled={!allAnswered}>
              Finish practice session
            </Button>
          )}
        </form>
      )}

      {phase === "active" && submitted && result && (
        <Card>
          <CardBody className="flex flex-col gap-4 p-6" aria-live="polite">
            <h2 className="text-lg font-semibold">
              You scored {result.correct} out of {result.total}
            </h2>
            <div className="flex flex-col gap-1 text-sm">
              {result.topicBreakdown.map((t) => (
                <p key={t.topic}>
                  {t.topic}: {t.correct}/{t.total}
                </p>
              ))}
            </div>
            {result.topicsNeedingReview.length > 0 && (
              <Alert tone="info">
                Consider reviewing: {result.topicsNeedingReview.join(", ")}
                {" · "}
                <Link href="/study-studio?tab=review" className="underline">
                  Review these in Study Studio
                </Link>
              </Alert>
            )}
            <div className="flex flex-wrap gap-3">
              {result.incorrectQuestionIds.length > 0 && (
                <Button type="button" variant="secondary" onClick={retryIncorrect}>
                  Retry incorrect questions
                </Button>
              )}
              <Button type="button" variant="secondary" onClick={resetToSetup}>
                Start a new session
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
