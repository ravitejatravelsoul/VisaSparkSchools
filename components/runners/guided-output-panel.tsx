"use client";

import { useState } from "react";
import type { GuidedOutputLab } from "@/lib/content/types";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SplitRunnerLayout } from "@/components/runners/split-runner-layout";

/**
 * Renders a guided-output lab: for a language this platform cannot safely
 * execute in the browser at all (see
 * docs/product-expansion/RUNNER_CAPABILITY_MATRIX.md). There is deliberately
 * no code editor and no Run button anywhere in this component -- every code
 * block is static, read-only text, and the "Not executed" banner and
 * "Expected output" heading below are fixed copy, not sourced from the lab's
 * own content, so no lesson can ever omit or soften either promise.
 */
export function GuidedOutputPanel({ lab }: { lab: GuidedOutputLab }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [blankGuess, setBlankGuess] = useState("");
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [mobileTab, setMobileTab] = useState<"editor" | "output">("editor");

  const step = lab.steps[stepIndex];
  const isLastStep = stepIndex === lab.steps.length - 1;
  const isWalkthrough = lab.mode === "guided-editing";

  const reveal = () => {
    setRevealed(true);
    setMobileTab("output");
  };

  const goToStep = (next: number) => {
    setStepIndex(next);
    setRevealed(isWalkthrough ? true : false);
    setMobileTab("editor");
  };

  const displayedCode =
    lab.mode === "fill-in-blank" && lab.blankPlaceholder && !revealed
      ? step.code
      : lab.mode === "fill-in-blank" && lab.blankPlaceholder && revealed && lab.blankAnswer
        ? step.code.replaceAll(lab.blankPlaceholder, lab.blankAnswer)
        : step.code;

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">{lab.title}</h3>
        <div className="flex items-center gap-2">
          <Badge tone="neutral">{lab.language}</Badge>
          <Badge tone="warning" dot>
            Not executed
          </Badge>
        </div>
      </div>

      <Alert tone="info" className="mb-4">
        This lab does not run in your browser or on VisaSparkSchools&apos;s servers. Read the code,{" "}
        {lab.mode === "predict" && "predict what it does, then reveal the real expected output."}
        {lab.mode === "fill-in-blank" &&
          "fill in the missing piece, then reveal the completed code and its expected output."}
        {lab.mode === "guided-editing" &&
          "follow each edit step by step and see the expected output after every change."}
      </Alert>

      <p className="mb-4 text-sm text-(--color-ink-muted)">{lab.prompt}</p>

      {isWalkthrough && (
        <div className="mb-3 flex items-center justify-between gap-2 text-sm">
          <p className="text-(--color-ink-muted)">
            Step {stepIndex + 1} of {lab.steps.length}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => goToStep(stepIndex - 1)}
              disabled={stepIndex === 0}
            >
              Previous step
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => goToStep(stepIndex + 1)}
              disabled={isLastStep}
            >
              Next step
            </Button>
          </div>
        </div>
      )}

      {step.description && (
        <p className="mb-3 rounded-lg bg-(--color-canvas) p-3 text-sm">{step.description}</p>
      )}

      <SplitRunnerLayout
        editorLabel="Code"
        outputLabel="Expected output"
        activeMobileTab={mobileTab}
        onActiveMobileTabChange={setMobileTab}
        editor={
          <pre
            tabIndex={0}
            role="region"
            aria-label="Code"
            className="overflow-x-auto rounded-lg bg-(--color-code-bg) p-3 font-mono text-sm"
          >
            <code>{displayedCode}</code>
          </pre>
        }
        output={
          <div className="flex flex-col gap-3" aria-live="polite">
            {lab.mode === "predict" && !revealed && (
              <div className="flex flex-col gap-2">
                <label htmlFor={`${lab.id}-prediction`} className="text-sm font-medium">
                  Your prediction (optional, not graded)
                </label>
                <textarea
                  id={`${lab.id}-prediction`}
                  value={prediction}
                  onChange={(e) => setPrediction(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-canvas) p-2 font-mono text-sm"
                  placeholder="What do you think this code prints or does?"
                />
              </div>
            )}

            {lab.mode === "fill-in-blank" && !revealed && (
              <div className="flex flex-col gap-2">
                <label htmlFor={`${lab.id}-blank`} className="text-sm font-medium">
                  What goes in the blank? (optional, not graded)
                </label>
                <input
                  id={`${lab.id}-blank`}
                  type="text"
                  value={blankGuess}
                  onChange={(e) => setBlankGuess(e.target.value)}
                  className="w-full rounded-lg border border-(--color-border) bg-(--color-canvas) p-2 font-mono text-sm"
                />
              </div>
            )}

            {!revealed && !isWalkthrough && (
              <Button type="button" onClick={reveal}>
                Reveal expected output
              </Button>
            )}

            {!isWalkthrough && revealed && (
              <div className="rounded-lg border border-(--color-border) bg-(--color-code-bg) p-3">
                <p className="mb-1 text-xs font-medium text-(--color-ink-muted)">Expected output</p>
                <pre className="font-mono text-xs whitespace-pre-wrap text-(--color-ink)">
                  {step.expectedOutput}
                </pre>
              </div>
            )}

            {isWalkthrough && (
              <div className="rounded-lg border border-(--color-border) bg-(--color-code-bg) p-3">
                <p className="mb-1 text-xs font-medium text-(--color-ink-muted)">Expected output</p>
                <pre className="font-mono text-xs whitespace-pre-wrap text-(--color-ink)">
                  {step.expectedOutput}
                </pre>
              </div>
            )}
          </div>
        }
      />

      <div className="mt-4 border-t border-(--color-border) pt-4">
        <p className="mb-2 text-sm font-medium">Stuck? Get a hint.</p>
        <div className="flex flex-col gap-2">
          {lab.hints.slice(0, hintsRevealed).map((hint, i) => (
            <p key={i} className="rounded-lg bg-(--color-canvas) p-3 text-sm">
              <span className="font-medium">Hint {i + 1}:</span> {hint}
            </p>
          ))}
        </div>
        {hintsRevealed < lab.hints.length && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={() => setHintsRevealed((n) => n + 1)}
          >
            {hintsRevealed === 0 ? "Show a hint" : "Show next hint"} ({hintsRevealed}/
            {lab.hints.length})
          </Button>
        )}
      </div>
    </div>
  );
}
