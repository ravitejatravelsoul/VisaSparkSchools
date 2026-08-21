import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchClient } from "@/components/search/search-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Search",
  description: `Search ${siteConfig.name} lessons, courses, and projects.`,
  // Canonicalizes to the bare /search path regardless of ?q= -- individual
  // queries aren't meant to rank as distinct pages.
  alternates: { canonical: `${siteConfig.url}/search` },
};

export default function SearchPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Search"
        description="Search works fully without AI — this is a local, typo-tolerant index over every lesson, course, and project."
      />
      <div className="mt-8">
        <Suspense fallback={<SearchSkeleton />}>
          <SearchClient />
        </Suspense>
      </div>
    </Container>
  );
}

/**
 * Approximates the real search box + filters + result cards so the page
 * doesn't jump when SearchClient (which needs `useSearchParams` to read
 * `?q=`, and so can't render in the static shell) hydrates client-side --
 * same fallback="skeleton, not null" convention as the technology
 * directory page, which fixed a real measured CLS regression this way.
 */
function SearchSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-[42px] flex-1" />
        <Skeleton className="h-[42px] w-full sm:w-40" />
        <Skeleton className="h-[42px] w-full sm:w-40" />
      </div>
      <Skeleton className="mt-4 h-5 w-24" />
      <div className="mt-4 flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[92px]" />
        ))}
      </div>
    </div>
  );
}
