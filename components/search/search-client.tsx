"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Badge } from "@/components/ui/badge";
import type { SearchDocument } from "@/lib/search/types";

const TYPE_LABELS: Record<SearchDocument["type"], string> = {
  lesson: "Lesson",
  course: "Course",
  project: "Project",
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
        <p className="mt-8 text-(--color-ink-muted)">
          No results for &quot;{query}&quot;. Try a different word, or clear the filters above.
        </p>
      )}

      <ul className="mt-4 flex flex-col gap-3">
        {results.slice(0, 40).map((doc) => (
          <li key={`${doc.type}-${doc.id}`}>
            <Link
              href={doc.url}
              className="block rounded-lg border border-(--color-border) bg-(--color-surface) p-4 hover:border-(--color-border-strong)"
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <Badge tone="neutral">{TYPE_LABELS[doc.type]}</Badge>
                {doc.difficulty && <Badge tone="brand">{doc.difficulty}</Badge>}
                <span className="text-xs text-(--color-ink-faint)">{doc.trackTitle}</span>
              </div>
              <p className="font-medium">{doc.title}</p>
              <p className="text-sm text-(--color-ink-muted)">{doc.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
