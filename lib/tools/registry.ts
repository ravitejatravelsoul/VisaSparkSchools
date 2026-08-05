import type { ToolMeta } from "@/lib/tools/types";

/**
 * Tools Hub registry (Phase 8). Small and hand-curated on purpose -- every
 * entry is a genuinely distinct utility, not a thin variant added to
 * inflate a count. Each tool's actual logic lives in its own component
 * under components/tools/, lazy-loaded per-route (see
 * app/(site)/tools/[toolSlug]/page.tsx) so the directory page never pulls
 * in every tool's bundle.
 */
export const tools: ToolMeta[] = [
  {
    id: "json-formatter",
    slug: "json-formatter",
    title: "JSON Formatter & Validator",
    shortDescription: "Format, validate, and minify JSON with clear error locations.",
    description:
      "Paste JSON to pretty-print it, minify it, or find exactly where it's invalid. Runs entirely in your browser -- nothing you paste here is sent anywhere.",
    category: "data",
    keywords: ["json", "format", "validate", "minify", "pretty print", "lint"],
    relatedCourseSlugs: ["javascript-fundamentals", "api-testing-and-automation"],
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    title: "Regex Tester",
    shortDescription: "Test a regular expression against sample text and see every match.",
    description:
      "Write a pattern and flags, then see every match highlighted against your test text, plus capture groups. Uses your browser's own RegExp engine -- no pattern or text ever leaves your device.",
    category: "text",
    keywords: ["regex", "regular expression", "pattern", "match", "test"],
    relatedCourseSlugs: ["javascript-fundamentals", "python-fundamentals"],
  },
  {
    id: "text-diff",
    slug: "text-diff",
    title: "Text Diff Checker",
    shortDescription: "Compare two blocks of text and see exactly what changed, line by line.",
    description:
      "Paste an original and a changed version of some text to see a line-by-line diff -- additions, removals, and unchanged lines. Useful for reviewing your own edits before a commit.",
    category: "text",
    keywords: ["diff", "compare", "text compare", "changes", "line diff"],
    relatedCourseSlugs: ["git-apis-sql"],
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    title: "URL Encoder / Decoder",
    shortDescription: "Percent-encode or decode a URL, query string, or component.",
    description:
      "Encode text for safe use in a URL (or decode it back) using your browser's own encodeURIComponent/decodeURIComponent -- handy when building or debugging query strings and API requests.",
    category: "web",
    keywords: ["url", "encode", "decode", "percent encoding", "uri", "query string"],
    relatedCourseSlugs: ["git-apis-sql", "api-testing-and-automation"],
  },
  {
    id: "base64-converter",
    slug: "base64-converter",
    title: "Base64 Encoder / Decoder",
    shortDescription: "Convert text to and from Base64.",
    description:
      "Encode plain text to Base64 or decode Base64 back to text, entirely in your browser -- useful for inspecting tokens, headers, and small encoded payloads while learning APIs.",
    category: "data",
    keywords: ["base64", "encode", "decode", "convert"],
    relatedCourseSlugs: ["git-apis-sql", "api-testing-and-automation"],
  },
  {
    id: "timestamp-converter",
    slug: "timestamp-converter",
    title: "Timestamp Converter",
    shortDescription: "Convert between a Unix timestamp and a human-readable date and time.",
    description:
      "Convert a Unix timestamp (seconds or milliseconds) to a readable date in your local timezone and UTC, or convert a date back to a timestamp -- useful when reading logs, APIs, or database rows.",
    category: "data",
    keywords: ["timestamp", "unix time", "epoch", "date", "convert"],
    relatedCourseSlugs: ["database-design-and-postgresql", "javascript-fundamentals"],
  },
  {
    id: "color-contrast-checker",
    slug: "color-contrast-checker",
    title: "Color Contrast Checker",
    shortDescription: "Check a foreground/background color pair against WCAG contrast ratios.",
    description:
      "Enter a text color and a background color to see the real WCAG 2.1 contrast ratio and whether it passes AA/AAA for normal and large text -- the same math this platform's own design system is held to.",
    category: "design",
    keywords: ["color", "contrast", "accessibility", "wcag", "a11y"],
    relatedCourseSlugs: ["html-css-fundamentals"],
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolMeta["category"]): ToolMeta[] {
  return tools.filter((t) => t.category === category);
}
