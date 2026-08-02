import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CategoryIcon } from "@/components/directory/category-icon";
import { getPublicCategories, getTechnologiesByCategory } from "@/lib/directory/registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Categories",
  description: `Explore ${siteConfig.name} by subject area -- frontend, backend, AI, data, cloud, and more.`,
};

export default function CategoriesPage() {
  const categories = getPublicCategories();

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Explore by category</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        {categories.length} subject areas, each grouping related technologies, courses, and practice
        into one starting point.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const count = getTechnologiesByCategory(category.id).length;
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex flex-col rounded-xl border border-(--color-border) bg-(--color-surface) p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-(--color-brand-contrast) text-(--color-brand-strong)"
              >
                <CategoryIcon id={category.id} size={22} />
              </span>
              <h2 className="mt-3 font-semibold">{category.name}</h2>
              <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
                {category.shortDescription}
              </p>
              <p className="mt-3 text-xs text-(--color-ink-faint)">
                {count} technolog{count === 1 ? "y" : "ies"}
              </p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
