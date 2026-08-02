import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Consistent top-of-page header: eyebrow (optional) + H1 + description +
 * an optional right-aligned action slot. Replaces the ad-hoc
 * `<h1 className="text-3xl font-bold">` + `<p>` pairs repeated at the top
 * of nearly every route with one shared, responsive layout.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-4", className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-(--color-accent) uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold text-(--color-ink) sm:text-4xl">{title}</h1>
        {description && <p className="mt-2.5 text-base text-(--color-ink-muted)">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Smaller heading for a sub-section within a page (a dashboard section, a catalog group), with an optional "view all"-style link. */
export function SectionHeader({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex flex-wrap items-end justify-between gap-3", className)}>
      <div>
        <h2 className="text-lg font-semibold text-(--color-ink)">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-(--color-ink-faint)">{description}</p>}
      </div>
      {action}
    </div>
  );
}
