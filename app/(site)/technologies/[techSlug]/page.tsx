import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import {
  allTechnologies,
  getTechnologyBySlug,
  getCategoryById,
  getRelatedTechnologies,
  getPrerequisiteTechnologies,
} from "@/lib/directory/registry";
import { getTechnologyAvailability, describeAvailability } from "@/lib/directory/availability";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return allTechnologies.filter((t) => t.publicVisibility).map((t) => ({ techSlug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ techSlug: string }>;
}): Promise<Metadata> {
  const { techSlug } = await params;
  const tech = getTechnologyBySlug(techSlug);
  if (!tech || !tech.publicVisibility) return {};
  return {
    title: `${tech.name} Guide`,
    description: tech.description,
    alternates: { canonical: `${siteConfig.url}/technologies/${tech.slug}` },
  };
}

const STATUS_LABEL: Record<string, string> = {
  current: "Current",
  legacy: "Legacy",
  specialized: "Specialized",
  conceptual: "Conceptual",
};

export default async function TechnologyGuidePage({
  params,
}: {
  params: Promise<{ techSlug: string }>;
}) {
  const { techSlug } = await params;
  const tech = getTechnologyBySlug(techSlug);
  if (!tech || !tech.publicVisibility) notFound();

  const category = getCategoryById(tech.category);
  const availability = getTechnologyAvailability(tech);
  const related = getRelatedTechnologies(tech);
  const prerequisites = getPrerequisiteTechnologies(tech);

  return (
    <Container className="py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: `${tech.name} Guide`,
          description: tech.description,
          url: `${siteConfig.url}/technologies/${tech.slug}`,
          learningResourceType: "Guide",
          educationalLevel: tech.difficulty,
          provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Technologies", href: "/technologies" },
          ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
          { label: tech.name },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{tech.name}</h1>
          <p className="mt-2 max-w-2xl text-(--color-ink-muted)">{tech.description}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone={tech.status === "legacy" ? "accent" : "brand"}>
          {STATUS_LABEL[tech.status]}
        </Badge>
        <Badge tone="neutral">{tech.difficulty}</Badge>
        {tech.beginnerFriendly && <Badge tone="success">Beginner-friendly</Badge>}
        <Badge tone="neutral">{describeAvailability(availability.status)}</Badge>
      </div>

      {tech.status === "legacy" && tech.legacyNote && (
        <div className="mt-6 rounded-xl border border-(--color-border-strong) bg-(--color-accent-contrast) p-4 text-sm text-(--color-ink)">
          <p className="font-semibold text-(--color-accent)">Legacy technology</p>
          <p className="mt-1">{tech.legacyNote}</p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {availability.hasCourse && availability.courseSlug && (
          <LinkButton href={`/courses/${availability.courseSlug}`}>
            {`Start course: ${availability.courseTitle}`}
          </LinkButton>
        )}
        {availability.hasRunner && (
          <LinkButton
            href={`/playground?lang=${availability.runnerLanguage}`}
            variant={availability.hasCourse ? "secondary" : "primary"}
          >
            Open playground
          </LinkButton>
        )}
        <LinkButton href="/search" variant="ghost">
          Explore related technologies
        </LinkButton>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="mt-2 text-(--color-ink-muted)">{tech.overview}</p>
          </div>

          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
              <dt className="text-xs font-semibold tracking-wide text-(--color-ink-faint) uppercase">
                What it is
              </dt>
              <dd className="mt-1 text-sm text-(--color-ink-muted)">{tech.whatItIs}</dd>
            </div>
            <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
              <dt className="text-xs font-semibold tracking-wide text-(--color-ink-faint) uppercase">
                Why it&apos;s used
              </dt>
              <dd className="mt-1 text-sm text-(--color-ink-muted)">{tech.whyItsUsed}</dd>
            </div>
            <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
              <dt className="text-xs font-semibold tracking-wide text-(--color-ink-faint) uppercase">
                Where it fits
              </dt>
              <dd className="mt-1 text-sm text-(--color-ink-muted)">{tech.whereItFits}</dd>
            </div>
          </dl>

          <div>
            <h2 className="text-lg font-semibold">Core concepts</h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              {tech.coreConcepts.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-(--color-ink-muted)">
                  <span aria-hidden="true" className="text-(--color-brand)">
                    •
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Example</h2>
            <p className="mt-2 text-sm text-(--color-ink-muted)">{tech.example.explanation}</p>
            <pre
              tabIndex={0}
              role="region"
              aria-label={`${tech.name} code example`}
              className="mt-3 overflow-x-auto rounded-lg bg-(--color-code-bg) p-3 font-mono text-sm"
            >
              <code>{tech.example.code}</code>
            </pre>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Common use cases</h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              {tech.useCases.map((u) => (
                <li key={u} className="flex gap-2 text-sm text-(--color-ink-muted)">
                  <span aria-hidden="true" className="text-(--color-brand)">
                    •
                  </span>
                  {u}
                </li>
              ))}
            </ul>
          </div>

          {tech.projectIdeas.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold">Project ideas</h2>
              <ul className="mt-2 flex flex-col gap-1.5">
                {tech.projectIdeas.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-(--color-ink-muted)">
                    <span aria-hidden="true" className="text-(--color-brand)">
                      •
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold">Official references</h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              {tech.references.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-(--color-brand) underline underline-offset-2 hover:text-(--color-brand-strong)"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm">
            <p className="font-semibold">Details</p>
            <dl className="mt-3 flex flex-col gap-2 text-(--color-ink-muted)">
              <div className="flex justify-between gap-2">
                <dt>Category</dt>
                <dd>
                  {category ? (
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-(--color-brand) underline underline-offset-2 hover:text-(--color-brand-strong)"
                    >
                      {category.name}
                    </Link>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Status</dt>
                <dd>{STATUS_LABEL[tech.status]}</dd>
              </div>
              {tech.currentVersion && (
                <div className="flex justify-between gap-2">
                  <dt>Version</dt>
                  <dd>{tech.currentVersion}</dd>
                </div>
              )}
              <div className="flex justify-between gap-2">
                <dt>Last reviewed</dt>
                <dd>{tech.lastReviewed}</dd>
              </div>
            </dl>
            {tech.versionNotes && (
              <p className="mt-3 border-t border-(--color-border) pt-3 text-(--color-ink-faint)">
                {tech.versionNotes}
              </p>
            )}
          </div>

          {prerequisites.length > 0 && (
            <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm">
              <p className="font-semibold">Prerequisites</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {prerequisites.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/technologies/${p.slug}`}
                      className="text-(--color-brand) underline underline-offset-2 hover:text-(--color-brand-strong)"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {related.length > 0 && (
            <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm">
              <p className="font-semibold">Related technologies</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/technologies/${r.slug}`}
                      className="text-(--color-brand) underline underline-offset-2 hover:text-(--color-brand-strong)"
                    >
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </Container>
  );
}
