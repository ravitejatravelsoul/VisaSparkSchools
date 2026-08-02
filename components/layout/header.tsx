import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { LinkButton } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--color-border) bg-(--color-surface)/90 backdrop-blur supports-[backdrop-filter]:bg-(--color-surface)/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <LogoMark size={28} />
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-2.5 py-2 text-sm font-medium whitespace-nowrap text-(--color-ink-muted) hover:bg-(--color-canvas) hover:text-(--color-ink)"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="hidden sm:inline-flex">
            <LinkButton href="/dashboard" variant="secondary" size="sm">
              Dashboard
            </LinkButton>
          </span>
          <span className="hidden sm:inline-flex">
            <LinkButton href="/sign-in" variant="primary" size="sm">
              Sign in
            </LinkButton>
          </span>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
