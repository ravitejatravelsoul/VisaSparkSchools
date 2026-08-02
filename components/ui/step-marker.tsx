import { cn } from "@/lib/utils/cn";
import { CheckIcon } from "@/components/ui/icons";

export type StepMarkerStatus = "not-started" | "in-progress" | "completed";

/**
 * The circular marker used along a "pathway" (roadmap steps, course lesson
 * nav): a number, or a check once complete. Meaning is never color-only --
 * the check glyph and the number both carry it, and callers additionally
 * provide a visible text label next to the marker.
 */
export function StepMarker({
  status,
  index,
  current = false,
  className,
}: {
  status: StepMarkerStatus;
  index: number;
  /** Highlights this as "you are here" with an accent ring, independent of completion. */
  current?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold",
        status === "completed" &&
          "border-(--color-success) bg-(--color-success) text-(--color-success-contrast)",
        status === "in-progress" &&
          "border-(--color-accent) bg-(--color-accent-contrast) text-(--color-accent-strong)",
        status === "not-started" &&
          "border-(--color-border-strong) bg-(--color-surface) text-(--color-ink-faint)",
        current && "ring-2 ring-(--color-accent) ring-offset-2 ring-offset-(--color-canvas)",
        className,
      )}
    >
      {status === "completed" ? <CheckIcon width={14} height={14} /> : index}
    </span>
  );
}
