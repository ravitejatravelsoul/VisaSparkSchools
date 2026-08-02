"use client";

import { useMemo, useState, useCallback, useRef, type RefObject } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { CloseIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { Technology, Category } from "@/lib/directory/types";
import { getTechnologyAvailability, describeAvailability } from "@/lib/directory/availability";
import { categoryAccent, accentClasses } from "@/lib/ui/category-accent";
import { difficultyTone } from "@/lib/ui/difficulty";
import { useModalA11y } from "@/lib/hooks/use-modal-a11y";

export type SortMode = "name" | "recently-reviewed";

export interface Filters {
  category: string;
  difficulty: string;
  beginnerOnly: boolean;
  status: string;
  course: boolean;
  runner: boolean;
  project: boolean;
  sort: SortMode;
  q: string;
}

export const DEFAULT_FILTERS: Filters = {
  category: "all",
  difficulty: "all",
  beginnerOnly: false,
  status: "all",
  course: false,
  runner: false,
  project: false,
  sort: "name",
  q: "",
};

export function filtersFromParams(params: URLSearchParams): Filters {
  return {
    category: params.get("category") ?? DEFAULT_FILTERS.category,
    difficulty: params.get("difficulty") ?? DEFAULT_FILTERS.difficulty,
    beginnerOnly: params.get("beginner") === "true",
    status: params.get("status") ?? DEFAULT_FILTERS.status,
    course: params.get("course") === "true",
    runner: params.get("runner") === "true",
    project: params.get("project") === "true",
    sort: (params.get("sort") as SortMode) ?? DEFAULT_FILTERS.sort,
    q: params.get("q") ?? "",
  };
}

export function paramsFromFilters(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.category !== "all") params.set("category", filters.category);
  if (filters.difficulty !== "all") params.set("difficulty", filters.difficulty);
  if (filters.beginnerOnly) params.set("beginner", "true");
  if (filters.status !== "all") params.set("status", filters.status);
  if (filters.course) params.set("course", "true");
  if (filters.runner) params.set("runner", "true");
  if (filters.project) params.set("project", "true");
  if (filters.sort !== "name") params.set("sort", filters.sort);
  if (filters.q) params.set("q", filters.q);
  return params.toString();
}

