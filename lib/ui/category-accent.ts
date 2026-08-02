import type { CategoryId } from "@/lib/directory/types";

/**
 * Maps each subject category to one of the design system's 7 muted accent
 * hues (see app/globals.css) -- assigned explicitly, not computed by
 * cycling an array, so the mapping is stable and easy to rebalance by eye
 * (e.g. keeping visually similar categories like "backend" and
 * "cloud-devops" from sharing a hue). `amber` is deliberately excluded from
 * this rotation: it's reserved for the brand's own "spark" accent
 * (`--color-accent`) so a category chip is never visually confused with a
 * primary call-to-action.
 *
 * Used only for small accents (an icon chip background, a left border, a
 * badge) -- never as a full card background, per the design direction in
 * docs/DESIGN_SYSTEM.md.
 */
export type AccentHue = "blue" | "purple" | "teal" | "rose" | "indigo" | "cyan" | "lime";

const CATEGORY_ACCENT: Record<CategoryId, AccentHue> = {
  foundations: "blue",
  frontend: "purple",
  backend: "teal",
  "programming-languages": "rose",
  mobile: "indigo",
  databases: "cyan",
  "data-science": "lime",
  "artificial-intelligence": "blue",
  "cloud-devops": "purple",
  cybersecurity: "teal",
  "testing-qa": "rose",
  dsa: "indigo",
  "developer-tools": "cyan",
  "quantitative-aptitude": "lime",
  reasoning: "blue",
  "career-gd": "purple",
};

export function categoryAccent(id: CategoryId): AccentHue {
  return CATEGORY_ACCENT[id];
}

/**
 * Tailwind arbitrary-property classes for a given hue -- background chip,
 * foreground text, border, and solid bar. Written as a literal per-hue map
 * (not built via template-literal interpolation) because Tailwind's
 * build-time scanner only picks up complete class-name strings that appear
 * literally in source; an interpolated `` `border-(--accent-${hue})` `` never
 * matches and silently generates no CSS.
 *
 * `border` sets the CSS `border-color` shorthand (all sides) -- only safe on
 * an element that has no other border-color utility competing for the same
 * property, since two same-property utilities resolve by generated-stylesheet
 * order, not by their order in `className`. For accenting one edge of an
 * already-bordered element (e.g. a card that also has a neutral `border`),
 * use `bar` instead: a `background-color` utility for a small decorative
 * strip, which can't collide with `border-color` at all.
 */
const ACCENT_CLASSES: Record<
  AccentHue,
  { chipBg: string; chipFg: string; border: string; bar: string }
> = {
  blue: {
    chipBg: "bg-(--accent-blue-contrast)",
    chipFg: "text-(--accent-blue)",
    border: "border-(--accent-blue)",
    bar: "bg-(--accent-blue)",
  },
  purple: {
    chipBg: "bg-(--accent-purple-contrast)",
    chipFg: "text-(--accent-purple)",
    border: "border-(--accent-purple)",
    bar: "bg-(--accent-purple)",
  },
  teal: {
    chipBg: "bg-(--accent-teal-contrast)",
    chipFg: "text-(--accent-teal)",
    border: "border-(--accent-teal)",
    bar: "bg-(--accent-teal)",
  },
  rose: {
    chipBg: "bg-(--accent-rose-contrast)",
    chipFg: "text-(--accent-rose)",
    border: "border-(--accent-rose)",
    bar: "bg-(--accent-rose)",
  },
  indigo: {
    chipBg: "bg-(--accent-indigo-contrast)",
    chipFg: "text-(--accent-indigo)",
    border: "border-(--accent-indigo)",
    bar: "bg-(--accent-indigo)",
  },
  cyan: {
    chipBg: "bg-(--accent-cyan-contrast)",
    chipFg: "text-(--accent-cyan)",
    border: "border-(--accent-cyan)",
    bar: "bg-(--accent-cyan)",
  },
  lime: {
    chipBg: "bg-(--accent-lime-contrast)",
    chipFg: "text-(--accent-lime)",
    border: "border-(--accent-lime)",
    bar: "bg-(--accent-lime)",
  },
};

export function accentClasses(hue: AccentHue): {
  chipBg: string;
  chipFg: string;
  border: string;
  bar: string;
} {
  return ACCENT_CLASSES[hue];
}
