import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrimaryNav, PrimaryNavMobile } from "@/components/layout/primary-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("PrimaryNav", () => {
  it("includes a Study Abroad link pointing at /study-abroad", () => {
    render(<PrimaryNav />);
    expect(screen.getByRole("link", { name: "Study Abroad" })).toHaveAttribute(
      "href",
      "/study-abroad",
    );
  });
});

describe("PrimaryNavMobile", () => {
  it("also includes a Study Abroad link (same navLinks source as desktop)", () => {
    render(<PrimaryNavMobile onNavigate={() => {}} />);
    expect(screen.getByRole("link", { name: "Study Abroad" })).toHaveAttribute(
      "href",
      "/study-abroad",
    );
  });
});
