import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

/** Accessible breadcrumb trail: an ordered nav landmark, current page not a link. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-(--color-ink-faint)">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            // Keyed by label+index, not label alone: a track and its course
            // can legitimately share the exact same display name (e.g. "Git,
            // APIs & SQL"), which produced a real React duplicate-key error
            // on those lesson pages before this.
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {i > 0 && (
                <span aria-hidden="true" className="px-0.5">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="underline decoration-(--color-border-strong) underline-offset-2 hover:text-(--color-ink)"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-(--color-ink)" : ""}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
