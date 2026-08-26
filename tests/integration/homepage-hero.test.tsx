import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/(site)/page";
import { allTracks } from "@/lib/content/registry";
import { getTechnologyBySlug } from "@/lib/directory/registry";

vi.mock("@/components/seo/json-ld", () => ({
  JsonLd: () => null,
}));

const HERO_BADGE_TECH_SLUGS = [
  "javascript",
  "typescript",
  "python",
  "react",
  "cpp",
  "nodejs",
] as const;

const POPULAR_TECH_SLUGS = [
  "html",
  "css",
  "javascript",
  "typescript",
  "python",
  "sql",
  "csharp",
  "java",
  "react",
  "nodejs",
  "dotnet",
  "php",
] as const;

const FEATURE_STRIP_TITLES = [
  "Interactive Lessons",
  "Code Playground",
  "Quizzes & Review",
  "Guided Projects",
  "Certificates",
  "Progress Sync",
] as const;

// A previous iteration of this hero used floating "capability" cards with
// this exact copy -- confirm none of it survived the refinement back to a
// real-learner-image composition.
const REMOVED_CAPABILITY_CARD_TITLES = [
  "Runnable lessons",
  "Guided projects",
  "Quizzes & review",
  "Recognize completed learning",
] as const;

// Every number/percentage/count that would be a fabricated claim if it ever
// appeared verbatim on the hero -- a regression guard, not an exhaustive
// scan (real, accurate counts like lesson/hour totals elsewhere on the page
// are legitimate and out of scope here).
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

  it("does not use the removed fixed-dark hero gradient", () => {
    render(<HomePage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const heroSection = h1.closest("section")!;
    expect(heroSection.className).not.toMatch(/brand-gradient/);
    // The hero must use the site's normal semantic surface token, not a
    // hard-coded color literal.
    expect(heroSection.className).toMatch(/bg-\(--color-surface\)/);
  });
});

describe("Homepage learner image panel", () => {
  it("renders the real learner photo with the required descriptive alt text", () => {
    render(<HomePage />);
    const image = screen.getByRole("img", {
      name: "Learner practicing technology skills on a laptop",
    });
    expect(image.tagName).toBe("IMG");
    // next/image rewrites `src` through its optimizer -- assert the
    // underlying asset is referenced, not a literal `src` string.
    expect(decodeURIComponent(image.getAttribute("src") ?? "")).toContain(
      "/images/homepage/hero-learner.webp",
    );
  });

  it("no longer renders the removed placeholder treatment (dashed border, pending label)", () => {
    render(<HomePage />);
    expect(screen.queryByText(/pending/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/learner photo pending/i)).not.toBeInTheDocument();
    const image = screen.getByRole("img", {
      name: "Learner practicing technology skills on a laptop",
    });
    // The image itself carries no background/border box -- it sits
    // directly on the hero's own surface (className has no
    // border/dashed/bg- utility).
    expect(image.className).not.toMatch(/border|dashed|bg-/);
  });

  it("surrounds the learner image with six real, accurate technology badges, hidden from assistive technology", () => {
    render(<HomePage />);
    const image = screen.getByRole("img", {
      name: "Learner practicing technology skills on a laptop",
    });
    const panel = image.closest("div.animate-fade-up")!;
    const decorative = panel.querySelectorAll('[aria-hidden="true"]');
    expect(decorative.length).toBeGreaterThan(0);

    for (const slug of HERO_BADGE_TECH_SLUGS) {
      const tech = getTechnologyBySlug(slug);
      expect(tech, `expected a real technology for slug "${slug}"`).toBeDefined();
    }
  });

  it("renders exactly six orbiting badges, none of them a link or button", () => {
    render(<HomePage />);
    const badges = document.querySelectorAll(".hero-orbit-badge");
    expect(badges).toHaveLength(6);
    for (const badge of badges) {
      expect(badge.tagName).not.toBe("A");
      expect(badge.tagName).not.toBe("BUTTON");
      expect(badge.closest("a")).toBeNull();
      expect(badge.closest("button")).toBeNull();
    }
  });

  it("badges have a single ring (no nested bordered/surfaced container inside each badge)", () => {
    render(<HomePage />);
    const badges = document.querySelectorAll(".hero-orbit-badge");
    for (const badge of badges) {
      // Each badge is itself the one bordered/surfaced element; its only
      // child must be the bare icon glyph, not another TechLogo container
      // with its own border/background classes (the double-ring bug an
      // earlier pass of this task removed).
      const innerBorderedBoxes = badge.querySelectorAll(".border, [class*='border-']");
      expect(innerBorderedBoxes.length).toBe(0);
    }
  });

  it("badge sizes vary -- not a uniform ring of identically-sized icons", () => {
    render(<HomePage />);
    const badges = Array.from(document.querySelectorAll(".hero-orbit-badge")) as HTMLElement[];
    const sizes = new Set(badges.map((b) => b.style.width));
    expect(sizes.size).toBeGreaterThan(1);
  });

  it("badges sit at six distinct, evenly-spaced phase offsets along a single shared path", () => {
    render(<HomePage />);
    // Badges travel on one shared `offset-path` (see globals.css), each
    // started at its own --start-fraction via a negative animation-delay,
    // all sharing one --orbit-duration. Equal speed + distinct, evenly
    // spaced starting points keeps their arc-length spacing constant
    // forever -- this is what actually guarantees badges can never
    // collide, regardless of duration (varying per-badge speed instead
    // would risk two badges eventually passing through the same point).
    const badges = Array.from(document.querySelectorAll(".hero-orbit-badge")) as HTMLElement[];
    expect(badges).toHaveLength(6);
    const fractions = badges
      .map((b) => Number(b.style.getPropertyValue("--start-fraction")))
      .sort((a, b) => a - b);
    expect(new Set(fractions).size).toBe(6);
    for (let i = 0; i < fractions.length; i++) {
      expect(fractions[i]).toBeCloseTo(i / 6, 5);
    }
    const durations = badges.map((b) => b.style.getPropertyValue("--orbit-duration"));
    expect(new Set(durations).size).toBe(1);
  });

  it("no longer renders the removed abstract laptop / capability-card composition", () => {
    render(<HomePage />);
    for (const title of REMOVED_CAPABILITY_CARD_TITLES) {
      expect(screen.queryByText(title, { exact: true })).not.toBeInTheDocument();
    }
  });
});

