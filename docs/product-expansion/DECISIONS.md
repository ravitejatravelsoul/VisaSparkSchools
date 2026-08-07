# Product Expansion — Architecture & Product Decisions

## Guest vs authenticated behavior

- Guests may browse every course/topic, run lessons, and keep **local-only** progress exactly as
  today. Guests may **not** issue or download a permanent certificate. This is a tightening of
  behavior (not a new restriction on learning), matching the brief's explicit product rule.
- Dashboard becomes fully authenticated-only for data display; the route stays reachable from nav
  for discoverability and shows a gate when signed out.
- Rationale: a certificate described as "independently verifiable" that only exists in
  `localStorage` is misleading. Independent verification requires a server-side row a third party
  can query -- which requires an account.

## Profile and certificate name handling

- New `profiles` table columns (migration `0007`, pending review/apply -- see
  `RELEASE_CONFIGURATION.md`): `first_name text`, `last_name text`, `phone_e164 text`,
  `learner_level text`, plus existing `updated_at`. `display_name`/`learning_goal`/
  `current_roadmap_id`/`timezone` already exist from earlier phases and are preserved.
- Certificate issuance (`issueCertificate` in `lib/learning/store.ts`) already snapshots
  `displayName` into the certificate row at issuance time and never re-reads it later --
  confirmed by re-reading the function during the Phase 1 audit. The expansion keeps this
  snapshot behavior and changes only what feeds `displayName` at issuance time: for an
  authenticated learner, it becomes `"${first_name} ${last_name}"` trimmed from the synced
  Supabase profile, computed at the moment "Issue certificate" is clicked, not stored redundantly
  elsewhere. A profile name edit after issuance never touches past certificates (this was already
  true and remains true).
- The pre-existing free-text `profile.displayName` field in the local progress store is not
  removed (other code paths reference it), but the Profile/Account Settings page becomes the
  authoritative place to edit first/last name for signed-in users, and issuance is gated on being
  signed in, so guests can no longer issue a certificate under an arbitrary unverified name.

## CAPTCHA choice

- Cloudflare Turnstile, via Supabase Auth's native `options.captchaToken` support on `signUp`
  (and `signInWithPassword`, if bot protection is enabled for sign-in too). No parallel reCAPTCHA
  integration. The secret key is configured only in the hosted Supabase Auth dashboard's bot
  protection settings -- never in this repository, never in a browser-visible env var.
