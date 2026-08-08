/**
 * Fails the build if any client-reachable code references a non-public
 * environment variable, or if a built client bundle contains a known secret
 * variable's name or a recognizable secret-shaped literal.
 *
 * Two passes:
 * 1. Source scan (always runs): every `"use client"` file must reference
 *    only `NEXT_PUBLIC_*` env vars. This is the check that actually matters
 *    -- it catches the mistake (a secret-reading import sneaking into a
 *    client component) before it can ever reach a bundle, and doesn't
 *    depend on a real secret being configured locally to be meaningful.
 * 2. Build-output scan (best-effort, skipped with a warning if `.next`
 *    doesn't exist): greps `.next/static/**\/*.js` for the literal names of
 *    every non-public env var referenced anywhere in the repo, plus a few
 *    known secret-shaped patterns (Supabase service-role JWT prefix,
 *    OpenAI-style `sk-` keys). A minified bundle is unlikely to retain a
 *    variable name verbatim, but source maps or an unbundled dynamic
 *    `process.env[key]` access could.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const SOURCE_DIRS = ["app", "components", "lib"];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx"]);

function walk(dir: string, extensions: Set<string>): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      files.push(...walk(full, extensions));
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function isClientFile(content: string): boolean {
  const firstStatement = content.trimStart().split("\n")[0]?.trim();
  return firstStatement === '"use client";' || firstStatement === "'use client';";
}

const ENV_REF_PATTERN = /process\.env\.([A-Z_][A-Z0-9_]*)/g;

let failures = 0;
const nonPublicEnvVarNames = new Set<string>();

for (const dir of SOURCE_DIRS) {
  const dirPath = path.join(ROOT, dir);
  if (!existsSync(dirPath)) continue;
  for (const file of walk(dirPath, SOURCE_EXTENSIONS)) {
    const content = readFileSync(file, "utf8");
    const matches = [...content.matchAll(ENV_REF_PATTERN)];
    for (const match of matches) {
      const name = match[1];
      if (!name.startsWith("NEXT_PUBLIC_")) nonPublicEnvVarNames.add(name);
    }
    if (!isClientFile(content)) continue;
    for (const match of matches) {
      const name = match[1];
      if (!name.startsWith("NEXT_PUBLIC_")) {
        failures++;
        console.error(
          `[client-secret-scan] ${path.relative(ROOT, file)} is a "use client" file but reads ` +
            `process.env.${name}, which is not NEXT_PUBLIC_-prefixed. This will bundle whatever ` +
            `value that variable holds into client-shipped JavaScript.`,
        );
      }
    }
  }
}

const distDir = path.join(ROOT, ".next", "static");
if (!existsSync(distDir)) {
  console.warn(
    "[client-secret-scan] .next/static not found -- skipping build-output pass. " +
      "Run `npm run build` first for full coverage.",
  );
} else {
  const secretShapedPatterns: RegExp[] = [
    /\bsk-[A-Za-z0-9]{20,}\b/, // OpenAI-style API keys
    /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/, // any bundled JWT (service-role keys are JWTs)
  ];
  const jsFiles = walk(distDir, new Set([".js"]));
  for (const file of jsFiles) {
    const content = readFileSync(file, "utf8");
    for (const name of nonPublicEnvVarNames) {
      // Word-boundary match, excluding occurrences that are actually part of
      // a longer, legitimately-public `NEXT_PUBLIC_<name>` variable -- e.g.
      // "AI_TUTOR_ENABLED" (non-public) is a substring of the unrelated,
      // intentionally-public "NEXT_PUBLIC_AI_TUTOR_ENABLED".
      const pattern = new RegExp(`(?<!NEXT_PUBLIC_)\\b${name}\\b`);
      if (pattern.test(content)) {
        failures++;
        console.error(
          `[client-secret-scan] Built client bundle ${path.relative(ROOT, file)} contains the ` +
            `literal string "${name}" -- a non-public env var name should never appear in ` +
            `client-shipped output.`,
        );
      }
    }
    for (const pattern of secretShapedPatterns) {
      const match = content.match(pattern);
      if (match) {
        failures++;
        console.error(
          `[client-secret-scan] Built client bundle ${path.relative(ROOT, file)} contains a ` +
            `secret-shaped literal matching ${pattern}.`,
        );
      }
    }
  }
  console.log(`[client-secret-scan] Scanned ${jsFiles.length} built client JS file(s).`);
}

if (failures > 0) {
  console.error(`[client-secret-scan] FAILED with ${failures} issue(s).`);
  process.exit(1);
}
console.log("[client-secret-scan] OK -- no non-public secrets reachable from client code.");
