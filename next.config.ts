import type { NextConfig } from "next";

/**
 * Content-Security-Policy notes (see docs/SECURITY.md for the full threat
 * model):
 * - `script-src 'unsafe-inline'` is required because the HTML/CSS/JS runner
 *   generates srcdoc iframes containing inline <script> tags, and a srcdoc
 *   document inherits its parent's CSP. The actual isolation boundary for
 *   that untrusted, learner-typed code is the iframe `sandbox` attribute
 *   (allow-scripts allow-forms, deliberately WITHOUT allow-same-origin) --
 *   not CSP. The main app itself never uses inline scripts/handlers.
 * - `'wasm-unsafe-eval'` is required for the Pyodide and sql.js WebAssembly
 *   runtimes to instantiate.
 * - `style-src`/`font-src https://cdn.jsdelivr.net` is required because the
 *   Monaco editor's default CDN loader fetches its own stylesheet and icon
 *   font from jsdelivr alongside its script bundle.
 * - `frame-ancestors 'self'` prevents this app from being framed by other
 *   sites (clickjacking protection) for normal app routes.
 * - Plain `'unsafe-eval'` is added to `script-src` in development ONLY: React
 *   Server Components' dev-mode client (via Turbopack) calls eval() itself
 *   to reconstruct cross-environment stack traces for debugging. React never
 *   calls eval() in production, so production keeps the stricter policy
 *   (`'wasm-unsafe-eval'` only, for Pyodide/sql.js) with no security change.
 * - `connect-src` additionally allow-lists `NEXT_PUBLIC_SUPABASE_URL` itself
 *   (not a wildcard `https://*.supabase.co`) when that env var is set, so
 *   the browser's own auth/database/storage requests to this specific
 *   project aren't blocked -- least privilege, matching every other entry
 *   here. A deployment with Supabase unconfigured gets no Supabase entry at
 *   all, since no such request would ever be made in that mode. Found and
 *   fixed after this project's first-ever live browser test against a real
 *   Supabase project surfaced every auth/sync call being silently blocked.
 * - `script-src`/`frame-src` additionally allow-list
 *   `https://challenges.cloudflare.com` (Cloudflare Turnstile's widget
 *   script and its challenge iframe) only when
 *   `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is configured, same least-privilege,
 *   same-conditional-entry pattern as the Supabase URL above.
 *
 * Permissions-Policy note: `microphone` allows `self` (not an empty `()`
 * allowlist) because the exam-prep Speaking Practice feature
 * (`components/exam-prep/speaking-practice.tsx`) uses `getUserMedia` for a
 * local-only, never-uploaded recording. An empty `microphone=()` allowlist
 * blocks `getUserMedia` for the top-level document itself, not just iframes
 * -- found and fixed during this expansion's security review by reproducing
 * the exact failure in a real browser (fake-media-device Chromium launch,
 * blocked under `()`, succeeds under `(self)`) before changing it, since an
 * empty CI environment with no real microphone alone couldn't distinguish a
 * real policy block from a missing device. `camera` and `geolocation` stay
 * `()` -- nothing in the app uses either.
 */
const isDev = process.env.NODE_ENV !== "production";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const isValidSupabaseUrl = supabaseUrl && /^https:\/\/[a-z0-9.-]+$/i.test(supabaseUrl);
const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""} https://cdn.jsdelivr.net${turnstileEnabled ? " https://challenges.cloudflare.com" : ""}`,
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "img-src 'self' data: blob:",
  "font-src 'self' data: https://cdn.jsdelivr.net",
  `connect-src 'self' https://cdn.jsdelivr.net${isValidSupabaseUrl ? ` ${supabaseUrl}` : ""}${turnstileEnabled ? " https://challenges.cloudflare.com" : ""}`,
  "worker-src 'self' blob:",
  `frame-src 'self'${turnstileEnabled ? " https://challenges.cloudflare.com" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(self), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // /paths was renamed to /topics when the product model changed from "one
    // compulsory sequential path" to "independent topics, each an
    // organizational grouping of independently-startable courses" -- these
    // permanent redirects keep old bookmarks/links/search results working.
    return [
      { source: "/paths", destination: "/topics", permanent: true },
      { source: "/paths/:trackSlug", destination: "/topics/:trackSlug", permanent: true },
    ];
  },
};

export default nextConfig;
