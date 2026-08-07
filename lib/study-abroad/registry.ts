import { countryRoadmapSchema, type CountryRoadmap } from "@/lib/study-abroad/types";
import { unitedStatesRoadmap } from "@/content/study-abroad/united-states";
import { canadaRoadmap } from "@/content/study-abroad/canada";
import { unitedKingdomRoadmap } from "@/content/study-abroad/united-kingdom";
import { australiaRoadmap } from "@/content/study-abroad/australia";
import { germanyRoadmap } from "@/content/study-abroad/germany";
import { irelandRoadmap } from "@/content/study-abroad/ireland";

const rawRoadmaps = [
  unitedStatesRoadmap,
  canadaRoadmap,
  unitedKingdomRoadmap,
  australiaRoadmap,
  germanyRoadmap,
  irelandRoadmap,
];

/** Parsed at module load so a malformed country roadmap fails the build, not a page render. */
export const countryRoadmaps: CountryRoadmap[] = rawRoadmaps.map((raw) =>
  countryRoadmapSchema.parse(raw),
);

export function getCountryRoadmap(slug: string): CountryRoadmap | undefined {
  return countryRoadmaps.find((c) => c.countrySlug === slug);
}

export function getAllCountrySlugs(): string[] {
  return countryRoadmaps.map((c) => c.countrySlug);
}
