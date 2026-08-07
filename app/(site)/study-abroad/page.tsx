import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card, CardBody } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { VisaSparkCallout } from "@/components/study-abroad/visaspark-callout";
import { StudyAbroadDisclaimer } from "@/components/study-abroad/disclaimer";
import { countryRoadmaps } from "@/lib/study-abroad/registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Study Abroad Roadmaps",
  description: `Step-by-step study-abroad roadmaps for ${countryRoadmaps.length} countries -- from clarifying your goals through arrival and registration -- with official sources and honest, non-guaranteed guidance.`,
  alternates: { canonical: `${siteConfig.url}/study-abroad` },
};

const DEGREE_LABEL: Record<string, string> = {
  bachelors: "Bachelor's",
  masters: "Master's",
  phd: "PhD",
};

export default function StudyAbroadDirectoryPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Study Abroad Roadmaps"
        description="A step-by-step academic and application roadmap for studying abroad, country by country -- separate from this platform's technical courses, and never a substitute for official guidance."
      />

      <div className="mt-6">
        <StudyAbroadDisclaimer />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {countryRoadmaps.map((country) => (
          <Link
            key={country.countrySlug}
            href={`/study-abroad/${country.countrySlug}`}
            className="group"
          >
            <Card interactive className="flex h-full flex-col">
              <CardBody className="flex flex-1 flex-col">
                <h2 className="font-semibold group-hover:text-(--color-brand-strong)">
                  {country.countryName}
                </h2>
                <p className="mt-1 flex-1 text-sm text-(--color-ink-muted)">{country.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {country.degreeLevels.map((level) => (
                    <Badge key={level} tone="neutral">
                      {DEGREE_LABEL[level]}
                    </Badge>
                  ))}
                </div>
                <p className="mt-3 text-xs text-(--color-ink-faint)">
                  Last reviewed {country.lastReviewed}
                </p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <VisaSparkCallout />
      </div>
    </Container>
  );
}
