"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Each tool is its own dynamic import so /tools/[toolSlug] only ever ships
// the one tool's implementation, never all seven -- mirroring the Study
// Studio tab pattern (components/study-studio/study-studio-tabs.tsx).
const TOOL_COMPONENTS: Record<string, ReturnType<typeof dynamic>> = {
  "json-formatter": dynamic(
    () => import("@/components/tools/json-formatter").then((m) => m.JsonFormatterTool),
    { loading: () => <Skeleton className="h-64 w-full" /> },
  ),
  "regex-tester": dynamic(
    () => import("@/components/tools/regex-tester").then((m) => m.RegexTesterTool),
    { loading: () => <Skeleton className="h-64 w-full" /> },
  ),
  "text-diff": dynamic(() => import("@/components/tools/text-diff").then((m) => m.TextDiffTool), {
    loading: () => <Skeleton className="h-64 w-full" />,
  }),
  "url-encoder": dynamic(
    () => import("@/components/tools/url-encoder").then((m) => m.UrlEncoderTool),
    { loading: () => <Skeleton className="h-64 w-full" /> },
  ),
  "base64-converter": dynamic(
    () => import("@/components/tools/base64-converter").then((m) => m.Base64ConverterTool),
    { loading: () => <Skeleton className="h-64 w-full" /> },
  ),
  "timestamp-converter": dynamic(
    () => import("@/components/tools/timestamp-converter").then((m) => m.TimestampConverterTool),
    { loading: () => <Skeleton className="h-64 w-full" /> },
  ),
  "color-contrast-checker": dynamic(
    () =>
      import("@/components/tools/color-contrast-checker").then((m) => m.ColorContrastCheckerTool),
    { loading: () => <Skeleton className="h-64 w-full" /> },
  ),
};

export function ToolRunner({ slug }: { slug: string }) {
  const Tool = TOOL_COMPONENTS[slug];
  if (!Tool) return null;
  return <Tool />;
}
