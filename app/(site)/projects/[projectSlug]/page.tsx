import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug, getLessonById, allTracks, allProjects } from "@/lib/content/registry";

type Params = Promise<{ projectSlug: string }>;

export function generateStaticParams() {
  return allProjects.map((project) => ({ projectSlug: project.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const { projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);
  if (!project) notFound();

  const tracks = project.trackSlugs
    .map((slug) => allTracks.find((t) => t.slug === slug))
    .filter(Boolean);
  const prereqLessons = project.prerequisiteLessonIds
    .map((id) => getLessonById(id))
    .filter(Boolean);

  return (
    <Container className="py-10">
      <Link href="/projects" className="text-sm text-(--color-ink-faint) hover:text-(--color-ink)">
        ← All projects
      </Link>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.isCapstone && <Badge tone="accent">Capstone</Badge>}
        <Badge tone="brand">{project.difficulty}</Badge>
        <Badge tone="neutral">{project.estimatedHours}h</Badge>
      </div>
      <h1 className="mt-2 text-3xl font-bold">{project.title}</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">{project.description}</p>

      <p className="mt-4 text-sm text-(--color-ink-faint)">
        Tracks: {tracks.map((t) => t!.title).join(", ")}
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Objectives</h2>
        <ul className="ml-5 list-disc space-y-1 text-sm">
          {project.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      {prereqLessons.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">Before you start</h2>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            {prereqLessons.map((l) => (
              <li key={l!.id}>
                <Link
                  href={`/courses/${l!.courseSlug}/${l!.slug}`}
                  className="underline hover:text-(--color-brand)"
                >
                  {l!.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Milestones</h2>
        <div className="flex flex-col gap-4">
          {project.milestones.map((milestone, i) => (
            <div
              key={milestone.id}
              className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4"
            >
              <p className="font-semibold">
                {i + 1}. {milestone.title}
              </p>
              <p className="mt-1 text-sm text-(--color-ink-muted)">{milestone.description}</p>
              <ul className="mt-2 ml-5 list-disc space-y-1 text-sm">
                {milestone.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {project.references.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">References</h2>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            {project.references.map((ref) => (
              <li key={ref.url}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-(--color-brand)"
                >
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
