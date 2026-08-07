import { visaSparkUrl } from "@/lib/site-config";

/**
 * Cross-site callout to VisaSpark (visa/immigration guidance -- a distinct
 * product from VisaSparkSchools, which is learning). Shown on the Study
 * Abroad directory and every country page. Never guesses a URL: if
 * NEXT_PUBLIC_VISASPARK_URL isn't configured yet, this renders a disabled
 * "coming soon" state instead of a broken or invented link -- see
 * docs/product-expansion/DECISIONS.md's "VisaSpark cross-site linking" note
 * and RELEASE_CONFIGURATION.md.
 */
export function VisaSparkCallout() {
  return (
    <div className="rounded-xl border border-(--color-accent) bg-(--color-accent-contrast) p-5">
      <p className="mb-1 text-sm font-semibold text-(--color-ink)">Planning the visa side too?</p>
      <p className="mb-3 text-sm text-(--color-ink-muted)">
        VisaSparkSchools teaches the academic and application process. For dedicated visa and
        immigration guidance, VisaSpark is a separate, optional resource -- never required to use
        this learning content.
      </p>
      {visaSparkUrl ? (
        <a
          href={visaSparkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-(--color-accent) px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Explore VisaSpark guidance
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex cursor-not-allowed items-center rounded-lg border border-(--color-border-strong) px-4 py-2 text-sm font-medium text-(--color-ink-faint)"
        >
          VisaSpark website coming soon
        </span>
      )}
    </div>
  );
}
