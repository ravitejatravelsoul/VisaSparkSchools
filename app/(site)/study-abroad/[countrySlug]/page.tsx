import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { VisaSparkCallout } from "@/components/study-abroad/visaspark-callout";
import { StudyAbroadDisclaimer } from "@/components/study-abroad/disclaimer";
import { RoadmapStepList } from "@/components/study-abroad/roadmap-step-list";
import { countryRoadmaps, getCountryRoadmap } from "@/lib/study-abroad/registry";
import { siteConfig } from "@/lib/site-config";

const DEGREE_LABEL: Record<string, string> = {
  bachelors: "Bachelor's",
  masters: "Master's",
  phd: "PhD",
};

export function generateStaticParams() {
  return countryRoadmaps.map((c) => ({ countrySlug: c.countrySlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ countrySlug: string }>;
}): Promise<Metadata> {
  const { countrySlug } = await params;
  const country = getCountryRoadmap(countrySlug);
  if (!country) return {};
  return {
    title: `Study in ${country.countryName}`,
    description: country.summary,
    alternates: { canonical: `${siteConfig.url}/study-abroad/${country.countrySlug}` },
  };
}

export default async function CountryRoadmapPage({
  params,
}: {
  params: Promise<{ countrySlug: string }>;
}) {
  const { countrySlug } = await params;
  const country = getCountryRoadmap(countrySlug);
  if (!country) notFound();

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[{ label: "Study Abroad", href: "/study-abroad" }, { label: country.countryName }]}
      />

      <h1 className="text-3xl font-bold sm:text-4xl">Study in {country.countryName}</h1>
      <p className="mt-2.5 max-w-2xl text-base text-(--color-ink-muted)">{country.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {country.degreeLevels.map((level) => (
          <Badge key={level} tone="neutral">
            {DEGREE_LABEL[level]}
          </Badge>
        ))}
        <span className="text-xs text-(--color-ink-faint)">
          Last reviewed {country.lastReviewed}
        </span>
      </div>

      <div className="mt-6">
        <StudyAbroadDisclaimer />
      </div>

      <Card className="mt-6 p-4">
        <p className="mb-2 text-sm font-semibold">Official sources</p>
        <ul className="flex flex-col gap-1 text-sm">
          {country.officialSources.map((src) => (
            <li key={src.url}>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-(--color-border-strong) underline-offset-2 hover:text-(--color-brand)"
              >
                {src.label}
              </a>
            </li>
          ))}
        </ul>
      </Card>

      <section className="mt-10">
        <h2 className="mb-1 text-lg font-semibold">The 23-step roadmap</h2>
        <p className="mb-4 text-sm text-(--color-ink-faint)">
          From clarifying your goals through arrival and registration.
        </p>
        <RoadmapStepList steps={country.steps} />
      </section>

      <div className="mt-10">
        <VisaSparkCallout />
      </div>
    </Container>
  );
}
