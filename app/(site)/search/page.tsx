import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SearchClient } from "@/components/search/search-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Search",
  description: `Search ${siteConfig.name} lessons, courses, and projects.`,
  // Canonicalizes to the bare /search path regardless of ?q= -- individual
  // queries aren't meant to rank as distinct pages.
  alternates: { canonical: `${siteConfig.url}/search` },
};

export default function SearchPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Search"
        description="Search works fully without AI — this is a local, typo-tolerant index over every lesson, course, and project."
      />
      <div className="mt-8">
        <SearchClient />
      </div>
    </Container>
  );
}
