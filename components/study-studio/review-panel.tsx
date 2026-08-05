"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useProgressStore } from "@/lib/learning/store";
import {
  getDueReviewLessons,
  getWeakTopicLessons,
  buildFlashcardsForLessons,
  worstReviewResult,
  type ReviewFlashcard,
} from "@/lib/study-studio/review";
import type { ReviewResult } from "@/lib/learning/review-schedule";
import type { Lesson } from "@/lib/content/types";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

const RATING_BUTTONS: {
  result: ReviewResult;
  label: string;
  variant: "danger" | "secondary" | "primary" | "accent";
}[] = [
  { result: "again", label: "Again", variant: "danger" },
  { result: "hard", label: "Hard", variant: "secondary" },
  { result: "good", label: "Good", variant: "primary" },
  { result: "easy", label: "Easy", variant: "accent" },
];

export function ReviewPanel() {
  const hydrated = useProgressStore((s) => s.hydrated);
  const state = useProgressStore((s) => s.state);
  const reviewLesson = useProgressStore((s) => s.reviewLesson);
  const resetReviewSchedule = useProgressStore((s) => s.resetReviewSchedule);

  const [sessionLessons, setSessionLessons] = useState<Lesson[] | null>(null);
  const [confirmingResetId, setConfirmingResetId] = useState<string | null>(null);

  const dueLessons = useMemo(() => (hydrated ? getDueReviewLessons(state) : []), [hydrated, state]);
  const weakLessons = useMemo(
    () => (hydrated ? getWeakTopicLessons(state) : []),
    [hydrated, state],
  );
  const reviewedLessonIds = Object.keys(state.reviewQueue);

  if (!hydrated) {
    return <Skeleton className="h-40 w-full" />;
  }

  if (sessionLessons) {
    return (
      <FlashcardSession
        lessons={sessionLessons}
        onFinish={(resultsByLesson) => {
          for (const [lessonId, results] of Object.entries(resultsByLesson)) {
            reviewLesson(lessonId, worstReviewResult(results));
          }
          setSessionLessons(null);
        }}
        onExit={() => setSessionLessons(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold">Due for review ({dueLessons.length})</h3>
          {dueLessons.length > 0 && (
            <Button type="button" onClick={() => setSessionLessons(dueLessons)}>
              Start review session
            </Button>
          )}
        </div>
        {dueLessons.length === 0 ? (
          <EmptyState
            title="Nothing due right now"
            description="Lessons enter review the day after you complete them, then resurface on a spaced schedule."
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {dueLessons.map((lesson) => (
              <li
                key={lesson.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-(--color-border) bg-(--color-surface) p-3"
              >
                <Link
                  href={`/courses/${lesson.courseSlug}/${lesson.slug}`}
                  className="text-sm font-medium hover:underline"
                >
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {weakLessons.length > 0 && (
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">Weak practice topics ({weakLessons.length})</h3>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setSessionLessons(weakLessons)}
            >
              Review weak topics
            </Button>
          </div>
          <p className="text-sm text-(--color-ink-muted)">
            From your practice session results, reviewable any time regardless of the schedule
            above.
          </p>
        </section>
      )}

      {reviewedLessonIds.length > 0 && (
        <section>
          <h3 className="mb-3 font-semibold">Review schedule</h3>
          <ul className="flex flex-col gap-2">
            {reviewedLessonIds.map((lessonId) => {
              const review = state.reviewQueue[lessonId];
              return (
                <li
                  key={lessonId}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-(--color-border) p-3 text-sm"
                >
                  <span className="text-(--color-ink-muted)">
                    {lessonId} · every {review.intervalDays} day
                    {review.intervalDays === 1 ? "" : "s"} · next{" "}
                    {new Date(review.dueAt).toLocaleDateString()}
                  </span>
                  {confirmingResetId === lessonId ? (
                    <span className="flex items-center gap-2">
                      <span>Reset to day 1?</span>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          resetReviewSchedule(lessonId);
                          setConfirmingResetId(null);
                        }}
                      >
                        Confirm reset
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setConfirmingResetId(null)}
                      >
                        Cancel
                      </Button>
                    </span>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setConfirmingResetId(lessonId)}
                    >
                      Reset schedule
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

function FlashcardSession({
  lessons,
  onFinish,
  onExit,
}: {
  lessons: Lesson[];
  onFinish: (resultsByLesson: Record<string, ReviewResult[]>) => void;
  onExit: () => void;
}) {
  const cards: ReviewFlashcard[] = useMemo(() => buildFlashcardsForLessons(lessons), [lessons]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<Record<string, ReviewResult[]>>({});

  if (cards.length === 0) {
    return (
      <Alert tone="info">
        These lessons have no quiz questions to review yet.{" "}
        <Button type="button" variant="secondary" size="sm" onClick={onExit} className="ml-2">
          Back
        </Button>
      </Alert>
    );
  }

  const card = cards[index];
  const isLast = index === cards.length - 1;

  const rate = (result: ReviewResult) => {
    const next = {
      ...results,
      [card.lessonId]: [...(results[card.lessonId] ?? []), result],
    };
    setResults(next);
    if (isLast) {
      onFinish(next);
      return;
    }
    setIndex((i) => i + 1);
    setRevealed(false);
  };

  return (
    <Card>
      <CardBody className="flex flex-col gap-4" aria-live="polite">
        <div className="flex items-center justify-between text-sm text-(--color-ink-faint)">
          <span>
            Card {index + 1} of {cards.length} · {card.lessonTitle}
          </span>
          <Button type="button" variant="ghost" size="sm" onClick={onExit}>
            Exit session
          </Button>
        </div>

        <p className="text-base font-medium">{card.prompt}</p>

        {!revealed ? (
          <Button type="button" onClick={() => setRevealed(true)}>
            Reveal answer
          </Button>
        ) : (
          <>
            <div className="rounded-lg bg-(--color-canvas) p-3 text-sm">
              <p className="font-medium">{card.choices[card.correctIndex]}</p>
              <p className="mt-1 text-(--color-ink-muted)">{card.explanation}</p>
            </div>
            <fieldset className="flex flex-wrap gap-2">
              <legend className="mb-2 text-sm font-medium">How did you do?</legend>
              {RATING_BUTTONS.map((btn) => (
                <Button
                  key={btn.result}
                  type="button"
                  variant={btn.variant}
                  onClick={() => rate(btn.result)}
                >
                  {btn.label}
                </Button>
              ))}
            </fieldset>
          </>
        )}
      </CardBody>
    </Card>
  );
}