export function TechnologyDirectoryClient({
  technologies,
  categories,
}: {
  technologies: Technology[];
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);

  // Filters are derived directly from the URL on every render (not local
  // state kept in sync via an effect) -- this is what makes them naturally
  // survive back/forward navigation and page refreshes for free, and a
  // shared/bookmarked URL reproduces the exact same filtered view.
  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams]);

  const updateFilters = useCallback(
    (next: Partial<Filters>) => {
      const merged = { ...filters, ...next };
      const qs = paramsFromFilters(merged);
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [filters, pathname, router],
  );

  const resetFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    let list = technologies.filter((t) => {
      if (filters.category !== "all" && t.category !== filters.category) return false;
      if (filters.difficulty !== "all" && t.difficulty !== filters.difficulty) return false;
      if (filters.beginnerOnly && !t.beginnerFriendly) return false;
      if (filters.status !== "all" && t.status !== filters.status) return false;
      if (q) {
        const haystack = `${t.name} ${t.description} ${t.searchKeywords.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      const availability = getTechnologyAvailability(t);
      if (filters.course && !availability.hasCourse) return false;
      if (filters.runner && !availability.hasRunner) return false;
      if (filters.project && !availability.hasProjects) return false;
      return true;
    });

    list = [...list].sort((a, b) =>
      filters.sort === "recently-reviewed"
        ? b.lastReviewed.localeCompare(a.lastReviewed)
        : a.name.localeCompare(b.name),
    );

    return list;
  }, [technologies, filters]);

  const activeFilterCount = [
    filters.category !== "all",
    filters.difficulty !== "all",
    filters.beginnerOnly,
    filters.status !== "all",
    filters.course,
    filters.runner,
    filters.project,
  ].filter(Boolean).length;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex-1">
          <span className="sr-only">Search technologies</span>
          <input
            type="search"
            value={filters.q}
            onChange={(e) => updateFilters({ q: e.target.value })}
            placeholder="Search technologies (e.g. React, DSA, RAG)…"
            className="w-full rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-4 py-2.5 text-sm"
          />
        </label>
        <Button
          ref={filterTriggerRef}
          type="button"
          variant="secondary"
          className="sm:hidden"
          onClick={() => setDrawerOpen(true)}
          aria-haspopup="dialog"
        >
          Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </Button>
      </div>

      <div className="mt-4 hidden flex-wrap gap-3 sm:flex">
        <FilterControls filters={filters} categories={categories} onChange={updateFilters} />
      </div>

      {drawerOpen && (
        <FilterDrawer
          filters={filters}
          categories={categories}
          onChange={updateFilters}
          onReset={resetFilters}
          onClose={() => setDrawerOpen(false)}
          triggerRef={filterTriggerRef}
        />
      )}

      <div className="mt-4 flex items-center justify-between">
        <p aria-live="polite" className="text-sm text-(--color-ink-faint)">
          {results.length} technolog{results.length === 1 ? "y" : "ies"}
        </p>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm text-(--color-brand) underline underline-offset-2 hover:text-(--color-brand-strong)"
          >
            Reset filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <p className="mt-8 text-(--color-ink-muted)">
          No technologies match these filters. Try resetting filters or searching a different term.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((tech) => (
            <TechnologyCard key={tech.id} tech={tech} categories={categories} />
          ))}
        </div>
      )}
    </div>
  );
}

function TechnologyCard({ tech, categories }: { tech: Technology; categories: Category[] }) {
  const availability = getTechnologyAvailability(tech);
  const category = categories.find((c) => c.id === tech.category);
  const accent = accentClasses(categoryAccent(tech.category));
  return (
    <Link href={`/technologies/${tech.slug}`} className="group block h-full">
      <Card interactive className="flex h-full flex-col overflow-hidden">
        <span aria-hidden="true" className={`block h-1 ${accent.bar}`} />
        <CardBody className="flex flex-1 flex-col">
          <p className="text-xs font-medium tracking-wide text-(--color-ink-faint) uppercase">
            {category?.name}
          </p>
          <h2 className="mt-1 font-semibold group-hover:text-(--color-brand-strong)">
            {tech.name}
          </h2>
          <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">{tech.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge tone={difficultyTone(tech.difficulty)} dot>
              {tech.difficulty}
            </Badge>
            {tech.status === "legacy" && <Badge tone="accent">Legacy</Badge>}
            {tech.beginnerFriendly && <Badge tone="success">Beginner-friendly</Badge>}
            <Badge tone="neutral">{describeAvailability(availability.status)}</Badge>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

function FilterControls({
  filters,
  categories,
  onChange,
}: {
  filters: Filters;
  categories: Category[];
  onChange: (next: Partial<Filters>) => void;
}) {
  return (
    <>
      <select
        value={filters.category}
        onChange={(e) => onChange({ category: e.target.value })}
        aria-label="Filter by category"
        className="rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm"
      >
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        value={filters.difficulty}
        onChange={(e) => onChange({ difficulty: e.target.value })}
        aria-label="Filter by difficulty"
        className="rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm"
      >
        <option value="all">All difficulties</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value })}
        aria-label="Filter by current/legacy status"
        className="rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm"
      >
        <option value="all">Current and legacy</option>
        <option value="current">Current only</option>
        <option value="legacy">Legacy only</option>
        <option value="specialized">Specialized</option>
        <option value="conceptual">Conceptual</option>
      </select>
      <select
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value as SortMode })}
        aria-label="Sort order"
        className="rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm"
      >
        <option value="name">Alphabetical</option>
        <option value="recently-reviewed">Recently reviewed</option>
      </select>
      <label className="flex items-center gap-2 rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm">
        <input
          type="checkbox"
          checked={filters.beginnerOnly}
          onChange={(e) => onChange({ beginnerOnly: e.target.checked })}
        />
        Beginner-friendly only
      </label>
      <label className="flex items-center gap-2 rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm">
        <input
          type="checkbox"
          checked={filters.course}
          onChange={(e) => onChange({ course: e.target.checked })}
        />
        Has a full course
      </label>
      <label className="flex items-center gap-2 rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm">
        <input
          type="checkbox"
          checked={filters.runner}
          onChange={(e) => onChange({ runner: e.target.checked })}
        />
        Has a playground
      </label>
      <label className="flex items-center gap-2 rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm">
        <input
          type="checkbox"
          checked={filters.project}
          onChange={(e) => onChange({ project: e.target.checked })}
        />
        Has project ideas
      </label>
    </>
  );
}

function FilterDrawer({
  filters,
  categories,
  onChange,
  onReset,
  onClose,
  triggerRef,
}: {
  filters: Filters;
  categories: Category[];
  onChange: (next: Partial<Filters>) => void;
  onReset: () => void;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalA11y({
    open: true,
    onClose,
    containerRef: dialogRef,
    initialFocusRef: closeButtonRef,
    triggerRef,
  });

  return (
    <div className="fixed inset-0 z-50 sm:hidden">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter technologies"
        className="animate-fade-up absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-(--color-surface) p-4 shadow-[var(--shadow-lg)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="font-semibold">Filters</p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--color-border-strong) hover:bg-(--color-surface-sunken)"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <FilterControls filters={filters} categories={categories} onChange={onChange} />
        </div>
        <div className="mt-4 flex gap-2">
          <Button type="button" variant="secondary" onClick={onReset} className="flex-1">
            Reset
          </Button>
          <Button type="button" onClick={onClose} className="flex-1">
            <span className="inline-flex items-center gap-1">
              Show
              <ArrowRightIcon width={14} height={14} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
