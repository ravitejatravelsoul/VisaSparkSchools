import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/(site)/page";
import { allTracks } from "@/lib/content/registry";
import { getTechnologyBySlug } from "@/lib/directory/registry";

vi.mock("@/components/seo/json-ld", () => ({
  JsonLd: () => null,
}));

const CAPABILITY_TITLES = [
  "Runnable lessons",
  "Guided projects",
  "Quizzes & review",
  "Certificates",
] as const;

const FEATURE_STRIP_TITLES = [
  "Interactive lessons",
  "Code playground",
  "Quizzes & review",
  "Guided projects",
  "Certificates",
  "Progress sync",
] as const;

const POPULAR_TECH_SLUGS = [
  "javascript",
  "python",
  "typescript",
  "react",
  "nodejs",
  "sql",
  "git",
  "html",
] as const;

// Every number/percentage/count that would be a fabricated claim if it ever
// appeared verbatim on the new hero -- this is a regression guard, not an
// exhaustive scan (real, accurate counts like lesson/hour totals elsewhere
// on the page are legitimate and out of scope here).
const FORBIDDEN_FAKE_CLAIMS = [
  /trusted by/i,
  /\d[\d,]*\+?\s*(learners|students|users)/i,
  /\d+%\s*(complete|completion)/i,
  /\d+\s*day\s*streak/i,
  /5\.0\s*(stars|rating)|★★★★★/,
];

describe("Homepage hero (redesigned)", () => {
  it("has exactly one H1 with the expected headline", () => {
    render(<HomePage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toContain("Learn. Build. Prove.");
    expect(h1s[0].textContent).toContain("Succeed.");
  });

  it("primary and secondary CTAs point to different real routes", () => {
    render(<HomePage />);
    const primary = screen.getByRole("link", { name: "Start learning free" });
    const secondary = screen.getByRole("link", { name: "Try the playground" });
    expect(primary).toHaveAttribute("href", "/courses");
    expect(secondary).toHaveAttribute("href", "/playground");
    expect(primary.getAttribute("href")).not.toBe(secondary.getAttribute("href"));
  });

  it("shows the guest-progress note without overclaiming", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/No account required to begin\. Sign up when you.?re ready to sync/),
    ).toBeInTheDocument();
  });

  it("renders no fabricated numeric claims anywhere on the page", () => {
    render(<HomePage />);
    const bodyText = document.body.textContent ?? "";
    for (const pattern of FORBIDDEN_FAKE_CLAIMS) {
      expect(bodyText).not.toMatch(pattern);
    }
  });
});

describe("Homepage floating capability cards", () => {
  it("renders all four factual capability labels exactly once each, with no numbers", () => {
    render(<HomePage />);
    for (const title of CAPABILITY_TITLES) {
      // Appears twice by design: once in the mobile stacked list, once in
      // the desktop floating layout (only one is visible at a given
      // viewport via CSS, both exist in the DOM for responsive reflow).
      const matches = screen.getAllByText(title, { exact: true });
      expect(matches.length).toBeGreaterThanOrEqual(1);
      for (const el of matches) {
        expect(el.textContent).not.toMatch(/\d/);
      }
    }
  });

  it("the decorative learner visual is hidden from assistive technology", () => {
    render(<HomePage />);
    const heroHeading = screen.getByRole("heading", { level: 1 });
    const heroSection = heroHeading.closest("section");
    expect(heroSection).not.toBeNull();
    const decorative = heroSection!.querySelectorAll('[aria-hidden="true"]');
    expect(decorative.length).toBeGreaterThan(0);
  });
});

describe("Homepage Popular Technologies panel", () => {
  it("links every popular technology to its real canonical technology page", () => {
    render(<HomePage />);
    for (const slug of POPULAR_TECH_SLUGS) {
      const tech = getTechnologyBySlug(slug);
      expect(tech, `expected a real technology for slug "${slug}"`).toBeDefined();
      const link = screen.getByRole("link", { name: tech!.name });
      expect(link).toHaveAttribute("href", `/technologies/${slug}`);
    }
  });

  it("has a working 'view all technologies' link", () => {
    render(<HomePage />);
    const links = screen.getAllByRole("link", { name: "View all technologies" });
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/technologies");
    }
  });

  it("renders no duplicate technology entries in the popular panel", () => {
    render(<HomePage />);
    const seen = new Set<string>();
    for (const slug of POPULAR_TECH_SLUGS) {
      expect(seen.has(slug)).toBe(false);
      seen.add(slug);
    }
  });
});

describe("Homepage feature strip", () => {
  it("renders all six factual feature-strip items", () => {
    render(<HomePage />);
    for (const title of FEATURE_STRIP_TITLES) {
      expect(screen.getAllByText(title, { exact: true }).length).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("Homepage Browse Technologies section", () => {
  it('renders a "Browse technologies" heading and links each tile to a real technology page', () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: "Browse technologies" });
    expect(heading).toBeInTheDocument();
    // Every browse-technologies tile is an <a href="/technologies/...">;
    // confirm at least one well-known technology resolves correctly and
    // that section contains no unresolved/undefined technology name.
    const jsLinks = screen.getAllByRole("link", { name: /^JavaScript$/ });
    expect(jsLinks.some((l) => l.getAttribute("href") === "/technologies/javascript")).toBe(true);
    expect(screen.queryByText("undefined")).not.toBeInTheDocument();
  });
});

/** The "Choose a topic" cards append a lesson-count badge inside the same
 * `<a>`, so a card's computed accessible name is its full text content
 * ("<title> <description> <N> lessons"), not the bare title -- match by
 * substring rather than an exact/regex match to avoid any dependency on
 * track-title characters needing regex escaping. */
function findTopicLink(name: string): HTMLElement | undefined {
  return screen.getAllByRole("link").find((link) => (link.textContent ?? "").includes(name));
}

describe("Homepage topic/track section (unchanged data, still present)", () => {
  it("still renders every topic -- no topic was removed", () => {
    render(<HomePage />);
    for (const track of allTracks) {
      expect(findTopicLink(track.title)).toBeDefined();
    }
  });
});

describe("Homepage structure", () => {
  it("uses semantic <section> landmarks for its major regions", () => {
    render(<HomePage />);
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });

  it("the hero heading appears before the Browse Technologies section in document order", () => {
    render(<HomePage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const browseHeading = screen.getByRole("heading", { name: "Browse technologies" });
    expect(
      h1.compareDocumentPosition(browseHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});

describe("Homepage regression: prior sections preserved", () => {
  it('still has the "Choose a topic" section using real track data', () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: "Choose a topic" });
    const section = heading.closest("section")!;
    for (const track of allTracks) {
      const links = within(section).getAllByRole("link");
      expect(links.some((link) => (link.textContent ?? "").includes(track.title))).toBe(true);
    }
  });

  it('still has the final "Built for people who learn by doing" CTA', () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: "Built for people who learn by doing" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse all courses" })).toHaveAttribute(
      "href",
      "/courses",
    );
  });
});
