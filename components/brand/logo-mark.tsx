/**
 * Original VisaSparkSchools mark: a bold "V" doubling as an open book viewed
 * edge-on, a code-cursor tick, and a spark accent. Uses the app's existing
 * (WCAG-AA-verified) brand/accent CSS custom properties so it adapts
 * automatically across light/dark themes -- see docs/BRANDING.md.
 */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      className={className}
    >
      <rect width="64" height="64" rx="15" fill="var(--color-brand-strong)" />
      <path
        d="M16 15 L32 47"
        stroke="var(--color-brand-contrast)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M48 15 L32 47"
        stroke="var(--color-brand-contrast)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="45.5" y="7" width="5" height="12" rx="2.5" fill="var(--color-brand-contrast)" />
      <path
        d="M13 6.5 L14.6 10.9 L19 12.5 L14.6 14.1 L13 18.5 L11.4 14.1 L7 12.5 L11.4 10.9 Z"
        fill="var(--color-accent)"
      />
    </svg>
  );
}
