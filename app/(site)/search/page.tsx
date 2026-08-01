import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SearchClient } from "@/components/search/search-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Search",
  description: `Search ${siteConfig.name} lessons, courses, and projects.`,
};

export default function SearchPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Search</h1>
      <p className="mt-2 max-w-2xl text-(--color-ink-muted)">
        Search works fully without AI — this is a local, typo-tolerant index over every lesson,
        course, and project.
      </p>
      <div className="mt-8">
        <SearchClient />
      </div>
    </Container>
  );
}
