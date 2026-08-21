import { describe, it, expect } from "vitest";
import {
  countryRoadmaps,
  getCountryRoadmap,
  getAllCountrySlugs,
} from "@/lib/study-abroad/registry";
import { STUDY_ABROAD_STEPS } from "@/lib/study-abroad/types";

describe("Study Abroad content registry", () => {
  it("includes exactly the six required countries", () => {
    const slugs = getAllCountrySlugs().sort();
    expect(slugs).toEqual(
      ["australia", "canada", "germany", "ireland", "united-kingdom", "united-states"].sort(),
    );
  });

  it("every country has exactly 23 steps, one per canonical step id, in the canonical order", () => {
    const expectedIds = STUDY_ABROAD_STEPS.map((s) => s.id);
    for (const country of countryRoadmaps) {
      expect(country.steps.length).toBe(23);
      expect(country.steps.map((s) => s.stepId)).toEqual(expectedIds);
    }
  });

  it("every country has a real 'Last reviewed' date and at least one official source", () => {
    for (const country of countryRoadmaps) {
      expect(country.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(country.lastReviewed).getTime())).toBe(false);
      expect(country.officialSources.length).toBeGreaterThan(0);
    }
  });

  it("every official source (country-level and per-step) is on a real government/education-ministry domain", () => {
    const ALLOWED_HOSTS = [
      "studyinthestates.dhs.gov",
      "uscis.gov",
      "travel.state.gov",
      "usa.gov",
      "canada.ca",
      "gov.uk",
      "homeaffairs.gov.au",
      "studyaustralia.gov.au",
      "study-in-germany.de",
      "auswaertiges-amt.de",
      "citizensinformation.ie",
      "irishimmigration.ie",
    ];
    const isAllowed = (url: string) => {
      const host = new URL(url).hostname.toLowerCase();
      return ALLOWED_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
    };
    for (const country of countryRoadmaps) {
      for (const source of country.officialSources) {
        expect(isAllowed(source.url), `${country.countryName}: ${source.url}`).toBe(true);
      }
      for (const step of country.steps) {
        for (const link of step.officialSourceLinks) {
          expect(isAllowed(link.url), `${country.countryName}/${step.stepId}: ${link.url}`).toBe(
            true,
          );
        }
      }
    }
  });

  it("never guarantees admission, a scholarship, or a visa outcome", () => {
    const GUARANTEE_PATTERN = /\bguarantee[sd]?\b|\bwill be (admitted|approved|accepted)\b/i;
    for (const country of countryRoadmaps) {
      expect(GUARANTEE_PATTERN.test(JSON.stringify(country))).toBe(false);
    }
  });

  it("never states a bare currency figure as a permanent fact", () => {
    const CURRENCY_PATTERN = /[$£€]\s?\d[\d,]*/;
    for (const country of countryRoadmaps) {
      expect(CURRENCY_PATTERN.test(JSON.stringify(country))).toBe(false);
    }
  });

  it("getCountryRoadmap resolves a real slug and returns undefined for an unknown one", () => {
    expect(getCountryRoadmap("united-states")?.countryName).toBe("United States");
    expect(getCountryRoadmap("narnia")).toBeUndefined();
  });
});
