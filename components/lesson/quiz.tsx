"use client";

import { useId, useState } from "react";
import type { QuizQuestion } from "@/lib/content/types";
import { useProgressStore } from "@/lib/learning/store";
import { Button } from "@/components/ui/button";

export function Quiz({ lessonId, questions }: { lessonId: string; questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const recordQuizResult = useProgressStore((s) => s.recordQuizResult);
  const formId = useId();

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!allAnswered) return;
    setSubmitted(true);
    const correct = questions.filter((q) => answers[q.id] === q.correctIndex).length;
    recordQuizResult(lessonId, correct, questions.length);
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length;

  return (
    <form onSubmit={submit} aria-labelledby={`${formId}-heading`} className="flex flex-col gap-6">
      <h3 id={`${formId}-heading`} className="font-semibold">
        Knowledge check
      </h3>

      {questions.map((question, qIndex) => {
        const selected = answers[question.id];
        const isCorrect = selected === question.correctIndex;
        return (
          <fieldset key={question.id} className="rounded-xl border border-(--color-border) p-4">
            <legend className="px-1 text-sm font-medium">
              {qIndex + 1}. {question.prompt}
            </legend>
            <div className="mt-2 flex flex-col gap-2">
              {question.choices.map((choice, choiceIndex) => {
                const inputId = `${formId}-${question.id}-${choiceIndex}`;
                const isChosen = selected === choiceIndex;
                const showState = submitted && isChosen;
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
                    {showState && (
                      <span className="text-xs font-medium">
                        {isCorrect ? "(Correct)" : "(Not quite)"}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-2 rounded-lg bg-(--color-canvas) p-2 text-sm text-(--color-ink-muted)">
                {isCorrect ? "Correct. " : "Not quite. "}
                {question.explanation}
              </p>
            )}
          </fieldset>
        );
      })}

      <div aria-live="polite" className="flex flex-wrap items-center gap-3">
        {!submitted ? (
          <Button type="submit" disabled={!allAnswered}>
            Check answers
          </Button>
        ) : (
          <>
            <p className="text-sm font-medium">
              You scored {correctCount} out of {questions.length}.
            </p>
            <Button type="button" variant="secondary" onClick={retry}>
              Try again
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
