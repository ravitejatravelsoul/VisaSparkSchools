import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getPublicLearningPaths, getLearningPathBySlug } from "@/lib/directory/registry";
import { siteConfig } from "@/lib/site-config";
import { RoadmapStartControls, RoadmapStepList } from "@/components/roadmap/roadmap-progress";

export function generateStaticParams() {
  return getPublicLearningPaths().map((p) => ({ pathSlug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pathSlug: string }>;
}): Promise<Metadata> {
  const { pathSlug } = await params;
  const path = getLearningPathBySlug(pathSlug);
  if (!path || !path.publicVisibility) return {};
  return {
    title: path.name,
    description: path.description,
    alternates: { canonical: `${siteConfig.url}/roadmaps/${path.slug}` },
  };
}

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ pathSlug: string }>;
}) {
  const { pathSlug } = await params;
  const path = getLearningPathBySlug(pathSlug);
  if (!path || !path.publicVisibility) notFound();

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Roadmaps", href: "/roadmaps" }, { label: path.name }]} />

      <h1 className="text-3xl font-bold">{path.name}</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">{path.description}</p>

      <div className="mt-4 rounded-xl border border-(--color-border-strong) bg-(--color-accent-contrast) p-3 text-sm text-(--color-ink)">
        This is a learning roadmap: a suggested order through real guides, courses, and projects. It
        is <span className="font-semibold">not</span> a certifiable, assessed course path.
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm">
          <dt className="font-semibold">Who it&apos;s for</dt>
          <dd className="mt-1 text-(--color-ink-muted)">{path.intendedLearner}</dd>
        </div>
        <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm">
          <dt className="font-semibold">Expected outcome</dt>
          <dd className="mt-1 text-(--color-ink-muted)">{path.expectedOutcome}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="neutral">{path.estimatedTimeRange}</Badge>
        {path.skillsEarned.map((s) => (
          <Badge key={s} tone="brand">
            {s}
          </Badge>
        ))}
      </div>

      <RoadmapStartControls path={path} />

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Steps</h2>
        <RoadmapStepList path={path} />
      </section>

      {path.milestones.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Milestones</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            {path.milestones.map((m) => (
              <li key={m} className="flex gap-2 text-sm text-(--color-ink-muted)">
                <span aria-hidden="true" className="text-(--color-brand)">
                  ✓
                </span>
                {m}
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
