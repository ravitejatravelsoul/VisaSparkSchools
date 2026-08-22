/**
 * Manual-run external-link auditor. Extracts every structured
 * `{ label, url }` reference across the content registries (lessons,
 * projects, technology directory, study-abroad official sources,
 * exam-prep official sources), then makes a real network request against
 * each one to find dead links, redirects, and low-quality destinations.
 *
 * Deliberately NOT part of `npm test`, `content:validate`, or the build --
 * it makes real outbound HTTP requests to ~650+ third-party hosts, which is
 * slow, and dependent on external services' current availability
 * (transient failures/rate limits are not this repo's fault and shouldn't
 * fail an ordinary local test run). Run it manually before a release:
 *
 *   npm run content:check-links
 *
 * This script never modifies content -- it only reports. A human reviews
 * the report and applies fixes.
 */
import { allLessons, allProjects } from "@/lib/content/registry";
import { allTechnologies } from "@/lib/directory/registry";
import { countryRoadmaps } from "@/lib/study-abroad/registry";
import { examPrepMetas } from "@/lib/exam-prep/registry";
import { writeFileSync } from "node:fs";
import path from "node:path";

interface ReferenceEntry {
  source: string;
  location: string;
  label: string;
  url: string;
}

function extractReferences(): ReferenceEntry[] {
  const entries: ReferenceEntry[] = [];

  for (const lesson of allLessons) {
    for (const ref of lesson.references) {
      entries.push({
        source: "lesson",
        location: `${lesson.courseSlug} / ${lesson.slug}`,
        label: ref.label,
        url: ref.url,
      });
    }
  }

  for (const project of allProjects) {
    for (const ref of project.references) {
      entries.push({
        source: "project",
        location: project.slug,
        label: ref.label,
        url: ref.url,
      });
    }
  }

  for (const tech of allTechnologies) {
    for (const ref of tech.references) {
      entries.push({
        source: "technology",
        location: tech.slug,
        label: ref.label,
        url: ref.url,
      });
    }
  }

  for (const roadmap of countryRoadmaps) {
    for (const ref of roadmap.officialSources) {
      entries.push({
        source: "study-abroad (country)",
        location: roadmap.countrySlug,
        label: ref.label,
        url: ref.url,
      });
    }
    for (const step of roadmap.steps) {
      for (const ref of step.officialSourceLinks) {
        entries.push({
          source: "study-abroad (step)",
          location: `${roadmap.countrySlug} / ${step.stepId}`,
          label: ref.label,
          url: ref.url,
        });
      }
    }
  }

  for (const meta of examPrepMetas) {
    for (const ref of meta.officialSources) {
      entries.push({
        source: "exam-prep",
        location: meta.courseSlug,
        label: ref.label,
        url: ref.url,
      });
    }
  }

  return entries;
}

type CheckOutcome =
  | { status: "ok"; httpStatus: number; finalUrl: string; redirected: boolean }
  | { status: "redirect-suspicious"; httpStatus: number; finalUrl: string }
  | { status: "not-https" }
  | { status: "malformed" }
  | { status: "rate-limited"; httpStatus: number }
  | { status: "failed"; httpStatus?: number; error?: string };

const TIMEOUT_MS = 10_000;
const MAX_RETRIES = 2;
const CONCURRENCY = 8;

/** Hostnames whose final destination is a generic homepage/search page, not the specific resource -- worth a human's attention even at HTTP 200. */
function looksLikeGenericLanding(finalUrl: string, originalUrl: string): boolean {
  try {
    const original = new URL(originalUrl);
    const final = new URL(finalUrl);
    // Redirected to a bare homepage (no path) when the original had a real path.
    const originalHasPath = original.pathname.replace(/\/$/, "").length > 1;
    const finalIsHomepage = final.pathname === "/" || final.pathname === "";
    return originalHasPath && finalIsHomepage && original.hostname !== final.hostname;
  } catch {
    return false;
  }
}

async function checkOnce(url: string): Promise<CheckOutcome> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { status: "malformed" };
  }
  if (parsed.protocol !== "https:") {
    return { status: "not-https" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let res: Response;
    try {
      res = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "VisaSparkSchools-LinkAudit/1.0" },
      });
      // Some servers don't implement HEAD correctly (405/501/403-on-HEAD-only) -- retry with GET.
      if (res.status === 405 || res.status === 501 || res.status === 403) {
        res = await fetch(url, {
          method: "GET",
          redirect: "follow",
          signal: controller.signal,
          headers: { "User-Agent": "VisaSparkSchools-LinkAudit/1.0" },
        });
      }
    } catch (e) {
      return { status: "failed", error: e instanceof Error ? e.message : String(e) };
    }

    if (res.status === 429) {
      return { status: "rate-limited", httpStatus: res.status };
    }
    if (res.status >= 400) {
      return { status: "failed", httpStatus: res.status };
    }
    if (looksLikeGenericLanding(res.url, url)) {
      return { status: "redirect-suspicious", httpStatus: res.status, finalUrl: res.url };
    }
    return { status: "ok", httpStatus: res.status, finalUrl: res.url, redirected: res.url !== url };
  } finally {
    clearTimeout(timer);
  }
}

