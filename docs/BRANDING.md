# Brand guide — VisaSparkSchools

This is the canonical reference for the VisaSparkSchools identity: naming, logo system, color,
typography, and usage rules. The single source of truth for the _values_ (name, tagline,
description, asset paths, contact info, feature flags) is `lib/site-config.ts` — this document
explains what those values mean and how to use the visual assets correctly. If code and this doc
ever disagree, `lib/site-config.ts` and the files in `public/brand/` are authoritative.

## Naming

- **Full name:** VisaSparkSchools (one word, three capitalized segments — not "Visa Spark
  Schools" or "Visasparkschools").
- **Short name** (for space-constrained UI like a home-screen icon label): VisaSpark.
- **Tagline:** Learn. Build. Prove.
- **Positioning statement:** A self-paced learning and practice platform for programming,
  artificial intelligence, data, and career-ready skills — with hands-on lessons, real
  runnable code, and guided projects.

Do not abbreviate to "VSS" in learner-facing copy — it's undocumented and reads as a typo. It's
fine internally (e.g. a Slack channel name) but not in the product.

## What the name means

"Visa" evokes crossing a threshold into a new capability; "Spark" is the moment of understanding;
"Schools" is the plural, multi-subject nature of the curriculum (programming, AI, data, cloud,
security, aptitude, and career prep, not a single-topic bootcamp). The name intentionally does
**not** reference immigration/travel visas — see "What to avoid" below for imagery constraints
that follow from this.

## Logo system

All source files live in `public/brand/`. The mark is a hand-authored SVG, not a photo, emoji, or
stock asset.

| File                                                                                                                                             | Purpose                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/brand/logo-mark.svg`                                                                                                                     | Icon-only mark. Use anywhere space is tight (avatars, app icons, loading spinners).                                                                                                                                                                                       |
| `public/brand/logo.svg`                                                                                                                          | Full horizontal lockup (mark + wordmark) for **light** backgrounds.                                                                                                                                                                                                       |
| `public/brand/logo-dark.svg`                                                                                                                     | Full horizontal lockup for **dark** backgrounds.                                                                                                                                                                                                                          |
| `public/brand/logo-monochrome.svg`                                                                                                               | Single-color (`currentColor`) version for print, watermarks, or contexts that can't render the brand gradient.                                                                                                                                                            |
| `public/brand/og-source.svg`                                                                                                                     | Source composition for the default social-preview image (`public/og-default.png`, 1200×630, generated from this file via `sharp`).                                                                                                                                        |
| `public/favicon.svg`                                                                                                                             | Browser-tab icon (copy of the mark).                                                                                                                                                                                                                                      |
| `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `public/favicon-16.png`, `public/favicon-32.png`, `app/favicon.ico` | Rasterized icon sizes generated from `logo-mark.svg` via `sharp`. Regenerate with a short one-off script if the mark ever changes (`sharp(svgBuffer).resize(size,size).png().toFile(...)`); there is no permanent build-time step for this since the mark changes rarely. |

Inside the app itself, prefer the live `<LogoMark />` React component
(`components/brand/logo-mark.tsx`) over the static SVG files. It renders the same mark using the
app's existing CSS custom properties (`--color-brand-strong`, `--color-brand-contrast`,
`--color-accent`), so it automatically matches the current light/dark theme without needing a
separate light/dark swap — that's what the header and footer use.

### What the mark depicts

