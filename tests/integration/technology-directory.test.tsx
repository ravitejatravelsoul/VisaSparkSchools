import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TechnologyDirectoryClient } from "@/components/directory/technology-directory-client";
import type { Technology, Category } from "@/lib/directory/types";

const replace = vi.fn();
let mockSearchParams = new URLSearchParams("");

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/technologies",
  useSearchParams: () => mockSearchParams,
}));

function makeTech(overrides: Partial<Technology>): Technology {
  return {
    id: "sample",
    slug: "sample",
    name: "Sample",
    category: "frontend",
    description: "A sample technology.",
    overview: "Overview.",
    whatItIs: "What.",
    whyItsUsed: "Why.",
    whereItFits: "Where.",
    beginnerFriendly: true,
    difficulty: "beginner",
    prerequisiteIds: [],
    relatedIds: [],
    coreConcepts: ["Concept"],
    example: { code: "code", explanation: "explanation" },
    useCases: ["Use case"],
    practiceOptions: [],
    projectIdeas: ["Idea"],
    references: [{ label: "Ref", url: "https://example.com" }],
    searchKeywords: [],
    status: "current",
    versionPolicy: "not-applicable",
    lastReviewed: "2026-08-01",
    projectIds: [],
    publicVisibility: true,
    ...overrides,
  };
}

const technologies: Technology[] = [
  makeTech({
    id: "html",
    slug: "html",
    name: "HTML",
    category: "frontend",
    difficulty: "beginner",
  }),
  makeTech({
    id: "angularjs",
    slug: "angularjs",
    name: "AngularJS",
    category: "frontend",
    difficulty: "intermediate",
    status: "legacy",
    legacyNote: "Legacy, superseded by Angular.",
  }),
  makeTech({
    id: "rust",
    slug: "rust",
    name: "Rust",
    category: "programming-languages",
    difficulty: "advanced",
    beginnerFriendly: false,
  }),
];

const categories: Category[] = [
  {
    id: "frontend",
    slug: "frontend",
    name: "Frontend Development",
    shortDescription: "Frontend.",
    introduction: "Frontend intro.",
    icon: "frontend",
    order: 1,
    searchKeywords: [],
    relatedCategoryIds: [],
    audience: "Everyone.",
    publicVisibility: true,
    featured: true,
  },
  {
    id: "programming-languages",
    slug: "programming-languages",
    name: "Programming Languages",
    shortDescription: "Languages.",
    introduction: "Languages intro.",
    icon: "programming-languages",
    order: 3,
    searchKeywords: [],
    relatedCategoryIds: [],
    audience: "Everyone.",
    publicVisibility: true,
    featured: true,
  },
];

beforeEach(() => {
  replace.mockClear();
  mockSearchParams = new URLSearchParams("");
});

describe("TechnologyDirectoryClient", () => {
  it("renders every technology by default", () => {
    render(<TechnologyDirectoryClient technologies={technologies} categories={categories} />);
    expect(screen.getByText("HTML")).toBeInTheDocument();
    expect(screen.getByText("AngularJS")).toBeInTheDocument();
    expect(screen.getByText("Rust")).toBeInTheDocument();
    expect(screen.getByText("3 technologies")).toBeInTheDocument();
  });

  it("marks a legacy technology with a visible Legacy badge", () => {
    render(<TechnologyDirectoryClient technologies={technologies} categories={categories} />);
    expect(screen.getByText("Legacy")).toBeInTheDocument();
  });

  it("filtering by category updates the URL via router.replace", () => {
    render(<TechnologyDirectoryClient technologies={technologies} categories={categories} />);
    fireEvent.change(screen.getByLabelText("Filter by category"), {
      target: { value: "programming-languages" },
    });
    expect(replace).toHaveBeenCalledWith("/technologies?category=programming-languages", {
      scroll: false,
    });
  });

  it("typing a search query updates the URL via router.replace", () => {
    render(<TechnologyDirectoryClient technologies={technologies} categories={categories} />);
    fireEvent.change(screen.getByPlaceholderText(/search technologies/i), {
      target: { value: "rust" },
    });
    expect(replace).toHaveBeenCalledWith("/technologies?q=rust", { scroll: false });
  });

  it("resetting filters (when a filter is already active in the URL) navigates back to the bare path", () => {
    mockSearchParams = new URLSearchParams("difficulty=advanced");
    render(<TechnologyDirectoryClient technologies={technologies} categories={categories} />);
    fireEvent.click(screen.getByText("Reset filters"));
    expect(replace).toHaveBeenCalledWith("/technologies", { scroll: false });
  });

  it("only shows the Reset filters control when a filter is actually active", () => {
    render(<TechnologyDirectoryClient technologies={technologies} categories={categories} />);
    expect(screen.queryByText("Reset filters")).not.toBeInTheDocument();
  });
});
