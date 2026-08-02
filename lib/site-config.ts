/**
 * Single source of truth for product branding, navigation, and feature flags.
 * Rename or re-theme the whole platform by editing this file.
 */

export const siteConfig = {
  name: "VisaSparkSchools",
  shortName: "VisaSpark",
  tagline: "Learn. Build. Prove.",
  description:
    "VisaSparkSchools is a self-paced learning and practice platform for programming, artificial intelligence, data, and career-ready skills -- with hands-on lessons, guided projects, and honest completion certificates.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  developerName: "Raviteja Vemulapelli",
  locale: "en-US",
  social: {
    // No official social accounts exist yet -- leave unset rather than
    // link to a placeholder that isn't actually owned by this project.
    github: undefined as string | undefined,
    twitter: undefined as string | undefined,
  },
  contactEmail: "hello@visasparkschools.example",
  legal: {
    entityName: "VisaSparkSchools (public beta — no registered legal entity yet)",
  },
  /** Name shown on completion certificates once that feature ships (docs/CERTIFICATES.md). */
  certificateIssuer: "VisaSparkSchools",
  brand: {
    logo: "/brand/logo.svg",
    logoDark: "/brand/logo-dark.svg",
    logoMark: "/brand/logo-mark.svg",
    logoMonochrome: "/brand/logo-monochrome.svg",
    favicon: "/favicon.svg",
    appleTouchIcon: "/apple-touch-icon.png",
    ogImage: "/og-default.png",
  },
} as const;

export const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/courses", label: "Courses" },
  { href: "/projects", label: "Projects" },
  { href: "/playground", label: "Playground" },
  { href: "/search", label: "Search" },
] as const;

export const footerLinks = {
  product: [
    { href: "/learn", label: "Learn" },
    { href: "/categories", label: "Categories" },
    { href: "/technologies", label: "Technologies" },
    { href: "/roadmaps", label: "Roadmaps" },
    { href: "/paths", label: "Learning Paths" },
    { href: "/courses", label: "Courses" },
    { href: "/projects", label: "Projects" },
    { href: "/playground", label: "Playground" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/accessibility", label: "Accessibility" },
  ],
} as const;

/**
 * Feature flags for optional integrations. Both default to "off" so the
 * platform is fully usable with zero external services configured.
 */
export const featureFlags = {
  supabaseEnabled: Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
  aiTutorEnabled: process.env.NEXT_PUBLIC_AI_TUTOR_ENABLED === "true",
} as const;
