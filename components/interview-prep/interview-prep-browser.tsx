"use client";

import { useMemo, useRef, useState } from "react";
import type { InterviewQuestion } from "@/lib/interview-prep/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { difficultyTone } from "@/lib/ui/difficulty";

/**
 * Shared browser for both "Interview Prep" (technical courses) and
 * "Preparation Questions" (exam-prep courses, see app/(site)/courses/
 * [courseSlug]/preparation-questions/page.tsx) -- same schema, same
 * component, only the surrounding page's copy differs. Search/category/
 * difficulty filters and Expand/Collapse all are all client-side, over an
 * already-loaded question bank (no extra network round trip once the route
 * itself has code-split this component in).
 */
export function InterviewPrepBrowser({
  questions,
  itemLabel = "question",
}: {
  questions: InterviewQuestion[];
  /** "interview question" or "preparation question" -- used only in empty-state copy. */
  itemLabel?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const containerRef = useRef<HTMLOListElement>(null);

  const categories = useMemo(
    () => Array.from(new Set(questions.map((q) => q.category))).sort(),
    [questions],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return questions.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (difficulty !== "all" && item.difficulty !== difficulty) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [questions, query, category, difficulty]);

  const toggleAll = (open: boolean) => {
    containerRef.current?.querySelectorAll("details").forEach((d) => {
      d.open = open;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Search {itemLabel}s</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${itemLabel}s…`}
            className="w-full rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-4 py-2.5 text-sm"
          />
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          className="rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          aria-label="Filter by difficulty"
          className="rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm"
        >
          <option value="all">All difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-(--color-ink-faint)">
          {filtered.length} of {questions.length} {itemLabel}
          {questions.length === 1 ? "" : "s"}
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={() => toggleAll(true)}>
            Expand all
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={() => toggleAll(false)}>
            Collapse all
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-(--color-border) bg-(--color-canvas) p-4 text-sm text-(--color-ink-muted)">
          No {itemLabel}s match your search or filters.
        </p>
      ) : (
        <ol ref={containerRef} className="flex flex-col gap-3">
          {filtered.map((item) => (
            <li key={item.id} id={item.id}>
              <details className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 open:pb-5">
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 font-medium text-(--color-ink)">{item.question}</span>
                  <Badge tone={difficultyTone(item.difficulty)} dot>
                    {item.difficulty}
                  </Badge>
                  <Badge tone="neutral">{item.category}</Badge>
                </summary>

                <div className="mt-3 flex flex-col gap-3 pl-1 text-sm">
                  <p className="whitespace-pre-line text-(--color-ink-muted)">{item.answer}</p>

                  {item.codeExample && (
                    <pre
                      tabIndex={0}
                      role="region"
                      aria-label="Code example"
                      className="overflow-x-auto rounded-lg bg-(--color-code-bg) p-3 font-mono text-xs"
                    >
                      <code>{item.codeExample}</code>
                    </pre>
                  )}

                  {item.commonMistake && (
                    <p className="rounded-lg bg-(--color-canvas) p-2.5">
                      <span className="font-medium">Common mistake:</span> {item.commonMistake}
                    </p>
                  )}

                  {item.followUp && (
                    <p className="rounded-lg bg-(--color-canvas) p-2.5">
                      <span className="font-medium">Follow-up:</span> {item.followUp}
                    </p>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
