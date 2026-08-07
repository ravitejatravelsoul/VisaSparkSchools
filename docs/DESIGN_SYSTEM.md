# Design System

The visual and interaction language introduced in Phase 4.5 (see `PROJECT_STATUS.md`'s "Phase 4.5
— UI/UX redesign" section for the full report of what changed and why). This document describes
the system itself — the tokens, primitives, and conventions — as a reference for extending it
consistently. It does not repeat the phase-by-phase history.

## Direction

"Spark and pathway": a restrained, educational visual identity built on the existing brand green,
one warm "spark" accent (amber, reserved for the brand's own primary actions — never reused for
category color), a set of muted category/track accent hues, and a literal connecting-line motif for
ordered, step-based content (learning paths, roadmaps, course lesson navigation). The goal is calm
and legible for long reading sessions, distinctive without being decorative, and honest — no
component in this system exists to imply progress, completion, or availability that isn't real.

Deliberately avoided everywhere: full-color card backgrounds (category/difficulty color is always a
small accent — a top bar, a chip, a badge dot — never the whole card), gradients, glassmorphism,
unicode emoji as icons, decorative animation, and any component that renders identically regardless
of the real data behind it.

## Tokens (`app/globals.css`)

All colors are CSS custom properties, declared once for light mode (`:root`), once for dark mode
(`@media (prefers-color-scheme: dark)`), and mirrored in `:root[data-theme="light"|"dark"]` (which
`next-themes` sets and which always wins over the media query, so the in-app theme toggle works
regardless of OS setting). There is no Tailwind default color palette in use anywhere in this
codebase — every color utility is an arbitrary-property reference to one of these tokens, e.g.
`bg-(--color-brand)`, `border-(--accent-teal)`.

- **Surface/ink scale**: `--color-canvas`, `--color-surface`, `--color-surface-sunken`,
  `--color-border`, `--color-border-strong`, `--color-ink`, `--color-ink-muted`, `--color-ink-faint`.
- **Brand**: `--color-brand`, `--color-brand-strong`, `--color-brand-contrast`,
  `--color-brand-soft`.
- **Spark accent**: `--color-accent`, `--color-accent-strong`, `--color-accent-contrast`. Reserved
  for the brand's own highlighted moments (the `SparkIcon`, an `accent`-variant button) — never
  used for category/subject color, so it's never confused with a category chip.
- **Semantic status**: `--color-success`/`--color-warning`/`--color-danger`/`--color-info`, each
  with a matching `-contrast` tint for badge/alert backgrounds.
- **Category/track accent hues** (7): `blue`, `purple`, `teal`, `rose`, `indigo`, `cyan`, `lime` —
  each as `--accent-<hue>` (solid) and `--accent-<hue>-contrast` (light tint). Never used as a full
  card background; see "Category and track accents" below.
- **Motion**: `--motion-fast` (120ms), `--motion-base` (200ms), `--motion-ease`. Every transition
  and the one entrance animation (`.animate-fade-up`) use these instead of ad hoc durations.

## Typography and spacing

- Headings (`h1`–`h4`) get a shared, slightly tightened letter-spacing and heavier weight (a base
  rule in `globals.css`, not a utility class — every heading gets it automatically).
- `.reading-column` (`max-width: 42rem`) is applied to prose-heavy sections (lesson explanation,
  takeaway, summary, objectives) for a comfortable reading measure. Code/exercise sections
  deliberately opt out (`narrow={false}` on the lesson page's `Section` helper) and use the full
  available width, since code benefits from more horizontal room than prose does.
- Spacing follows Tailwind's default scale throughout; no custom spacing tokens were introduced.

## Motion and reduced-motion

`prefers-reduced-motion: reduce` is honored globally by a base rule that forces
`animation-duration`/`transition-duration` to near-zero and `scroll-behavior: auto` for every
element — this predates Phase 4.5 and already covers everything added in it. The one new keyframe
animation, `.animate-fade-up` (a short fade + 6px rise, used for section reveals and dialog
entrances), has its own explicit reduced-motion override besides. There is no scroll-jacking,
parallax, or looping decorative animation anywhere in the app, and none should be added.

## Primitives (`components/ui/`)

Pages should compose these rather than repeating raw Tailwind strings for the same visual pattern.

| Component                      | Purpose                                                                                                                                                                                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Button` / `LinkButton`        | `primary`/`secondary`/`accent`/`ghost`/`danger` variants, `sm`/`md`/`lg` sizes. Press feedback (`active:scale-[0.98]`) and hover feedback built in.                                                                                                                |
| `Card` / `CardBody`            | Base surface. `interactive` adds hover lift + shadow for a card that's itself a link/button target.                                                                                                                                                                |
| `Badge`                        | `neutral`/`brand`/`accent`/`success`/`warning`/`danger`/`info` tones, optional `dot` (a small colored dot before the label — status is never color-only, since the label text and, when present, the dot both carry the meaning).                                  |
| `Alert`                        | Calm status banner: colored left border + tinted background, never a saturated full-color block. `role="alert"` only for `warning`/`danger`; `role="status"` otherwise, so a routine sync hiccup doesn't interrupt a screen reader the way a real error should.    |
| `EmptyState`                   | Consistent "nothing here yet" treatment with an optional icon and action.                                                                                                                                                                                          |
| `PageHeader` / `SectionHeader` | Top-of-page and sub-section headings with a consistent structure (eyebrow/title/description/action).                                                                                                                                                               |
| `Skeleton`                     | Generic loading placeholder block. Always size it to approximate the real content it stands in for (see "CLS discipline" below) — never `fallback={null}`.                                                                                                         |
| `ProgressBar`                  | `role="progressbar"` with full `aria-value*` attributes. `sm`/`md` sizes, `brand`/`accent`/`success` tones.                                                                                                                                                        |
| `StepMarker`                   | The circular marker for the pathway motif: a number, or a check once `status: "completed"`. `current` adds an accent ring for "you are here." Meaning is never color-only.                                                                                         |
| `Breadcrumbs`                  | Accessible breadcrumb trail; current page is not a link.                                                                                                                                                                                                           |
| `icons.tsx`                    | Hand-drawn 24×24 `currentColor` SVG icon set (same convention as `components/directory/category-icon.tsx`), `aria-hidden` — the action it sits inside always has its own accessible name from visible text or an explicit `aria-label`. No icon library, no emoji. |

## Category and track accents (`lib/ui/category-accent.ts`, `lib/ui/track-accent.ts`)

Each of the 16 technology categories and 6 learning tracks maps to one of the 7 accent hues via an
explicit, literal `Record` — not computed by cycling an array or by string interpolation. Two
reasons for both choices:

1. **Explicit, not cycled**: keeps visually similar categories from landing on the same or an
   adjacent hue by accident, and makes rebalancing a one-line change.
2. **Literal, not interpolated**: Tailwind's build-time class scanner only recognizes complete
   class-name strings that appear literally in source. A version of this file that built class
   names via `` `border-(--accent-${hue})` `` passed type-checking and looked correct, but silently
   generated no CSS at all — confirmed as a real bug during Phase 4.5 (see `PROJECT_STATUS.md`).
   Every hue's full class strings are written out literally in the `ACCENT_CLASSES`/`TRACK_ACCENT`
   maps for exactly this reason.

Each hue exposes `chipBg`/`chipFg` (a light-tint background + solid foreground, for an icon chip or
small badge), `border` (solid `border-color` — **only** safe on an element with no other
`border-color` utility already applied, since two same-property utility classes resolve by their
position in the compiled stylesheet, not by their order in `className`), and `bar` (a solid
`background-color`, for a thin accent stripe on an already-bordered card — the collision-free
choice, and the one used almost everywhere in practice). Category/track color is always a small
accent, never a full card background.

## The pathway motif (`.path-track` / `.path-track-line`, `StepMarker`)

A thin vertical line drawn behind a column of `StepMarker`s, used only for content that is
genuinely, internally ordered: a single roadmap's own steps (`/roadmaps/[slug]`) and a single
course's own lesson list (the lesson page's course-navigation sidebar, `/courses/[courseSlug]`).
It is deliberately **not** used to relate different courses/topics to each other -- `/topics` (née
`/paths`) and the homepage's topic list are independent, unordered choices, not steps, so they
render as a plain wrapped list/grid with no line and no step numbers. See "Learning model:
independent courses" in `docs/ARCHITECTURE.md` for why that distinction matters. Usage:

```tsx
<ol className="path-track flex flex-col gap-4">
  <span
    className="path-track-line"
    style={{ "--track-line-left": "0.875rem" } as CSSProperties}
    aria-hidden="true"
  />
  {items.map((item, i) => (
    <li key={item.id}>
      <StepMarker status={item.status} index={i + 1} />
      {/* ... */}
    </li>
  ))}
</ol>
```

`--track-line-left` positions the line under the marker column and must be computed per layout: it
defaults to `50%` (a centered timeline), but for a left-aligned marker column it should equal the
marker's horizontal center — half the marker's width (`StepMarker` is 28px, so 14px/`0.875rem`)
plus any padding between the track's own left edge and the marker (e.g. a `Card`'s `p-4` adds 16px,
so a marker inside one needs `1px border + 16px padding + 14px half-marker = 31px/1.9375rem`).

**Stacking note**: `.path-track-line` is `position: absolute`, which — per normal CSS painting
order — renders _above_ ordinary in-flow (`position: static`) siblings, regardless of DOM order.
If each step is wrapped in its own opaque `Card`, that card must be `position: relative` (even
without an explicit `z-index`) so it moves into the same "positioned" paint layer as the line and,
being later in DOM order, paints over it — otherwise the line visibly cuts across each card instead
of hiding behind it. (Rows with no background of their own don't need this — there's nothing for
the line to visually collide with.)

## CLS discipline

Any component that reads from `localStorage`-backed client state (Zustand stores) or
`useSearchParams()` cannot render its real content in the static server-rendered shell, and a
`Suspense`/hydration boundary with no sized fallback causes a real, measured layout shift once the
real content pops in — this has been a recurring, real bug across every phase of this project
(`/technologies` in Phase 3, `/dashboard` in Phase 4, `/playground` in Phase 4.5), never a
theoretical concern. The fix is always the same: a `Skeleton`-based fallback sized to approximate
the real content's height. When changing a page's layout in a way that affects one of these
skeletons, re-check that the skeleton's block sizes still approximate the new layout — see each
skeleton's own doc comment (`DashboardSkeleton`, `DirectorySkeleton`, `PlaygroundSkeleton`) for the
specific real-content shape it's standing in for.

## Modal dialogs (`lib/hooks/use-modal-a11y.ts`)

Every "bottom sheet" / drawer-style dialog in the app (`MobileNav`, the lesson page's
`CourseNavMobile`, the technology directory's `FilterDrawer`, `TutorLauncher`'s mobile panel) uses
this one shared hook rather than its own hand-rolled keyboard handling. It focuses an initial
element on open, traps `Tab`/`Shift+Tab` within the dialog's container so keyboard focus can never
escape into the page behind it, closes on `Escape`, restores focus to the trigger element on close,
and locks body scroll while open. If a new modal-style dialog is added, use this hook rather than
reimplementing the pattern — a missing Tab-trap was a real, confirmed accessibility bug across all 4
existing dialogs before this hook existed (see `PROJECT_STATUS.md`).

A dialog nested inside an ancestor with `filter` or `backdrop-filter` (e.g. the header's
`backdrop-blur`) needs `position: fixed` content rendered through a React portal
(`createPortal(..., document.body)`) rather than left in place — both properties create a new
containing block for `position: fixed` descendants per the CSS spec, which silently breaks a
`fixed inset-0` dialog's sizing (confirmed as a real bug in `MobileNav` during Phase 4.5).

## Accessibility conventions

- Status is never color-only: `Badge`'s `dot` prop and `StepMarker`'s check-vs-number glyph both
  exist so a status has a non-color signal in addition to its tone.
- Every interactive icon-only control has an explicit `aria-label`; every decorative icon is
  `aria-hidden="true"`.
- `:focus-visible` gets a high-contrast 3px outline globally (`app/globals.css`) — never remove it
  on a redesigned component.
- Run `tests/e2e/accessibility.spec.ts` (axe, `wcag2a`/`wcag2aa`/`wcag22aa`) after any visual change
  that touches DOM structure, headings, or color.

## What not to do

- Don't add a new color outside the token set above, and don't reach for Tailwind's default color
  palette (`bg-blue-500` etc.) — this codebase has none of it, by design, so every color stays
  themeable and auditable in one place.
- Don't give a category/track accent a full card background — always a small accent (bar, chip,
  badge dot).
- Don't build a new modal/drawer without `lib/hooks/use-modal-a11y.ts`.
- Don't add a `Suspense` boundary around client state without a properly-sized `Skeleton` fallback.
- Don't add decorative animation, parallax, or scroll-jacking.
