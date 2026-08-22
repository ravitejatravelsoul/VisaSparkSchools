/**
 * Single source of truth for product branding, navigation, and feature flags.
 * Rename or re-theme the whole platform by editing this file.
 */

export const siteConfig = {
  name: "VisaSparkSchools",
  shortName: "VisaSpark",
  tagline: "Learn. Build. Prove.",
  description:
    "VisaSparkSchools is a self-paced learning and practice platform for programming, artificial intelligence, data, and career-ready skills -- with hands-on lessons, real runnable code, and guided projects.",
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
  /** Brand wording used specifically on the certificate document itself -- see docs/product-expansion/DECISIONS.md. */
  certificateBrand: "VS Schools",
  certificateSignatory: { name: "Naga Malleswararao Boddu", title: "CEO, VS Schools" },
  /**
   * Exact, owner-approved footer attribution -- uppercase, this precise word
   * order/spacing, is intentional and must not be reformatted, abbreviated,
   * or merged into `certificateSignatory` (a separate, differently-formatted
   * value used only for certificates, not touched by this).
   */
  footerCeoName: "BODDU NAGA MALLESWARA RAO",
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
  { href: "/study-abroad", label: "Study Abroad" },
  { href: "/search", label: "Search" },
] as const;

export const footerLinks = {
  product: [
    { href: "/learn", label: "Learn" },
    { href: "/categories", label: "Categories" },
    { href: "/technologies", label: "Technologies" },
    { href: "/roadmaps", label: "Roadmaps" },
    { href: "/topics", label: "Topics" },
    { href: "/courses", label: "Courses" },
    { href: "/projects", label: "Projects" },
    { href: "/playground", label: "Playground" },
    { href: "/study-abroad", label: "Study Abroad" },
    { href: "/tools", label: "Tools" },
    { href: "/project-studio", label: "Project Studio" },
    { href: "/certificates", label: "Certificates" },
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
  /**
   * Deliberately independent of `turnstileSiteKey` below -- presence of a
   * site key means "a key is configured," not "this deployment wants
   * CAPTCHA active." Same strict `=== "true"` pattern as aiTutorEnabled:
   * missing, "false", or any other value all fail closed to disabled;
   * nothing except the exact string "true" turns it on.
   */
  turnstileEnabled: process.env.NEXT_PUBLIC_TURNSTILE_ENABLED === "true",
} as const;

/** Public Turnstile site key -- see docs/product-expansion/RELEASE_CONFIGURATION.md; the secret is never in this repo. */
export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Real URL provided by the owner in Vercel; unset means the CTA renders a safe non-broken "coming soon" state instead of a guessed link. */
export const visaSparkUrl = process.env.NEXT_PUBLIC_VISASPARK_URL;
