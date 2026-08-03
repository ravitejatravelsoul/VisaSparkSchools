"use client";

import { useState } from "react";
import type { GuidedLocalLab } from "@/lib/content/types";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Renders a guided local lab: instructional content for an environment this
 * platform's browser runners cannot honestly execute (React, Node, Express,
 * local test/automation tools, ...). There is deliberately no Run button and
 * no code editor here -- every code block is static, read-only text. The
 * "Runs on your computer" banner below is fixed copy, not sourced from the
 * lab's own content, so no lesson can ever omit or soften it.
 */
export function GuidedLocalLabPanel({ lab }: { lab: GuidedLocalLab }) {
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">{lab.title}</h3>
        <Badge tone="warning" dot>
          Runs on your computer
        </Badge>
      </div>

      <Alert tone="info" className="mb-4">
        This lab runs on your own computer, in your own terminal and editor — not in your browser.
        VisaSparkSchools does not execute, run, or verify these commands for you. Follow the
        verification steps yourself to confirm your result.
      </Alert>

      <p className="mb-4 text-sm text-(--color-ink-muted)">{lab.scenario}</p>

      <LabSection title="Required tools">
        <ul className="ml-5 list-disc space-y-1 text-sm">
          {lab.requiredTools.map((tool) => (
            <li key={tool.name}>
              {tool.name} <span className="text-(--color-ink-faint)">({tool.version})</span>
            </li>
          ))}
        </ul>
      </LabSection>

      <LabSection title="Setup">
        <ol className="ml-5 list-decimal space-y-1 text-sm">
          {lab.setupSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </LabSection>

      <LabSection title="Project structure">
        <pre
          tabIndex={0}
          role="region"
          aria-label="Project structure"
          className="overflow-x-auto rounded-lg bg-(--color-code-bg) p-3 font-mono text-xs"
        >
          {lab.projectStructure}
        </pre>
      </LabSection>

      <LabSection title="Starter files">
        <div className="flex flex-col gap-3">
          {lab.starterFiles.map((file) => (
            <CodeFile key={file.path} file={file} />
          ))}
        </div>
      </LabSection>

      <LabSection title="Requirements">
        <ul className="ml-5 list-disc space-y-1 text-sm">
          {lab.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </LabSection>

      <LabSection title="Commands to run">
        <ul className="flex flex-col gap-2 text-sm">
          {lab.commands.map((c, i) => (
            <li key={i}>
              <p className="mb-1 text-(--color-ink-muted)">{c.description}</p>
              <code className="block rounded-lg bg-(--color-code-bg) px-3 py-2 font-mono text-xs">
                {c.command}
              </code>
            </li>
          ))}
        </ul>
      </LabSection>

      <LabSection title="Expected behavior">
        <p className="text-sm">{lab.expectedBehavior}</p>
      </LabSection>

      <LabSection title="Verify it yourself">
        <ul className="flex flex-col gap-2 text-sm">
          {lab.verificationSteps.map((v, i) => (
            <li key={i} className="rounded-lg bg-(--color-canvas) p-3">
              <code className="block font-mono text-xs">{v.command}</code>
              <p className="mt-1 text-(--color-ink-muted)">Expected: {v.expectedResult}</p>
            </li>
          ))}
        </ul>
      </LabSection>

      <LabSection title="Troubleshooting">
        <ul className="flex flex-col gap-2 text-sm">
          {lab.troubleshooting.map((t, i) => (
            <li key={i}>
              <span className="font-medium">{t.issue}</span> — {t.fix}
            </li>
          ))}
        </ul>
      </LabSection>

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

      <div className="mt-4 border-t border-(--color-border) pt-4">
        {!solutionRevealed ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setSolutionRevealed(true)}
          >
            Show reference solution
          </Button>
        ) : (
          <div>
            <p className="mb-2 text-sm font-medium">Reference solution</p>
            <p className="mb-3 text-sm text-(--color-ink-muted)">{lab.referenceSolution.summary}</p>
            <div className="flex flex-col gap-3">
              {lab.referenceSolution.files.map((file) => (
                <CodeFile key={file.path} file={file} />
              ))}
            </div>
          </div>
        )}
      </div>

      <LabSection title="Extension challenge">
        <p className="text-sm">{lab.extensionChallenge}</p>
      </LabSection>

      <p className="mt-4 text-xs text-(--color-ink-faint)">
        When you&apos;ve verified this locally, use the &quot;Mark lesson complete&quot; button
        below to record your progress.
      </p>
    </div>
  );
}

function LabSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}

function CodeFile({ file }: { file: { path: string; content: string } }) {
  return (
    <div className="overflow-hidden rounded-lg border border-(--color-border)">
      <p className="border-b border-(--color-border) bg-(--color-surface-sunken) px-3 py-1.5 font-mono text-xs">
        {file.path}
      </p>
      <pre
        tabIndex={0}
        role="region"
        aria-label={file.path}
        className="overflow-x-auto p-3 font-mono text-xs"
      >
        {file.content}
      </pre>
    </div>
  );
}
