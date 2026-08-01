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
 */
const isDev = process.env.NODE_ENV !== "production";

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""} https://cdn.jsdelivr.net`,
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "img-src 'self' data: blob:",
  "font-src 'self' data: https://cdn.jsdelivr.net",
  "connect-src 'self' https://cdn.jsdelivr.net",
  "worker-src 'self' blob:",
  "frame-src 'self'",
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
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
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
};

export default nextConfig;
