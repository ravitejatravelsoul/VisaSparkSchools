/**
 * Small, original hand-drawn line-icon set -- same convention as
 * components/directory/category-icon.tsx (24x24 viewBox, `stroke="currentColor"`,
 * no fill, no icon library, no emoji). Added to replace unicode glyphs
 * (»/«, ☰, ←/→, ✓/✗, ☆/★) that were scattered across the app with
 * inconsistent sizing and no shared visual language. Every icon is
 * `aria-hidden` -- the action it sits inside always has its own accessible
 * name from visible text or an explicit `aria-label`.
 */
import type { SVGProps } from "react";

function Base(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 20}
      height={props.height ?? 20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="m5 12 5 5 9-10" />
    </Base>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="m9 6 6 6-6 6" />
    </Base>
  );
}

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="m15 6-6 6 6 6" />
    </Base>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Base>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  );
}

export function BookmarkIcon({
  filled = false,
  ...props
}: SVGProps<SVGSVGElement> & { filled?: boolean }) {
  return (
    <Base {...props} fill={filled ? "currentColor" : "none"}>
      <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V20l-6-3.5L6 20V4.5Z" />
    </Base>
  );
}

/** The brand's "spark" glyph -- a small 4-point star, used sparingly to mark a genuinely new/highlighted moment (a streak, a recommendation), not decoratively. */
export function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props} fill="currentColor" stroke="none">
      <path d="M12 2.5c.4 3.6 1.2 5.9 2.5 7.2 1.3 1.3 3.6 2.1 7 2.5-3.4.4-5.7 1.2-7 2.5-1.3 1.3-2.1 3.6-2.5 7.3-.4-3.7-1.2-6-2.5-7.3-1.3-1.3-3.6-2.1-7-2.5 3.4-.4 5.7-1.2 7-2.5 1.3-1.3 2.1-3.6 2.5-7.2Z" />
    </Base>
  );
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props} fill="currentColor" stroke="none">
      <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4.22 4.22a1 1 0 0 1 1.42 0l.7.71a1 1 0 1 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42Zm14.36 14.36a1 1 0 0 1 1.42 0l.7.71a1 1 0 1 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42ZM1 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm18 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.22 19.78a1 1 0 0 1 0-1.42l.71-.7a1 1 0 1 1 1.41 1.41l-.7.71a1 1 0 0 1-1.42 0ZM18.58 5.63a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.42l-.7.7a1 1 0 0 1-1.42 0Z" />
    </Base>
  );
}

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props} fill="currentColor" stroke="none">
      <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-4.508 0-8.16-3.653-8.16-8.16 0-1.22.27-2.378.753-3.416a.75.75 0 0 0-.918-1.021A10.5 10.5 0 1 0 21.86 13.93a.75.75 0 0 0-1.118-.884Z" />
    </Base>
  );
}

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </Base>
  );
}

export function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M3 3l18 18" />
      <path d="M10.58 5.11A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a15.6 15.6 0 0 1-3.29 4.14M6.5 6.63C3.87 8.34 2 12 2 12s3.5 7 10 7a9.9 9.9 0 0 0 4.15-.9" />
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    </Base>
  );
}