describe("Homepage Popular Technologies panel", () => {
  it('has a "Popular Technologies" heading and a "View all" link', () => {
    render(<HomePage />);
    expect(screen.getByText("Popular Technologies", { exact: true })).toBeInTheDocument();
    const viewAllLinks = screen.getAllByRole("link", { name: /view all/i });
    expect(viewAllLinks.some((l) => l.getAttribute("href") === "/technologies")).toBe(true);
  });

  it("renders every popular technology as a real, working link to its canonical page", () => {
    render(<HomePage />);
    for (const slug of POPULAR_TECH_SLUGS) {
      const tech = getTechnologyBySlug(slug);
      expect(tech, `expected a real technology for slug "${slug}"`).toBeDefined();
      const links = screen.getAllByRole("link", { name: tech!.name });
      expect(links.some((l) => l.getAttribute("href") === `/technologies/${slug}`)).toBe(true);
    }
  });

  it("renders no duplicate technology entries in the popular panel", () => {
    const seen = new Set<string>();
    for (const slug of POPULAR_TECH_SLUGS) {
      expect(seen.has(slug)).toBe(false);
      seen.add(slug);
    }
  });

  it("is a compact multi-column grid, not a single vertical list", () => {
    render(<HomePage />);
    const heading = screen.getByText("Popular Technologies", { exact: true });
    const panel = heading.closest("div")!.parentElement!;
    const grid = panel.querySelector("ul")!;
    expect(grid.className).toMatch(/grid-cols-3/);
  });

  it("shows between 12 and 16 popular technologies", () => {
    expect(POPULAR_TECH_SLUGS.length).toBeGreaterThanOrEqual(12);
    expect(POPULAR_TECH_SLUGS.length).toBeLessThanOrEqual(16);
  });
});

describe("Homepage feature strip", () => {
  it("renders exactly the six accurate, unsupported-claim-free feature items", () => {
    render(<HomePage />);
    for (const title of FEATURE_STRIP_TITLES) {
      expect(screen.getAllByText(title, { exact: true }).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("does not claim a Community feature or an unsupported career outcome", () => {
    render(<HomePage />);
    const bodyText = document.body.textContent ?? "";
    expect(bodyText).not.toMatch(/\bcommunity\b/i);
    expect(bodyText).not.toMatch(/boost your career/i);
  });
});

describe("Homepage Browse Technologies section", () => {
  it('renders a "Browse technologies" heading and links each tile to a real technology page', () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: "Browse technologies" });
    expect(heading).toBeInTheDocument();
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
