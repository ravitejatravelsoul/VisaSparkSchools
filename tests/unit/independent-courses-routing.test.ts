import { describe, it, expect } from "vitest";
import nextConfig from "../../next.config";
import sitemap from "@/app/sitemap";
import { allTracks } from "@/lib/content/registry";
import { siteConfig } from "@/lib/site-config";

/**
 * Product-model regression: /paths was renamed to /topics because a
 * numbered, connected-line "one path in order" presentation falsely implied
 * every course must be completed sequentially. These tests guard the parts
 * of that correction that are easy to silently regress -- old links still
 * resolving, and the sitemap/search index staying in sync with the real
 * route.
 */
describe("/paths -> /topics permanent redirects", () => {
  it("redirects the old topic-index URL permanently", async () => {
    expect(nextConfig.redirects).toBeDefined();
    const redirects = await nextConfig.redirects!();
    const match = redirects.find((r) => r.source === "/paths");
    expect(match).toBeDefined();
    expect(match?.destination).toBe("/topics");
    expect(match?.permanent).toBe(true);
  });

  it("redirects old per-topic URLs permanently, preserving the slug", async () => {
    const redirects = await nextConfig.redirects!();
    const match = redirects.find((r) => r.source === "/paths/:trackSlug");
    expect(match).toBeDefined();
    expect(match?.destination).toBe("/topics/:trackSlug");
    expect(match?.permanent).toBe(true);
  });
});

describe("sitemap uses the corrected /topics routes", () => {
  it("includes /topics but not /paths", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${siteConfig.url}/topics`);
    expect(urls.some((u) => u.includes("/paths"))).toBe(false);
  });

  it("includes a /topics/<slug> entry for every track", () => {
    const urls = new Set(sitemap().map((entry) => entry.url));
    for (const track of allTracks) {
      expect(urls.has(`${siteConfig.url}/topics/${track.slug}`)).toBe(true);
    }
  });
});
