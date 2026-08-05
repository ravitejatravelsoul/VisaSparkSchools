"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ToolMeta } from "@/lib/tools/types";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { INPUT_CLASS } from "@/components/tools/tool-shell";

const CATEGORY_LABELS: Record<ToolMeta["category"], string> = {
  text: "Text",
  web: "Web",
  data: "Data",
  design: "Design",
};

export function ToolsDirectory({ tools }: { tools: ToolMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ToolMeta["category"]>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (category !== "all" && tool.category !== category) return false;
      if (q.length === 0) return true;
      const haystack =
        `${tool.title} ${tool.shortDescription} ${tool.keywords.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [tools, query, category]);

  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="tools-search" className="sr-only">
          Search tools
        </label>
        <input
          id="tools-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          className={`${INPUT_CLASS} sm:max-w-xs`}
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={`rounded-full border px-3 py-1 text-sm ${
              category === "all"
                ? "border-(--color-brand) bg-(--color-brand-contrast) text-(--color-brand-strong)"
                : "border-(--color-border-strong) text-(--color-ink-muted)"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-3 py-1 text-sm ${
                category === c
                  ? "border-(--color-brand) bg-(--color-brand-contrast) text-(--color-brand-strong)"
                  : "border-(--color-border-strong) text-(--color-ink-muted)"
              }`}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No tools match your search"
          description="Try a different search term or category."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block">
              <Card interactive className="h-full">
                <CardBody>
                  <Badge tone="neutral">{CATEGORY_LABELS[tool.category]}</Badge>
                  <h2 className="mt-2 text-base font-semibold text-(--color-ink)">{tool.title}</h2>
                  <p className="mt-1 text-sm text-(--color-ink-muted)">{tool.shortDescription}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
