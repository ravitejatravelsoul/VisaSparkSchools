"use client";

import { useRef } from "react";
import {
  STUDY_ABROAD_STEPS,
  type CountryStepContent,
  type DegreeLevel,
} from "@/lib/study-abroad/types";
import { StepMarker } from "@/components/ui/step-marker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DEGREE_LABEL: Record<DegreeLevel, string> = {
  bachelors: "Bachelor's",
  masters: "Master's",
  phd: "PhD",
};

export function RoadmapStepList({ steps }: { steps: CountryStepContent[] }) {
  const containerRef = useRef<HTMLOListElement>(null);

  const toggleAll = (open: boolean) => {
    containerRef.current?.querySelectorAll("details").forEach((d) => {
      d.open = open;
    });
  };

  return (
    <div>
      <div className="mb-3 flex justify-end gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={() => toggleAll(true)}>
          Expand all
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={() => toggleAll(false)}>
          Collapse all
        </Button>
      </div>
      <ol ref={containerRef} className="flex flex-col gap-3">
        {steps.map((step) => {
          const def = STUDY_ABROAD_STEPS.find((d) => d.id === step.stepId);
          if (!def) return null;
          return (
            <li key={step.stepId} id={step.stepId}>
              <details className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 open:pb-5">
                <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                  <StepMarker status="not-started" index={def.order} />
                  <span className="flex-1 font-medium text-(--color-ink)">{def.title}</span>
                  <span className="hidden text-xs text-(--color-ink-faint) sm:block">
                    {step.typicalTiming}
                  </span>
                </summary>

                <div className="mt-4 flex flex-col gap-4 pl-10 text-sm">
                  <p className="text-xs text-(--color-ink-faint) sm:hidden">{step.typicalTiming}</p>

                  <div>
                    <p className="mb-1 text-xs font-semibold text-(--color-ink-muted)">
                      Why it matters
                    </p>
                    <p>{step.whyItMatters}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold text-(--color-ink-muted)">
                      What to do
                    </p>
                    <p>{step.whatToDo}</p>
                  </div>

                  {step.degreeNotes &&
                    (["bachelors", "masters", "phd"] as const).some(
                      (k) => step.degreeNotes?.[k],
                    ) && (
                      <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold text-(--color-ink-muted)">
                          How this differs by degree level
                        </p>
                        {(["bachelors", "masters", "phd"] as const).map(
                          (level) =>
                            step.degreeNotes?.[level] && (
                              <p key={level} className="rounded-lg bg-(--color-canvas) p-2.5">
                                <Badge tone="neutral" className="mb-1">
                                  {DEGREE_LABEL[level]}
                                </Badge>
                                <span className="block">{step.degreeNotes[level]}</span>
                              </p>
                            ),
                        )}
                      </div>
                    )}

                  {step.commonDocuments.length > 0 && (
                    <div>
                      <p className="mb-1 text-xs font-semibold text-(--color-ink-muted)">
                        Commonly requested documents
                      </p>
                      <ul className="ml-5 list-disc space-y-0.5">
                        {step.commonDocuments.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="mb-1 text-xs font-semibold text-(--color-ink-muted)">
                      Common mistakes
                    </p>
                    <ul className="ml-5 list-disc space-y-0.5">
                      {step.commonMistakes.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold text-(--color-ink-muted)">Checklist</p>
                    <ul className="ml-5 list-disc space-y-0.5">
                      {step.checklist.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {step.officialSourceLinks.length > 0 && (
                    <div>
                      <p className="mb-1 text-xs font-semibold text-(--color-ink-muted)">
                        Official source
                      </p>
                      <ul className="flex flex-col gap-1">
                        {step.officialSourceLinks.map((src) => (
                          <li key={src.url}>
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-(--color-border-strong) underline-offset-2 hover:text-(--color-brand)"
                            >
                              {src.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </details>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
