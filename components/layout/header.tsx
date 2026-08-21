import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileHeaderCta } from "@/components/layout/mobile-header-cta";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { LinkButton } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";
import { AccountNav } from "@/components/auth/account-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--color-border) bg-(--color-surface)/90 backdrop-blur supports-[backdrop-filter]:bg-(--color-surface)/70">
      {/*
        A wider cap than the site's usual `max-w-6xl` content column
        (Container's default) -- at 6xl, the full primary nav plus every CTA
        button never fit even on very wide viewports (the row is capped, not
        viewport-limited), which was forcing button text to wrap onto two
        lines and the brand name to truncate at literally every desktop
        width. This is scoped to the header only via a local wrapper, not a
        change to the shared Container component used by page content.
      */}
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="flex min-w-0 shrink items-center gap-2 text-lg font-bold tracking-tight text-(--color-ink)"
        >
          {/*
            The brand name is always visible now (never icon-only), but below
            400px it switches to `shortName` -- "VisaSparkSchools" plus the
            mobile CTA and menu button don't all fit at 320-390px widths, and
            an icon-only wordmark isn't a real brand identity. See Issue 3 of
            the mobile-header audit: never silently fall back to icon-only.
            `truncate`/`shrink` stay on as a safety net for any width this
            wasn't explicitly tuned against, not as the primary fix.
          */}
          <LogoMark size={28} className="shrink-0" />
          <span className="truncate min-[400px]:hidden">{siteConfig.shortName}</span>
          <span className="hidden truncate min-[400px]:inline">{siteConfig.name}</span>
        </Link>

        {/*
          Reveals at `xl` (1280px), not `md` (768px): the primary nav's 6
          links plus every CTA button don't fit without truncating the brand
          name or wrapping button text until roughly this width (verified by
          rendering at 768/1024/1152/1280/1920). Below `xl`, MobileNav's
          drawer covers the same links instead, all the way up through the
          "tablet/small-laptop" range where the full bar has no room.
        */}
        <PrimaryNav className="hidden xl:block" />

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden sm:inline-flex">
            <ThemeToggle />
          </span>
          <span className="hidden sm:inline-flex">
            <LinkButton href="/study-studio" variant="secondary" size="sm">
              Study Studio
            </LinkButton>
          </span>
          <span className="hidden xl:inline-flex">
            <LinkButton href="/certificates" variant="secondary" size="sm">
              Certificates
            </LinkButton>
          </span>
          <span className="hidden sm:inline-flex">
            <LinkButton href="/dashboard" variant="secondary" size="sm">
              Dashboard
            </LinkButton>
          </span>
          <span className="hidden sm:inline-flex">
            <AccountNav />
          </span>
          <MobileHeaderCta />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
