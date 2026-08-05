import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { getProjectBySlug, getLessonById, allTracks, allProjects } from "@/lib/content/registry";
import { getProjectRunnerLanguage } from "@/lib/project-studio/runner-mapping";
import { buildStarterCode } from "@/lib/project-studio/starter";
import { ProjectMilestoneChecklist } from "@/components/project/project-milestone-checklist";
import { ProjectRunnerPanel } from "@/components/project-studio/project-runner-panel";
import { NoRunnerNotice } from "@/components/project-studio/no-runner-notice";
import { siteConfig } from "@/lib/site-config";

type Params = Promise<{ projectSlug: string }>;

export function generateStaticParams() {
  return allProjects.map((project) => ({ projectSlug: project.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);
  if (!project) return {};
  return {
    title: `${project.title} — Project Studio`,
    description: project.description,
    alternates: { canonical: `${siteConfig.url}/project-studio/${project.slug}` },
  };
}

export default async function ProjectStudioWorkspacePage({ params }: { params: Params }) {
  const { projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);
  if (!project) notFound();

  const tracks = project.trackSlugs
    .map((slug) => allTracks.find((t) => t.slug === slug))
    .filter(Boolean);
  const prereqLessons = project.prerequisiteLessonIds
    .map((id) => getLessonById(id))
    .filter(Boolean);
  const runnerLanguage = getProjectRunnerLanguage(project.id);

  return (
    <Container className="py-10">
      <Link
        href="/project-studio"
        className="text-sm text-(--color-ink-faint) hover:text-(--color-ink)"
      >
        ← All projects
      </Link>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.isCapstone && <Badge tone="accent">Capstone</Badge>}
        <Badge tone="brand">{project.difficulty}</Badge>
        <Badge tone="neutral">{project.estimatedHours}h</Badge>
      </div>
      <h1 className="mt-2 text-3xl font-bold text-(--color-ink)">{project.title}</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">{project.description}</p>
      <p className="mt-4 text-sm text-(--color-ink-faint)">
        Tracks: {tracks.map((t) => t!.title).join(", ")} ·{" "}
        <Link href={`/projects/${project.slug}`} className="underline hover:text-(--color-brand)">
          View the read-only project page
        </Link>
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-(--color-ink)">Objectives</h2>
        <ul className="ml-5 list-disc space-y-1 text-sm">
          {project.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      {prereqLessons.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-(--color-ink)">Before you start</h2>
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
        <h2 className="mb-3 text-lg font-semibold text-(--color-ink)">Setup</h2>
        {runnerLanguage ? (
          <p className="text-sm text-(--color-ink-muted)">
            No installation needed -- write and run your code directly below. It autosaves to this
            browser as you type, and you can export it as a backup at any time.
          </p>
        ) : (
          <NoRunnerNotice />
        )}
      </section>

      {runnerLanguage && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-(--color-ink)">Workspace</h2>
          <ProjectRunnerPanel
            projectId={project.id}
            runnerLanguage={runnerLanguage}
            starterCode={buildStarterCode(project, runnerLanguage)}
          />
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-(--color-ink)">Milestones</h2>
        <ProjectMilestoneChecklist project={project} />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-(--color-ink)">Completion criteria</h2>
        <Alert tone="neutral">
          Milestone checkboxes above are <strong>self-reported</strong> -- you mark each one once
          you&rsquo;ve genuinely met its checklist. Opening this page never marks anything complete.
          {runnerLanguage
            ? " Running your code in the workspace above is platform-verified in a limited sense: this platform actually executes it and shows you the real output or error, though it does not grade your solution against this project's specific requirements -- that judgment is still yours."
            : " This project has no in-browser runner, so every part of its completion is self-reported; there is nothing for this platform to execute or verify."}
        </Alert>
      </section>

      {project.references.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-(--color-ink)">References</h2>
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
