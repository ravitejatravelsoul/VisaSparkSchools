"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { difficultyTone } from "@/lib/ui/difficulty";
import type { SearchDocument } from "@/lib/search/types";

const KNOWN_DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

const TYPE_LABELS: Record<SearchDocument["type"], string> = {
  lesson: "Lesson",
  course: "Course",
  project: "Project",
  technology: "Technology guide",
  category: "Category",
  topic: "Topic",
  "learning-path": "Roadmap",
  tool: "Tool",
  "study-abroad": "Study Abroad",
};

export function SearchClient() {
  const [docs, setDocs] = useState<SearchDocument[]>([]);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<SearchDocument["type"] | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then(setDocs)
      .catch(() => setDocs([]));
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        keys: [
          { name: "title", weight: 2 },
          { name: "keywords", weight: 1.5 },
          { name: "description", weight: 1 },
          { name: "trackTitle", weight: 0.5 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [docs],
  );

  const results = useMemo(() => {
    const base = query.trim() ? fuse.search(query).map((r) => r.item) : docs;
    return base.filter((doc) => {
      if (typeFilter !== "all" && doc.type !== typeFilter) return false;
      if (difficultyFilter !== "all" && doc.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [query, fuse, docs, typeFilter, difficultyFilter]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Search lessons, courses, and projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, courses, projects…"
            className="w-full rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-4 py-2.5 text-sm"
          />
        </label>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as SearchDocument["type"] | "all")}
          aria-label="Filter by content type"
          className="rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm"
        >
          <option value="all">All types</option>
          <option value="lesson">Lessons</option>
          <option value="course">Courses</option>
          <option value="project">Projects</option>
          <option value="technology">Technology guides</option>
          <option value="category">Categories</option>
          <option value="topic">Topics</option>
          <option value="learning-path">Roadmaps</option>
          <option value="tool">Tools</option>
          <option value="study-abroad">Study Abroad</option>
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          aria-label="Filter by difficulty"
          className="rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm"
        >
          <option value="all">All difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-(--color-ink-faint)">
        {docs.length === 0
          ? "Loading search index…"
          : `${results.length} result${results.length === 1 ? "" : "s"}`}
      </p>

      {docs.length > 0 && results.length === 0 && (
        <EmptyState
          className="mt-8"
          title={`No results for "${query}"`}
          description="Try a different word, or clear the filters above."
        />
      )}

      <ul className="mt-4 flex flex-col gap-3">
        {results.slice(0, 40).map((doc) => {
          const knownDifficulty = KNOWN_DIFFICULTIES.find((d) => d === doc.difficulty);
          return (
            <li key={`${doc.type}-${doc.id}`}>
              <Link href={doc.url} className="group block">
                <Card interactive>
                  <CardBody>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <Badge tone="neutral">{TYPE_LABELS[doc.type]}</Badge>
                      {knownDifficulty && (
                        <Badge tone={difficultyTone(knownDifficulty)} dot>
                          {knownDifficulty}
                        </Badge>
                      )}
                      <span className="text-xs text-(--color-ink-faint)">{doc.trackTitle}</span>
                    </div>
                    <p className="font-medium group-hover:text-(--color-brand-strong)">
                      {doc.title}
                    </p>
                    <p className="text-sm text-(--color-ink-muted)">{doc.description}</p>
                  </CardBody>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
