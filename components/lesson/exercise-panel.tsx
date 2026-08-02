"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/content/types";
import { usePersistedCode } from "@/lib/learning/use-persisted-code";
import { useProgressStore } from "@/lib/learning/store";
import { HtmlJsRunner } from "@/components/runners/html-js-runner";
import { PythonRunner } from "@/components/runners/python-runner";
import { SqlRunner } from "@/components/runners/sql-runner";
import { TypeScriptRunner } from "@/components/runners/typescript-runner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TestOutcome } from "@/lib/runners/types";

export function ExercisePanel({ exercise }: { exercise: Exercise }) {
  const { code, setCode } = usePersistedCode(exercise.id, exercise.starterCode);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [lastTestResults, setLastTestResults] = useState<TestOutcome[] | undefined>();
  const [lastRanOk, setLastRanOk] = useState<boolean | undefined>();

  const attemptState = useProgressStore((s) => s.state.exerciseAttempts[exercise.id]);
  const recordExerciseAttempt = useProgressStore((s) => s.recordExerciseAttempt);
  const recordHintUsed = useProgressStore((s) => s.recordHintUsed);

  const revealNextHint = () => {
    if (hintsRevealed >= exercise.hints.length) return;
    setHintsRevealed((n) => n + 1);
    recordHintUsed(exercise.id);
  };

  const handleResult = (result: { ok: boolean; testResults?: TestOutcome[] }) => {
    setLastRanOk(result.ok);
    setLastTestResults(result.testResults);
    if (result.testResults && result.testResults.length > 0) {
      const allPassed = result.testResults.every((t) => t.passed);
      recordExerciseAttempt(exercise.id, allPassed && result.ok);
    }
  };

  const visibleTests = exercise.tests.filter((t) => !t.hidden);
  const hiddenCount = exercise.tests.length - visibleTests.length;
  const isComplete = attemptState?.completed ?? false;

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">
          {exercise.kind === "guided" ? "Guided exercise" : "Independent exercise"}
        </h3>
        <div className="flex items-center gap-2">
          {isComplete && <Badge tone="success">Completed</Badge>}
          {attemptState && attemptState.attempts > 0 && (
            <Badge tone="neutral">
              {attemptState.attempts} attempt{attemptState.attempts === 1 ? "" : "s"}
            </Badge>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm text-(--color-ink-muted)">{exercise.prompt}</p>

      <p className="mb-3 text-xs font-medium text-(--color-ink-faint)">
        Checks: {visibleTests.map((t) => t.description).join(" · ")}
        {hiddenCount > 0
          ? ` · plus ${hiddenCount} hidden check${hiddenCount === 1 ? "" : "s"}`
          : ""}
      </p>

      {exercise.language === "python" && (
        <PythonRunner
          code={code}
          onCodeChange={setCode}
          starterCode={exercise.starterCode}
          harness={exercise.harness}
          onResult={handleResult}
        />
      )}
      {exercise.language === "sql" && (
        <SqlRunner
          code={code}
          onCodeChange={setCode}
          starterCode={exercise.starterCode}
          seedSql={exercise.seedSql ?? ""}
          solutionQuery={exercise.solutionCode}
          tests={exercise.tests}
          orderSensitive={exercise.sqlOrderSensitive}
          onResult={handleResult}
        />
      )}
      {exercise.language === "typescript" && (
        <TypeScriptRunner
          code={code}
          onCodeChange={setCode}
          starterCode={exercise.starterCode}
          harness={exercise.harness}
          onResult={handleResult}
          editorLabel={`${exercise.kind} exercise TypeScript editor`}
        />
      )}
      {(exercise.language === "html" || exercise.language === "javascript") && (
        <HtmlJsRunner
          language={exercise.language}
          code={code}
          onCodeChange={setCode}
          starterCode={exercise.starterCode}
          harness={exercise.harness}
          onResult={handleResult}
          showOutputFrame={exercise.language === "html"}
          editorLabel={`${exercise.kind} exercise code editor`}
        />
      )}

      {lastTestResults && lastTestResults.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1" aria-live="polite">
          {lastTestResults.map((t) => {
            const declared = exercise.tests.find((et) => et.id === t.id);
            return (
              <li
                key={t.id}
                className={t.passed ? "text-(--color-success)" : "text-(--color-danger)"}
              >
                {t.passed ? "✓" : "✗"} {declared?.description ?? t.message ?? t.id}
              </li>
            );
          })}
        </ul>
      )}
      {lastRanOk === false && (!lastTestResults || lastTestResults.length === 0) && (
        <p className="mt-3 text-sm text-(--color-danger)">Your code hit an error — see above.</p>
      )}

      <div className="mt-4 border-t border-(--color-border) pt-4">
        <p className="mb-2 text-sm font-medium">Stuck? Get a hint.</p>
        <div className="flex flex-col gap-2">
          {exercise.hints.slice(0, hintsRevealed).map((hint, i) => (
            <p key={i} className="rounded-lg bg-(--color-canvas) p-3 text-sm">
              <span className="font-medium">Hint {i + 1}:</span> {hint}
            </p>
          ))}
        </div>
        {hintsRevealed < exercise.hints.length && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={revealNextHint}
          >
            {hintsRevealed === 0 ? "Show a hint" : "Show next hint"} ({hintsRevealed}/
            {exercise.hints.length})
          </Button>
        )}
      </div>
    </div>
  );
}
