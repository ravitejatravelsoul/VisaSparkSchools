import { cn } from "@/lib/utils/cn";

/**
 * Shared progress bar -- consolidates what was previously four separate
 * hand-rolled `h-2 rounded-full bg-(--color-canvas)` + inline-width-fill
 * implementations (dashboard course/project rows, course-progress-actions,
 * roadmap-progress, project-milestone-checklist).
 */
export function ProgressBar({
  value,
  label,
  size = "md",
  tone = "brand",
  className,
}: {
  /** 0-100 */
  value: number;
  /** Accessible name for the progress element -- required, since a bare bar has no visible label of its own. */
  label: string;
  size?: "sm" | "md";
  tone?: "brand" | "accent" | "success";
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const fillClass = {
    brand: "bg-(--color-brand)",
    accent: "bg-(--color-accent)",
    success: "bg-(--color-success)",
  }[tone];

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "w-full overflow-hidden rounded-full bg-(--color-surface-sunken)",
        size === "sm" ? "h-1.5" : "h-2",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-300", fillClass)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
