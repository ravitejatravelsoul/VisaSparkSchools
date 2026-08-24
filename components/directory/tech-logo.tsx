import {
  siJavascript,
  siTypescript,
  siPython,
  siReact,
  siNodedotjs,
  siGit,
  siC,
  siCplusplus,
  siPhp,
  siHtml5,
  siCss,
  siLinux,
  siDotnet,
  type SimpleIcon,
} from "simple-icons";
import { CodeGlyphIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * One centralized technology -> official brand-mark registry, keyed by the
 * same `slug` used in `lib/directory/registry.ts` (Technology.slug). Reused
 * by every homepage technology tile instead of duplicating per-tile logo
 * markup. Only technologies with a *genuinely accurate* official mark in
 * simple-icons (CC0-licensed, https://simpleicons.org) are mapped here --
 * SQL (a language standard, not a brand), Java and C# (Oracle/Microsoft's
 * marks aren't in simple-icons' curated set, and substituting OpenJDK/.NET
 * would misrepresent the actual technology) and AWS (no accurate mark
 * available in this package) deliberately fall through to the generic
 * `CodeGlyphIcon` fallback rather than showing a wrong or invented logo --
 * see docs/DESIGN_SYSTEM.md and the "logo sourcing" note in the homepage
 * redesign task this file was added for.
 */
const TECH_ICONS: Partial<Record<string, SimpleIcon>> = {
  javascript: siJavascript,
  typescript: siTypescript,
  python: siPython,
  react: siReact,
  nodejs: siNodedotjs,
  git: siGit,
  c: siC,
  cpp: siCplusplus,
  php: siPhp,
  html: siHtml5,
  css: siCss,
  linux: siLinux,
  dotnet: siDotnet,
};

/**
 * Renders a technology's official brand mark (or a neutral generic fallback
 * glyph when no accurate mark is available) inside a consistent square
 * container. The brand color is used only as a subtle tint, never as a
 * saturated full-tile background, so logos stay legible and consistent
 * against both light and dark surfaces -- matching this codebase's existing
 * "category accent is always a small accent, never a full background" rule.
 */
export function TechLogo({
  slug,
  size = 40,
  className,
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const icon = TECH_ICONS[slug];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface)",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {icon ? (
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={size * 0.5}
          height={size * 0.5}
          fill={`#${icon.hex}`}
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <CodeGlyphIcon
          width={size * 0.5}
          height={size * 0.5}
          className="text-(--color-ink-faint)"
        />
      )}
    </span>
  );
}

/** True only for technologies with a real, accurate official brand mark mapped above. */
export function hasTechLogo(slug: string): boolean {
  return slug in TECH_ICONS;
}
