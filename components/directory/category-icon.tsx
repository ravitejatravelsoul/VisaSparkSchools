import type { CategoryId } from "@/lib/directory/types";

/**
 * Original, hand-authored line icons for the category taxonomy -- no icon
 * library, no copied technology/brand logos, no emoji. Every icon is a
 * simple 24x24 stroke glyph using `currentColor`, matching the design
 * system's minimal aesthetic (see docs/BRANDING.md). Kept in one file/
 * switch rather than 16 separate components since each icon is a few lines.
 */
const paths: Record<CategoryId, React.ReactNode> = {
  foundations: (
    <>
      <rect x="4" y="14" width="16" height="4" rx="1" />
      <rect x="4" y="9" width="16" height="4" rx="1" />
      <rect x="4" y="4" width="16" height="4" rx="1" />
    </>
  ),
  frontend: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <circle cx="6" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  backend: (
    <>
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <path d="M8 7h.01M8 17h.01" strokeWidth="2" />
    </>
  ),
  "programming-languages": <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />,
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  databases: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  "data-science": (
    <>
      <path d="M4 20V10M11 20V4M18 20v-7" />
      <path d="M2 20h20" />
    </>
  ),
  "artificial-intelligence": (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7.7 7.2 10.5 16M16.3 7.2 13.5 16M8 6h8" />
    </>
  ),
  "cloud-devops": (
    <path d="M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17.2 9.1 4.5 4.5 0 0 1 16.5 18H7Z" />
  ),
  cybersecurity: <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />,
  "testing-qa": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  dsa: (
    <>
      <circle cx="12" cy="4" r="2" />
      <circle cx="6" cy="14" r="2" />
      <circle cx="18" cy="14" r="2" />
      <circle cx="6" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M12 6 6 12M12 6l6 6M6 15.5V18.5M18 15.5V18.5" />
    </>
  ),
  "developer-tools": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M12 15h5" />
    </>
  ),
  "quantitative-aptitude": (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 8h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" strokeWidth="2" />
    </>
  ),
  reasoning: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.7 10.7c.5.4.7 1 .7 1.6v.2h6v-.2c0-.6.2-1.2.7-1.6A6 6 0 0 0 12 3Z" />
    </>
  ),
  "career-gd": (
    <>
      <path d="M4 5h11v7H8l-4 3v-3H4z" />
      <path d="M13 9h7v6h-2v3l-3-3h-2" />
    </>
  ),
};

export function CategoryIcon({
  id,
  size = 24,
  className,
}: {
  id: CategoryId;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[id]}
    </svg>
  );
}
