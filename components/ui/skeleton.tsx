import { cn } from "@/lib/utils/cn";

/**
 * Generic loading placeholder block. Every skeleton in the app exists to
 * prevent a real, measured layout shift (see docs/DESIGN_SYSTEM.md) --
 * always size it to approximate the real content it stands in for, never
 * use a bare `fallback={null}`.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-lg bg-(--color-surface-sunken)", className)}
    />
  );
}