A bold "V" (VisaSparkSchools monogram) that doubles as an open book viewed edge-on (the two
strokes meeting at a point, like a book's pages), with a small rounded tick at the top-right
standing in for a text-editor cursor, and a four-point spark accent at the top-left. All four
required concepts — book/learning, code, spark/discovery, V-monogram — read from the same simple
shape, which is why it survives shrinking to favicon size.

### Minimum sizes

- Icon mark: do not render below 20×20px in product UI. At 16×16 (favicon tray size) the spark
  and cursor details soften into the badge, which is expected and acceptable — the rounded-square
  silhouette and bold V shape are what needs to stay legible at that size, and they do.
- Horizontal wordmark lockup: do not render below 120px wide, or the wordmark text becomes hard
  to read.

### Clear space

Keep clear space around the mark equal to at least the width of the spark accent on all sides
when placing it next to other UI elements (this is naturally satisfied by the existing header/
footer padding; don't crowd it inside custom layouts).

### Color

The logo deliberately reuses the app's existing, contrast-verified design tokens rather than
introducing a new palette (see `app/globals.css`):

| Token                                    | Light value           | Dark value            | Used for                                              |
| ---------------------------------------- | --------------------- | --------------------- | ----------------------------------------------------- |
| `--color-brand` / `--color-brand-strong` | `#14532d` / `#0d3d21` | `#4ade80` / `#86efac` | Mark background                                       |
| `--color-brand-contrast`                 | `#ecfdf3`             | `#08240f`             | Mark foreground (the V/book/cursor shape)             |
| `--color-accent`                         | `#b45309`             | `#fb923c`             | Spark accent, and the "Spark" segment of the wordmark |

These pairs were already verified for WCAG AA text contrast during the original build (see
`PROJECT_STATUS.md`); reusing them means the rebrand carries that verification forward instead of
requiring a fresh audit of a brand-new palette.

### Typography

The wordmark in the static SVG files uses the system UI sans-serif stack
(`ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`) at weight 700, so it
renders correctly without embedding a font file in the SVG. In the live app, product UI text
(including the header's `{siteConfig.name}` text next to `<LogoMark />`) uses the app's existing
Geist Sans/Geist Mono font stack (`app/layout.tsx`) — unchanged by this rebrand.

### Usage rules

- Do use the mark on the app's own canvas/surface background colors, or on a solid brand-green
  fill (as in `og-source.svg`).
- Do use `logo-dark.svg` (not `logo.svg` with manual color overrides) on dark photography or
  dark-brand-green backgrounds outside the app shell.
- Don't stretch, skew, recolor individual strokes, rotate, or add drop shadows/outlines to the
  mark.
- Don't place the light-background lockup (`logo.svg`) directly on a busy photo — use the mark
  alone with sufficient padding, or `logo-monochrome.svg`, instead.
- Don't recreate the wordmark in a different typeface for marketing collateral without updating
  this file first.

### What to avoid (and why)

Per the product brief, the mark and all brand imagery deliberately avoid:

- **Passport or government-emblem imagery** — despite "Visa" in the name, this product has
  nothing to do with immigration/travel visas, and imagery suggesting otherwise would be actively
  misleading.
- **Visa-card / payment-network imagery** — same reasoning, avoids confusion with the payment
  brand "Visa."
- **Graduation-cap clip art, generic "AI brain" icons, or stock photography** — overused in the
  ed-tech/AI space to the point of being meaningless; an original geometric mark is more
  distinctive and more honest (it doesn't imply accreditation the way a graduation cap can).
- **Emoji as the primary logo** — not distinctive, not scalable as a real brand asset, renders
  inconsistently across platforms.

## Voice and tone

Plain, direct, technically credible, and honest about beta status and current limitations (see
"Known limitations" in `PROJECT_STATUS.md` and `README.md`). Never claim accreditation,
certification authority, learner counts, ratings, or testimonials that don't exist — this rule
applies to marketing copy exactly as much as it applies to application code. Completion
certificates are not implemented yet (tracked as a future phase); do not reference them in
learner-facing copy until they ship.

## Where branding is centralized in code

- `lib/site-config.ts` — name, short name, tagline, description, URL, developer credit, social
  links (currently unset — see below), contact email, legal entity name, certificate issuer name,
  and every brand asset path.
- `components/brand/logo-mark.tsx` — the live, theme-aware mark component.
- `components/layout/header.tsx` / `components/layout/footer.tsx` — the two places the mark and
  name render together in the app shell.
- `app/layout.tsx` — page-level `<title>` template, Open Graph/Twitter card metadata, and icon
  declarations, all derived from `siteConfig`.
- `app/manifest.ts` — PWA manifest name/short_name/icons, derived from `siteConfig`.

`siteConfig.social.github` and `.twitter` are intentionally left `undefined` rather than pointing
at a placeholder URL — there are no official VisaSparkSchools social accounts yet, and linking to
one that doesn't exist (or that someone else owns) would be misleading. Fill these in only when
real, owned accounts exist.

## Migration note (CodeWise → VisaSparkSchools)

This product was previously named CodeWise. The rename touched display text, metadata, and two
localStorage key families:

- Guest progress: `codewise:progress` → `visasparkschools:progress`
- Per-exercise in-progress code: `codewise:code:<id>` → `visasparkschools:code:<id>`

Both are migrated automatically and non-destructively on first load under the new key (see
`lib/learning/storage.ts` and `lib/learning/use-persisted-code.ts`) — the old keys are read once,
copied forward, and then left in place as a recoverable backup rather than deleted. No learner
should lose progress because of this rename. See `PROJECT_STATUS.md` for the full list of files
touched by the rebrand.
