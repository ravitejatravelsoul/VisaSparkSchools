import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getPublicLearningPaths } from "@/lib/directory/registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Learning Roadmaps",
  description: `Ordered roadmaps of real ${siteConfig.name} guides, courses, and projects for a given goal -- not certifiable course paths.`,
};

export default function RoadmapsPage() {
  const paths = getPublicLearningPaths();

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Learning roadmaps</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        {paths.length} roadmaps, each an ordered sequence of real guides, courses, and projects for
        a specific goal. A roadmap is a suggested order to learn in, not a certifiable, assessed
        course path -- every roadmap here is exactly that, honestly.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {paths.map((path) => (
          <Link
            key={path.id}
            href={`/roadmaps/${path.slug}`}
            className="flex flex-col rounded-xl border border-(--color-border) bg-(--color-surface) p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
          >
            <h2 className="font-semibold">{path.name}</h2>
            <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">{path.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge tone="neutral">{path.steps.length} steps</Badge>
              <Badge tone="neutral">{path.estimatedTimeRange}</Badge>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
