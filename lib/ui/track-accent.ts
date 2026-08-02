import type { AccentHue } from "@/lib/ui/category-accent";

/**
 * Same idea as category-accent.ts but for the 6 learning tracks in
 * content/tracks.ts -- an explicit, stable slug -> hue mapping (not
 * computed cycling) so neighboring tracks in the path don't collide.
 */
const TRACK_ACCENT: Record<string, AccentHue> = {
  foundations: "blue",
  "web-html-css": "purple",
  javascript: "rose",
  python: "teal",
  "git-api-sql": "indigo",
  "ai-llm-rag": "lime",
};

export function trackAccent(slug: string): AccentHue {
  return TRACK_ACCENT[slug] ?? "blue";
}
