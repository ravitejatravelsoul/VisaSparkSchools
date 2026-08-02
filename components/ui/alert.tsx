import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const toneClasses = {
  info: "border-(--color-info) bg-(--color-info-contrast) text-(--color-ink)",
  success: "border-(--color-success) bg-(--color-success-contrast) text-(--color-ink)",
  warning: "border-(--color-warning) bg-(--color-warning-contrast) text-(--color-ink)",
  danger: "border-(--color-danger) bg-(--color-danger-contrast) text-(--color-ink)",
  neutral: "border-(--color-border-strong) bg-(--color-surface-sunken) text-(--color-ink)",
} as const;

/**
 * Inline banner for a calm status message (a roadmap's "not certifiable"
 * notice, a recoverable sync problem, a form-level validation summary).
 * Deliberately restrained: a colored left border + tinted background, never
 * a saturated full-color block -- a recoverable sync hiccup should not look
 * like the page is broken.
 */
export function Alert({
  tone = "neutral",
  title,
  children,
  className,
}: {
  tone?: keyof typeof toneClasses;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      className={cn("rounded-xl border-l-4 p-4 text-sm", toneClasses[tone], className)}
    >
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="text-(--color-ink-muted)">{children}</div>
    </div>
  );
}
