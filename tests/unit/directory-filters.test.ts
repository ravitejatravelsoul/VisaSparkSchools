import { describe, it, expect } from "vitest";
import {
  filtersFromParams,
  paramsFromFilters,
  DEFAULT_FILTERS,
} from "@/components/directory/technology-directory-client";

describe("technology directory filter <-> URL query serialization", () => {
  it("round-trips default filters to an empty query string", () => {
    expect(paramsFromFilters(DEFAULT_FILTERS)).toBe("");
  });

  it("round-trips a fully-populated filter set through the URL and back losslessly", () => {
    const filters = {
      category: "artificial-intelligence",
      difficulty: "advanced",
      beginnerOnly: true,
      status: "current",
      course: true,
      runner: true,
      project: true,
      sort: "recently-reviewed" as const,
      q: "rag",
    };
    const qs = paramsFromFilters(filters);
    const roundTripped = filtersFromParams(new URLSearchParams(qs));
    expect(roundTripped).toEqual(filters);
  });

  it("only includes non-default values in the query string (shareable, minimal URLs)", () => {
    const qs = paramsFromFilters({ ...DEFAULT_FILTERS, category: "frontend" });
    expect(qs).toBe("category=frontend");
  });

  it("parses an empty query string back to exactly the default filters", () => {
    expect(filtersFromParams(new URLSearchParams(""))).toEqual(DEFAULT_FILTERS);
  });

  it("ignores unrecognized query parameters instead of throwing", () => {
    const parsed = filtersFromParams(new URLSearchParams("bogus=value&category=backend"));
    expect(parsed.category).toBe("backend");
  });

  it("treats any value other than the literal string 'true' as false for boolean filters", () => {
    const parsed = filtersFromParams(new URLSearchParams("beginner=1&course=yes"));
    expect(parsed.beginnerOnly).toBe(false);
    expect(parsed.course).toBe(false);
  });
});
