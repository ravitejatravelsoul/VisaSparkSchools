"use client";

import { useState } from "react";
import { PracticeSession } from "@/components/practice/practice-session";
import { WritingPractice } from "@/components/exam-prep/writing-practice";
import { SpeakingPractice } from "@/components/exam-prep/speaking-practice";
import { buildDiagnostic, buildSectionMap, questionsBySection } from "@/lib/exam-prep/diagnostic";
import type { PracticeQuestion } from "@/lib/practice/types";
import type { CourseModule } from "@/lib/content/types";
import type { WritingTask, SpeakingTask } from "@/lib/exam-prep/types";
import { Card, CardBody } from "@/components/ui/card";
import { Button, LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type View = "hub" | "diagnostic" | "section" | "writing" | "speaking";

/**
 * Reuses the existing, well-tested PracticeSession engine (untimed/timed
 * modes, retry-incorrect, per-topic breakdown, progress persistence -- see
 * components/practice/practice-session.tsx) for the diagnostic and
 * per-section practice modes, rather than building a second scoring/timer
 * system. "Mixed mock test" links out to the course's existing /practice
 * route (a full-course timed session already IS a mixed mock, since it
 * draws from every lesson/section).
 */
export function ExamPracticeHub({
  courseSlug,
  courseTitle,
  questions,
  modules,
  writingTasks,
  speakingTasks,
}: {
  courseSlug: string;
  courseTitle: string;
  questions: PracticeQuestion[];
  modules: CourseModule[];
  writingTasks: WritingTask[];
  speakingTasks: SpeakingTask[];
}) {
  const [view, setView] = useState<View>("hub");
  const [sectionModuleId, setSectionModuleId] = useState<string | null>(null);
  const sectionMap = buildSectionMap(modules);
  const activeSection = modules.find((m) => m.id === sectionModuleId);

  // Not every exam has a speaking component (e.g. the GRE General Test is
  // Verbal/Quantitative/Analytical Writing only) -- hide the tab entirely
  // rather than showing an empty/fabricated speaking practice area.
  const tabs: { id: View; label: string }[] = [
    { id: "hub", label: "Practice questions" },
    { id: "writing", label: "Writing" },
    ...(speakingTasks.length > 0 ? [{ id: "speaking" as const, label: "Speaking" }] : []),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="Exam practice area" className="flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const selected =
            view === tab.id || (tab.id === "hub" && (view === "diagnostic" || view === "section"));
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setView(tab.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium",
                selected
                  ? "bg-(--color-brand-soft) text-(--color-brand-strong)"
                  : "text-(--color-ink-muted) hover:bg-(--color-surface-sunken)",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {view === "hub" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardBody className="flex flex-col p-5">
              <h3 className="font-semibold">Diagnostic</h3>
              <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
                A quick baseline covering every section, so you know where to focus first.
              </p>
              <Button type="button" className="mt-3" onClick={() => setView("diagnostic")}>
                Start diagnostic
              </Button>
            </CardBody>
          </Card>

          {modules.map((mod) => {
            const count = questionsBySection(questions, sectionMap, mod.id).length;
            if (count === 0) return null;
            return (
              <Card key={mod.id}>
                <CardBody className="flex flex-col p-5">
                  <h3 className="font-semibold">{mod.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
                    {count} question{count === 1 ? "" : "s"} in this section.
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-3"
                    onClick={() => {
                      setSectionModuleId(mod.id);
                      setView("section");
                    }}
                  >
                    Practice this section
                  </Button>
                </CardBody>
              </Card>
            );
          })}

          <Card>
            <CardBody className="flex flex-col p-5">
              <h3 className="font-semibold">Mixed mock test</h3>
              <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
                A full timed session drawing from every section -- self-paced practice, not a
                proctored or officially scored exam.
              </p>
              <LinkButton
                href={`/courses/${courseSlug}/practice`}
                variant="accent"
                className="mt-3"
              >
                Go to timed mock practice
              </LinkButton>
            </CardBody>
          </Card>
        </div>
      )}

      {view === "diagnostic" && (
        <div className="flex flex-col gap-4">
          <Button type="button" variant="ghost" size="sm" onClick={() => setView("hub")}>
            &larr; Back to practice hub
          </Button>
          <PracticeSession
            courseSlug={`${courseSlug}-diagnostic`}
            courseTitle={`${courseTitle} diagnostic`}
            questions={buildDiagnostic(questions, modules)}
          />
        </div>
      )}

      {view === "section" && activeSection && (
        <div className="flex flex-col gap-4">
          <Button type="button" variant="ghost" size="sm" onClick={() => setView("hub")}>
            &larr; Back to practice hub
          </Button>
          <PracticeSession
            courseSlug={`${courseSlug}-section-${activeSection.id}`}
            courseTitle={`${courseTitle} — ${activeSection.title}`}
            questions={questionsBySection(questions, sectionMap, activeSection.id)}
          />
        </div>
      )}

      {view === "writing" && <WritingPractice tasks={writingTasks} />}
      {view === "speaking" && <SpeakingPractice tasks={speakingTasks} />}
    </div>
  );
}
