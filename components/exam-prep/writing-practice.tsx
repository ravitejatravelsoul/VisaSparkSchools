"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { WritingTask } from "@/lib/exam-prep/types";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
}

/**
 * Writing self-review practice: a timed textarea plus a rubric checklist the
 * learner scores themselves against. There is no automated grading here --
 * see docs/product-expansion/DECISIONS.md's "Exam-preparation scoring
 * limitations" -- so this never shows a numeric score or claims AI feedback.
 */
export function WritingPractice({ tasks }: { tasks: WritingTask[] }) {
  const formId = useId();
  const [selectedId, setSelectedId] = useState(tasks[0]?.id);
  const task = tasks.find((t) => t.id === selectedId) ?? tasks[0];

  const [response, setResponse] = useState("");
  const [phase, setPhase] = useState<"setup" | "writing" | "review">("setup");
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const announceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "writing" || secondsRemaining === null) return;
    const timer = setInterval(() => {
      setSecondsRemaining((s) => {
        if (s === null) return s;
        if (s <= 1) {
          setPhase("review");
          if (announceRef.current) announceRef.current.textContent = "Time is up.";
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, secondsRemaining]);

  if (!task) return null;

  const wordCount = countWords(response);

  function selectTask(id: string) {
    setSelectedId(id);
    setResponse("");
    setChecked({});
    setPhase("setup");
    setSecondsRemaining(null);
  }

  function start() {
    setSecondsRemaining(task.timeLimitMinutes * 60);
    setPhase("writing");
  }

  function finish() {
    setPhase("review");
  }

  return (
    <div className="flex flex-col gap-4">
      <div ref={announceRef} aria-live="polite" className="sr-only" />

      <div className="flex flex-wrap gap-2">
        {tasks.map((t) => (
          <Button
            key={t.id}
            type="button"
            variant={t.id === task.id ? "primary" : "secondary"}
            size="sm"
            onClick={() => selectTask(t.id)}
          >
            {t.taskName}
          </Button>
        ))}
      </div>

      <Card>
        <CardBody className="flex flex-col gap-4 p-6">
          <div>
            <h3 className="font-semibold">{task.taskName}</h3>
            <p className="mt-1 text-sm text-(--color-ink-muted)">{task.instructions}</p>
          </div>
          <p className="rounded-lg bg-(--color-canvas) p-3 text-sm">{task.prompt}</p>

          {phase === "setup" && (
            <div>
              <p className="mb-2 text-sm text-(--color-ink-faint)">
                Suggested time: {task.timeLimitMinutes} minutes
                {task.minWords ? ` · at least ${task.minWords} words` : ""}
              </p>
              <Button type="button" onClick={start}>
                Start timed writing
              </Button>
            </div>
          )}

          {phase !== "setup" && (
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                <label htmlFor={`${formId}-response`} className="font-medium">
                  Your response
                </label>
                <span className="flex items-center gap-2 text-(--color-ink-muted)">
                  {phase === "writing" && secondsRemaining !== null && (
                    <span className="font-medium text-(--color-ink)">
                      Time remaining: {formatClock(secondsRemaining)}
                    </span>
                  )}
                  <span>
                    {wordCount} word{wordCount === 1 ? "" : "s"}
                    {task.minWords ? ` (min ${task.minWords})` : ""}
                  </span>
                </span>
              </div>
              <textarea
                id={`${formId}-response`}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                readOnly={phase === "review"}
                rows={12}
                className="w-full rounded-lg border border-(--color-border-strong) bg-(--color-canvas) p-3 font-mono text-sm"
              />
              {phase === "writing" && (
                <Button type="button" className="mt-3" onClick={finish}>
                  Finish and self-review
                </Button>
              )}
            </div>
          )}

          {phase === "review" && (
            <div className="border-t border-(--color-border) pt-4">
              <Alert tone="info" title="Self-review, not an automated score">
                Nobody and nothing has graded this response -- score yourself honestly against each
                criterion below. This is a self-assessment tool, not an official or AI-scored
                result.
              </Alert>
              <fieldset className="mt-3 flex flex-col gap-2">
                <legend className="text-sm font-medium">Review your response against:</legend>
                {task.rubric.map((r) => {
                  const id = `${formId}-${task.id}-${r.criterion}`;
                  return (
                    <label
                      key={r.criterion}
                      htmlFor={id}
                      className="flex cursor-pointer items-start gap-2 rounded-lg border border-(--color-border) p-3"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0"
                        checked={Boolean(checked[r.criterion])}
                        onChange={(e) =>
                          setChecked((c) => ({ ...c, [r.criterion]: e.target.checked }))
                        }
                      />
                      <span className="text-sm">
                        <span className="font-medium">{r.criterion}.</span> {r.guidance}
                      </span>
                    </label>
                  );
                })}
              </fieldset>
              <Button
                type="button"
                variant="secondary"
                className="mt-3"
                onClick={() => selectTask(task.id)}
              >
                Try this task again
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
