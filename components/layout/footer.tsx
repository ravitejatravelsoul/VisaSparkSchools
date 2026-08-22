import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/brand/logo-mark";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-(--color-border) bg-(--color-surface)">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <LogoMark size={24} />
            {siteConfig.name}
          </div>
          <p className="mt-2 max-w-xs text-sm text-(--color-ink-muted)">{siteConfig.tagline}</p>
        </div>
        <FooterColumn title="Product" links={footerLinks.product} />
        <FooterColumn title="Company" links={footerLinks.company} />
        <FooterColumn title="Legal" links={footerLinks.legal} />
      </Container>
      <Container className="flex flex-col gap-2 border-t border-(--color-border) py-6 text-xs text-(--color-ink-faint) sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Public beta. Developed by{" "}
            {siteConfig.developerName}
          </p>
          <p className="mt-1.5">
            <Badge tone="brand">CEO: {siteConfig.footerCeoName}</Badge>
          </p>
        </div>
        <p>Built for learning. Not affiliated with any other coding tutorial site.</p>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-(--color-ink)">{title}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-(--color-ink-muted) hover:text-(--color-ink)"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
