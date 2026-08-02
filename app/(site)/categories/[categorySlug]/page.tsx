import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeader } from "@/components/ui/page-header";
import { CategoryIcon } from "@/components/directory/category-icon";
import { categoryAccent, accentClasses } from "@/lib/ui/category-accent";
import { difficultyTone } from "@/lib/ui/difficulty";
import {
  getPublicCategories,
  getCategoryBySlug,
  getTechnologiesByCategory,
  getLearningPathsForCategory,
} from "@/lib/directory/registry";
import { getTechnologyAvailability, describeAvailability } from "@/lib/directory/availability";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getPublicCategories().map((c) => ({ categorySlug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category || !category.publicVisibility) return {};
  return {
    title: category.name,
    description: category.shortDescription,
    alternates: { canonical: `${siteConfig.url}/categories/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category || !category.publicVisibility) notFound();

  const technologies = getTechnologiesByCategory(category.id);
  const withCourses = technologies.filter((t) => getTechnologyAvailability(t).hasCourse);
  const withRunners = technologies.filter((t) => getTechnologyAvailability(t).hasRunner);
  const relatedCategories = category.relatedCategoryIds
    .map((id) => getPublicCategories().find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const relatedPaths = getLearningPathsForCategory(category.id);
  const suggestedStart = technologies[0];
  const accent = accentClasses(categoryAccent(category.id));

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[{ label: "Categories", href: "/categories" }, { label: category.name }]}
      />

      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={`mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accent.chipBg} ${accent.chipFg}`}
        >
          <CategoryIcon id={category.id} size={26} />
        </span>
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-(--color-ink-muted)">{category.introduction}</p>
        </div>
      </div>

      <Card className="mt-6 p-4 text-sm">
        <p>
          <span className="font-semibold">Who this is for:</span> {category.audience}
        </p>
        {suggestedStart && (
          <p className="mt-2">
            <span className="font-semibold">Suggested starting point:</span>{" "}
            <Link
              href={`/technologies/${suggestedStart.slug}`}
              className="text-(--color-brand) underline underline-offset-2 hover:text-(--color-brand-strong)"
            >
              {suggestedStart.name}
            </Link>
          </p>
        )}
      </Card>

      <section className="mt-10">
        <SectionHeader title={`Technologies (${technologies.length})`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => {
            const availability = getTechnologyAvailability(tech);
            return (
              <Link key={tech.id} href={`/technologies/${tech.slug}`} className="group">
                <Card interactive className="flex h-full flex-col">
                  <CardBody className="flex flex-1 flex-col">
                    <h3 className="font-semibold group-hover:text-(--color-brand-strong)">
                      {tech.name}
                    </h3>
                    <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
                      {tech.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <Badge tone={difficultyTone(tech.difficulty)} dot>
                        {tech.difficulty}
                      </Badge>
                      {tech.status === "legacy" && <Badge tone="accent">Legacy</Badge>}
                      <Badge tone="neutral">{describeAvailability(availability.status)}</Badge>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {(withCourses.length > 0 || withRunners.length > 0) && (
        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          {withCourses.length > 0 && (
            <Card className="p-4">
              <h2 className="font-semibold">Available courses</h2>
              <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                {withCourses.map((t) => {
                  const availability = getTechnologyAvailability(t);
                  return (
                    <li key={t.id}>
                      <Link
                        href={`/courses/${availability.courseSlug}`}
                        className="text-(--color-brand) underline underline-offset-2 hover:text-(--color-brand-strong)"
                      >
                        {availability.courseTitle}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}
          {withRunners.length > 0 && (
            <Card className="p-4">
              <h2 className="font-semibold">Practice and playgrounds</h2>
              <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                {withRunners.map((t) => {
                  const availability = getTechnologyAvailability(t);
                  return (
                    <li key={t.id}>
                      <Link
                        href={`/playground?lang=${availability.runnerLanguage}`}
                        className="text-(--color-brand) underline underline-offset-2 hover:text-(--color-brand-strong)"
                      >
                        {t.name} playground
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}
        </section>
      )}

      {relatedPaths.length > 0 && (
        <section className="mt-10">
          <SectionHeader title="Related learning roadmaps" />
          <ul className="flex flex-col gap-2">
            {relatedPaths.map((p) => (
              <li key={p.id}>
                <Link href={`/roadmaps/${p.slug}`} className="block">
                  <Card interactive className="p-3 text-sm">
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-2 text-(--color-ink-faint)">{p.description}</span>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {relatedCategories.length > 0 && (
        <section className="mt-10">
          <SectionHeader title="Related categories" />
          <div className="flex flex-wrap gap-2">
            {relatedCategories.map((c) => (
              <Link key={c.id} href={`/categories/${c.slug}`}>
                <Badge tone="neutral">{c.name}</Badge>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
