import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { CategoryIcon } from "@/components/directory/category-icon";
import { categoryAccent, accentClasses } from "@/lib/ui/category-accent";
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
      <PageHeader
        title="Explore by category"
        description={`${categories.length} subject areas, each grouping related technologies, courses, and practice into one starting point.`}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const count = getTechnologiesByCategory(category.id).length;
          const accent = accentClasses(categoryAccent(category.id));
          return (
            <Link key={category.id} href={`/categories/${category.slug}`} className="group">
              <Card interactive className="flex h-full flex-col">
                <CardBody className="flex flex-1 flex-col">
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${accent.chipBg} ${accent.chipFg}`}
                  >
                    <CategoryIcon id={category.id} size={22} />
                  </span>
                  <h2 className="mt-3 font-semibold group-hover:text-(--color-brand-strong)">
                    {category.name}
                  </h2>
                  <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">
                    {category.shortDescription}
                  </p>
                  <p className="mt-3 text-xs text-(--color-ink-faint)">
                    {count} technolog{count === 1 ? "y" : "ies"}
                  </p>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
