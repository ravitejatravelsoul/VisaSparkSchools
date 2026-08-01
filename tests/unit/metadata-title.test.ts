import { describe, it, expect } from "vitest";
import { metadata } from "@/app/(site)/page";
import { siteConfig } from "@/lib/site-config";

describe("homepage metadata title composition", () => {
  it("uses an absolute title so the product name is not duplicated by the root layout's template", () => {
    // Regression test: the root layout defines `title.template = "%s | {name}"`.
    // If the homepage sets a plain string title instead of `{ absolute: ... }`,
    // Next.js appends the template to it, rendering the product name twice
    // (e.g. "VisaSparkSchools — Learn. Build. Prove. | VisaSparkSchools").
    expect(metadata.title).toEqual({
      absolute: `${siteConfig.name} — ${siteConfig.tagline}`,
    });
  });

  it("the composed title string contains the product name exactly once", () => {
    const title =
      typeof metadata.title === "object" && metadata.title && "absolute" in metadata.title
        ? metadata.title.absolute
        : String(metadata.title);
    const occurrences = title!.split(siteConfig.name).length - 1;
    expect(occurrences).toBe(1);
  });
});