async function checkWithRetry(url: string): Promise<CheckOutcome> {
  let last: CheckOutcome = { status: "failed", error: "never attempted" };
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    last = await checkOnce(url);
    if (last.status === "ok" || last.status === "not-https" || last.status === "malformed") {
      return last;
    }
    if (last.status === "rate-limited") {
      // Back off longer for rate limits than for ordinary transient failures.
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      continue;
    }
    if (attempt < MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  return last;
}

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function runNext(): Promise<void> {
    const i = next++;
    if (i >= items.length) return;
    results[i] = await worker(items[i], i);
    return runNext();
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => runNext()));
  return results;
}

async function main() {
  // A fresh, unambiguous timestamp per run -- printed in the console summary
  // and embedded in the JSON report, specifically so a report (or someone
  // quoting numbers from one) can never be mistaken for a different run.
  // This is a single point-in-time network check: only the most recent run
  // is ever meaningful, and the previous run's report is fully overwritten,
  // never merged or appended to.
  const runStartedAt = new Date().toISOString();
  const entries = extractReferences();
  const uniqueUrls = [...new Set(entries.map((e) => e.url))];
  console.log(`Run started: ${runStartedAt}`);
  console.log(
    `Found ${entries.length} reference(s) across ${uniqueUrls.length} unique URL(s). Checking with concurrency=${CONCURRENCY}...\n`,
  );

  let checked = 0;
  const urlResults = new Map<string, CheckOutcome>();
  await runWithConcurrency(uniqueUrls, CONCURRENCY, async (url) => {
    const outcome = await checkWithRetry(url);
    urlResults.set(url, outcome);
    checked++;
    if (checked % 50 === 0) console.log(`  ...checked ${checked}/${uniqueUrls.length}`);
  });

  const problems = entries
    .map((e) => ({ ...e, outcome: urlResults.get(e.url)! }))
    .filter((e) => e.outcome.status !== "ok");

  const rateLimited = problems.filter((e) => e.outcome.status === "rate-limited");
  const unverified = problems.filter(
    (e) =>
      e.outcome.status === "failed" &&
      e.outcome.error !== undefined &&
      e.outcome.httpStatus === undefined,
  );
  const realFailures = problems.filter(
    (e) => e.outcome.status === "failed" && e.outcome.httpStatus !== undefined,
  );
  const suspiciousRedirects = problems.filter((e) => e.outcome.status === "redirect-suspicious");
  const notHttps = problems.filter((e) => e.outcome.status === "not-https");
  const malformed = problems.filter((e) => e.outcome.status === "malformed");

  console.log(`\n=== Summary ===`);
  console.log(`Total references checked: ${entries.length} (${uniqueUrls.length} unique URLs)`);
  console.log(`OK: ${entries.length - problems.length}`);
  console.log(`Real failures (4xx/5xx/network error with status): ${realFailures.length}`);
  console.log(`Redirects to a generic/homepage landing page: ${suspiciousRedirects.length}`);
  console.log(`Not HTTPS: ${notHttps.length}`);
  console.log(`Malformed URL: ${malformed.length}`);
  console.log(`Rate-limited (429) -- unresolved, re-run later: ${rateLimited.length}`);
  console.log(
    `Unverified (network/timeout error, no status) -- treat as unresolved, not failing: ${unverified.length}`,
  );

  function printGroup(title: string, list: typeof problems) {
    if (list.length === 0) return;
    console.log(`\n--- ${title} (${list.length}) ---`);
    for (const e of list) {
      const detail =
        "httpStatus" in e.outcome && e.outcome.httpStatus !== undefined
          ? `HTTP ${e.outcome.httpStatus}`
          : "error" in e.outcome
            ? e.outcome.error
            : e.outcome.status;
      console.log(`  [${e.source}] ${e.location} :: "${e.label}" -> ${e.url}  (${detail})`);
    }
  }

  printGroup("REAL FAILURES", realFailures);
  printGroup("SUSPICIOUS REDIRECTS (generic landing page)", suspiciousRedirects);
  printGroup("NOT HTTPS", notHttps);
  printGroup("MALFORMED", malformed);
  printGroup("RATE-LIMITED (unresolved)", rateLimited);
  printGroup("UNVERIFIED (network error, unresolved)", unverified);

  const reportPath = path.join(process.cwd(), "reference-link-audit.json");
  writeFileSync(
    reportPath,
    JSON.stringify(
      {
        runStartedAt,
        runFinishedAt: new Date().toISOString(),
        totalOccurrences: entries.length,
        totalUniqueUrls: uniqueUrls.length,
        okOccurrences: entries.length - problems.length,
        flaggedOccurrences: problems.length,
        references: entries.map((e) => ({ ...e, outcome: urlResults.get(e.url) })),
      },
      null,
      2,
    ),
  );
  console.log(
    `\nFull machine-readable report (this run only, ${runStartedAt}) written to ${reportPath}`,
  );

  if (
    realFailures.length > 0 ||
    suspiciousRedirects.length > 0 ||
    notHttps.length > 0 ||
    malformed.length > 0
  ) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error("check-reference-links failed:", e);
  process.exitCode = 1;
});
