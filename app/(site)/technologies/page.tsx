import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getPublicTechnologies, getPublicCategories } from "@/lib/directory/registry";
import { TechnologyDirectoryClient } from "@/components/directory/technology-directory-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Technology Directory",
  description: `Browse every technology guide on ${siteConfig.name} -- filter by category, difficulty, and what's actually available today.`,
  alternates: { canonical: `${siteConfig.url}/technologies` },
};

export default function TechnologiesPage() {
  const technologies = getPublicTechnologies();
  const categories = getPublicCategories();

  return (
    <Container className="py-10">
      <PageHeader
        title="Technology directory"
        description={`${technologies.length} technology guides across ${categories.length} categories. Every guide honestly shows whether a full course, playground, or project ideas actually exist for it today -- a guide is not the same as a complete course.`}
      />

      <div className="mt-8">
        <Suspense fallback={<DirectorySkeleton count={technologies.length} />}>
          <TechnologyDirectoryClient technologies={technologies} categories={categories} />
        </Suspense>
      </div>
    </Container>
  );
}

/**
 * Approximates the real filter UI + card grid's height so the page doesn't
 * jump when `TechnologyDirectoryClient` (which needs `useSearchParams`, and
 * so can't render in the static shell) hydrates client-side. Fixes a real
 * measured CLS regression (Lighthouse: 0.928 with `fallback={null}`) --
 * see PROJECT_STATUS.md's Phase 3 corrections.
 */
function DirectorySkeleton({ count }: { count: number }) {
  return (
    <div aria-hidden="true">
      <Skeleton className="h-[42px]" />
      <div className="mt-4 hidden gap-3 sm:flex">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28" />
        ))}
      </div>
      <Skeleton className="mt-4 h-5 w-32" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: Math.min(count, 12) }).map((_, i) => (
          <Skeleton key={i} className="h-[168px]" />
        ))}
      </div>
    </div>
  );
}
