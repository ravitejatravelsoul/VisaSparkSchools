import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CategoryIcon } from "@/components/directory/category-icon";
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

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[{ label: "Categories", href: "/categories" }, { label: category.name }]}
      />

      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--color-brand-contrast) text-(--color-brand-strong)"
        >
          <CategoryIcon id={category.id} size={26} />
        </span>
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-(--color-ink-muted)">{category.introduction}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm">
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
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Technologies ({technologies.length})</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => {
            const availability = getTechnologyAvailability(tech);
            return (
              <Link
                key={tech.id}
                href={`/technologies/${tech.slug}`}
                className="flex flex-col rounded-xl border border-(--color-border) bg-(--color-surface) p-4 transition-shadow hover:shadow-[var(--shadow-md)]"
              >
                <h3 className="font-semibold">{tech.name}</h3>
                <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">{tech.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tech.status === "legacy" && <Badge tone="accent">Legacy</Badge>}
                  <Badge tone="neutral">{describeAvailability(availability.status)}</Badge>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {(withCourses.length > 0 || withRunners.length > 0) && (
        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          {withCourses.length > 0 && (
            <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
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
            </div>
          )}
          {withRunners.length > 0 && (
            <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
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
            </div>
          )}
        </section>
      )}

      {relatedPaths.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Related learning roadmaps</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {relatedPaths.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/roadmaps/${p.slug}`}
                  className="block rounded-lg border border-(--color-border) bg-(--color-surface) p-3 text-sm hover:border-(--color-border-strong)"
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="ml-2 text-(--color-ink-faint)">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {relatedCategories.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Related categories</h2>
          <div className="mt-3 flex flex-wrap gap-2">
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
