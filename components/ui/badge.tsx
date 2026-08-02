import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const toneClasses = {
  neutral: "bg-(--color-canvas) text-(--color-ink-muted) border-(--color-border)",
  brand: "bg-(--color-brand-contrast) text-(--color-brand-strong) border-transparent",
  accent: "bg-(--color-accent-contrast) text-(--color-accent) border-transparent",
  success: "bg-(--color-success-contrast) text-(--color-success) border-transparent",
  warning: "bg-(--color-warning-contrast) text-(--color-warning) border-transparent",
  danger: "bg-(--color-danger-contrast) text-(--color-danger) border-transparent",
  info: "bg-(--color-info-contrast) text-(--color-info) border-transparent",
} as const;

const dotClasses = {
  neutral: "bg-(--color-ink-faint)",
  brand: "bg-(--color-brand-strong)",
  accent: "bg-(--color-accent)",
  success: "bg-(--color-success)",
  warning: "bg-(--color-warning)",
  danger: "bg-(--color-danger)",
  info: "bg-(--color-info)",
} as const;

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
  /** Adds a small colored dot before the label -- a non-color-only way to reinforce status (e.g. "Completed") that also reads fine to a screen reader, since the label text carries the meaning either way. */
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotClasses[tone])}
        />
      )}
      {children}
    </span>
  );
}
