import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(site)/page";
import { allTracks } from "@/lib/content/registry";

vi.mock("@/components/seo/json-ld", () => ({
  JsonLd: () => null,
}));

const BENEFIT_TITLES = [
  "Learn step by step",
  "Practice as you go",
  "Build guided projects",
  "Prove your progress",
] as const;

describe("Homepage learning-benefits section", () => {
  it('renders a "How you\'ll learn" heading at the correct level', () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: "How you’ll learn" });
    expect(heading.tagName).toBe("H2");
  });

  it("renders all four benefit titles and descriptions exactly once each", () => {
    render(<HomePage />);
    for (const title of BENEFIT_TITLES) {
      expect(screen.getAllByText(title, { exact: true })).toHaveLength(1);
    }
    expect(
      screen.getByText(/Follow structured lessons that explain each concept clearly/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Run real code in browser-based learning environments/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Apply what you learn through practical projects/)).toBeInTheDocument();
    expect(screen.getByText(/Use quizzes, saved progress, and certificates/)).toBeInTheDocument();
  });

  it("uses a semantic list for the four benefit items", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: "How you’ll learn" });
    const list = heading.closest("div")?.querySelector("ul");
    expect(list).not.toBeNull();
    expect(list?.querySelectorAll("li")).toHaveLength(4);
  });

  it("places the section after the guest-progress explanation and before Explore topics in document order", () => {
    render(<HomePage />);
    const guestProgress = screen.getByText(/Start with any course/);
    const learnHeading = screen.getByRole("heading", { name: "How you’ll learn" });
    const exploreLabel = screen.getByText("Explore topics", { exact: true });

    const position = (a: Element, b: Element) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING;

    expect(position(guestProgress, learnHeading)).toBeTruthy();
    expect(position(learnHeading, exploreLabel)).toBeTruthy();
  });

  it("does not introduce any new interactive controls (links/buttons) inside the section", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: "How you’ll learn" });
    const sectionRoot = heading.closest("div");
    expect(sectionRoot?.querySelectorAll("a, button")).toHaveLength(0);
  });

  it("still renders every topic in Explore topics -- no topic was removed", () => {
    render(<HomePage />);
    for (const track of allTracks) {
      expect(screen.getByRole("link", { name: track.title })).toBeInTheDocument();
    }
  });

  it("keeps the hero heading and primary actions intact", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse courses" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Try the playground" })).toBeInTheDocument();
  });
});
