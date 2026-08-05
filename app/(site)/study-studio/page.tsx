import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StudyStudioTabs } from "@/components/study-studio/study-studio-tabs";

export const metadata: Metadata = {
  title: "Study Studio",
  description:
    "Your daily queue, study plans, spaced review, focus timer, insights, and saved learning.",
};

// A properly-sized fallback (not `fallback={null}`) so the Suspense boundary
// required by useSearchParams() never causes a layout-shift regression --
// see PROJECT_STATUS.md's Phase 2 CLS audit for why an empty fallback is a
// real, previously-measured bug class on this codebase, not a style choice.
function TabsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 border-b border-(--color-border) pb-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

export default function StudyStudioPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Study Studio"
        description="Everything here is saved to this browser as a guest, or to your account once you sign in -- not a proctored or certified assessment, just your own study tools."
      />
      <div className="mt-8">
        <Suspense fallback={<TabsSkeleton />}>
          <StudyStudioTabs />
        </Suspense>
      </div>
    </Container>
  );
}
