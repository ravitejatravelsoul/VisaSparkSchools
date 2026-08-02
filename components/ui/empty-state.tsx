import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Consistent "nothing here yet" treatment -- replaces one-off
 * `<p className="text-sm text-(--color-ink-faint)">` empty-state lines
 * scattered across the dashboard, search, and technology directory with a
 * single component, so every empty state gets the same calm, non-punitive
 * tone and (optionally) a real next action instead of a dead end.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border border-dashed border-(--color-border-strong) px-6 py-8 text-center",
        className,
      )}
    >
      {icon && (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-surface-sunken) text-(--color-ink-faint)"
        >
          {icon}
        </span>
      )}
      <p className="text-sm font-medium text-(--color-ink)">{title}</p>
      {description && <p className="max-w-sm text-sm text-(--color-ink-faint)">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
