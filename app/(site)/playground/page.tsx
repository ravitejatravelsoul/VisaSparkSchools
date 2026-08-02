import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { PlaygroundClient } from "@/components/playground/playground-client";

export const metadata: Metadata = {
  title: "Playground",
  description: "A free-form sandbox to experiment with HTML/CSS/JS, Python, or SQL.",
};

export default function PlaygroundPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Playground"
        description="Experiment freely — nothing here is graded or saved to your progress. Pick a language and start typing."
      />
      <div className="mt-8">
        <Suspense fallback={<PlaygroundSkeleton />}>
          <PlaygroundClient />
        </Suspense>
      </div>
    </Container>
  );
}

/**
 * Approximates the default (HTML/CSS/JS) runner's height -- tabs, a 360px
 * editor, the run/stop/restore row, and the output frame -- so the page
 * doesn't jump once `PlaygroundClient` (which needs `useSearchParams` for
 * `?lang=` deep links, and so can't render in the static shell) hydrates.
 * Previously used `fallback={null}`, the same zero-height gap already fixed
 * elsewhere (see DirectorySkeleton, DashboardSkeleton).
 */
function PlaygroundSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="mb-4 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-32" />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[360px]" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-[292px]" />
      </div>
    </div>
  );
}