- Local/CI test profile: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` unset (or set to Cloudflare's published
  "always passes" test site key `1x00000000000000000000AA` for widget-rendering tests) --
  documented in `RELEASE_CONFIGURATION.md`. Production must have a real site key configured, and
  the signup form fails closed (blocks submit with a configuration-error message) if
  `featureFlags.supabaseEnabled` is true but no site key is present, so a misconfigured production
  deployment can't silently skip bot protection.

## Email delivery and branding

- Supabase's shared/default mailer sends from a generic Supabase address regardless of the HTML
  template content. Changing the _visible sender name/address_ to `VS Schools <no-reply@...>`
  requires configuring **custom SMTP** with a **verified sending domain** in the hosted Supabase
  project -- this cannot be achieved by code/template changes alone. This repo ships the
  email HTML/text templates and a full SMTP/DNS checklist in `RELEASE_CONFIGURATION.md`; applying
  them to the live project is an owner action.

## Course runner capability decisions

Investigated safe browser-local execution for the eight new/upgraded technical courses:

| Course    | Real browser execution?                                                                                                                                                                                                                                                                             | Decision                                                                                                                                                                                 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C         | No safe, small, correct-enough browser interpreter found (WASM Clang toolchains are 10s of MB and still need a libc/sysroot; JS-based C interpreters cover only a small language subset and would silently mis-execute valid programs)                                                              | Honest guided labs: read code, predict output, fill-in-the-blank, compare against a precomputed "Expected output" panel                                                                  |
| C++       | Same constraint, worse (templates/STL need a real compiler)                                                                                                                                                                                                                                         | Guided labs, same pattern                                                                                                                                                                |
| C#/.NET   | No safe in-browser CLR/Roslyn execution without a large download or a server                                                                                                                                                                                                                        | Guided labs                                                                                                                                                                              |
| Angular   | Real Angular needs a TypeScript+template compiler pipeline (esbuild/Angular CLI), not a single-file eval; out of scope to bundle a build pipeline into a lesson runner safely                                                                                                                       | Guided labs for full-app examples; the existing TypeScript playground (already real, already ships) is reused for the plain-TS portions of Angular lessons (services, RxJS, plain logic) |
| AngularJS | jQuery-lite + `angular.module` _can_ technically eval in an iframe like the existing HTML/JS runner, but AngularJS's two-way `$scope` digest cycle inside a sandboxed `srcdoc` iframe was spot-checked and behaves inconsistently across the loop-detection/timeout wrapper built for plain HTML/JS | Guided labs (consistent, honest, matches the "legacy maintenance" framing -- the point of this course is reading/maintaining existing code, not a live playground)                       |
| PHP       | No safe/small official WASM PHP runtime suitable for bundling in this session (php-wasm-class builds exist but are experimental, large, and not vetted here)                                                                                                                                        | Guided labs                                                                                                                                                                              |
| Go        | No safe, small in-browser Go execution (TinyGo/WASM needs a real build step, not eval)                                                                                                                                                                                                              | Guided labs                                                                                                                                                                              |
| Kotlin    | No safe, small in-browser Kotlin execution (Kotlin/JS needs a compile step)                                                                                                                                                                                                                         | Guided labs                                                                                                                                                                              |

This is the fallback path the brief itself explicitly authorizes when a production-quality local
runner would be unsafe or excessively large. Every guided-lab exercise labels expected output as
"Expected output," never "Your output," and never shows a fake Run button. A future real
compiler/runner architecture (e.g. a properly sandboxed, rate-limited, opt-in server execution
service) is recorded as a distinct, not-yet-started future item, not silently substituted here.

## VisaSpark cross-site linking

- No real VisaSpark URL was provided. `NEXT_PUBLIC_VISASPARK_URL` is added to `site-config.ts`'s
  env-driven config, defaulting to `undefined`. The Study Abroad CTA renders a disabled
  "VisaSpark website coming soon" state when unset, and a real link when configured -- never a
  guessed/invented URL. The real URL is the single required entry in `RELEASE_CONFIGURATION.md`
  under owner-provided values.

## Study-abroad content sourcing

- Official top-level source URLs (government immigration/visa portals, national study-abroad
  program sites) were looked up live via web search during this session rather than invented, and
  are stored as structured `officialSources` entries per country. Step-level guidance text is
  written from stable, well-established knowledge of how international admissions/visa processes
  generally work (the steps themselves -- eligibility review, SOP, financial proof, visa
  biometrics, etc. -- have not materially changed in structure for years), not from
  exhaustively re-verifying every sentence against a live source this session. Every page
  explicitly tells the learner to confirm current specifics against the linked official source
  and their target institution, and shows a real "Last reviewed" date so staleness is visible
  rather than hidden.

## Exam-preparation scoring limitations

- No real automated speech/writing scoring model exists in this codebase and none is added.
  Speaking/Writing practice captures a structured response (recorded audio where the browser
  supports `MediaRecorder`, or typed text) and shows a rubric-based **self-review checklist** the
  learner scores themselves against. The UI is explicit that this is self-assessment, never a
  claimed AI or official score. Listening/Reading/quantitative objective items use real
  deterministic auto-scoring (matches the existing quiz engine's pattern).
- Current test-format facts (section names, timing, question types) were checked via web search
  against each test-maker's own site during this session where practical; anything not
  independently confirmed is phrased generally rather than with an invented precise number, and
  every exam course page carries source links + a last-reviewed date for the same reason as Study
  Abroad above.

## Certificate PDF generation approach

- Evaluated client-side-only PDF generation (`jspdf`/`html2canvas`-style) against a Next.js route
  handler that renders the certificate server-side and streams a PDF. Chose a **server route
  handler** (`app/api/certificates/[id]/pdf/route.ts`) that re-fetches the certificate row via the
  authenticated user's own Supabase session (RLS-scoped, so a user can only ever generate their
  own certificate's PDF) and renders it with a lightweight PDF library, rather than trusting
  anything from the client DOM -- directly satisfying "generate the PDF from trusted persisted
  data, not editable client text" and "no service-role key in the browser" (the route uses the
  same anon-key + user-JWT pattern the rest of the app already uses for authenticated Supabase
  calls, not a service-role key).
