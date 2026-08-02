import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { LinkButton } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";
import { AccountNav } from "@/components/auth/account-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--color-border) bg-(--color-surface)/90 backdrop-blur supports-[backdrop-filter]:bg-(--color-surface)/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-(--color-ink)"
        >
          <LogoMark size={30} />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <PrimaryNav className="hidden md:block" />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="hidden sm:inline-flex">
            <LinkButton href="/dashboard" variant="secondary" size="sm">
              Dashboard
            </LinkButton>
          </span>
          <span className="hidden sm:inline-flex">
            <AccountNav />
          </span>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
