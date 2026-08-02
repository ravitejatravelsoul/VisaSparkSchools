"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * A client component only for the active-route underline (needs
 * `usePathname`) -- kept small and separate from `Header` so the rest of
 * the header stays a server component.
 */
export function PrimaryNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-1">
        {navLinks.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-[var(--motion-fast)]",
                  active
                    ? "text-(--color-ink)"
                    : "text-(--color-ink-muted) hover:bg-(--color-surface-sunken) hover:text-(--color-ink)",
                )}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-(--color-accent)"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Same active-state logic, list layout, for the mobile drawer. */
export function PrimaryNavMobile({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-col gap-1">
        {navLinks.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium",
                  active
                    ? "bg-(--color-brand-soft) text-(--color-brand-strong)"
                    : "text-(--color-ink) hover:bg-(--color-surface-sunken)",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
