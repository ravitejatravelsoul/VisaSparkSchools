import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const toneClasses = {
  neutral: "bg-(--color-canvas) text-(--color-ink-muted) border-(--color-border)",
  brand: "bg-(--color-brand-contrast) text-(--color-brand-strong) border-transparent",
  accent: "bg-(--color-accent-contrast) text-(--color-accent) border-transparent",
  success: "bg-(--color-brand-contrast) text-(--color-success) border-transparent",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
