import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/footer";

describe("Footer", () => {
  it("attributes both the developer and the CEO by their exact names", () => {
    render(<Footer />);
    const attribution = screen.getByText(/Developed by/i);
    expect(attribution.textContent).toContain("Raviteja Vemulapelli");
    expect(attribution.textContent).toContain("Naga Malleswararao Boddu");
  });

  it("does not imply the developer is the CEO -- they are two distinct, separately labeled facts", () => {
    render(<Footer />);
    const attribution = screen.getByText(/Developed by/i).textContent ?? "";
    // "Developed by X." and "CEO: Y." must appear as two separate sentences,
    // never as a single "Developed by X, CEO of ..." construction.
    expect(attribution).toMatch(
      /Developed by Raviteja Vemulapelli\.\s*CEO: Naga Malleswararao Boddu\./,
    );
  });

  it("preserves the existing legal/navigation links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Privacy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Terms" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Accessibility" })).toBeInTheDocument();
  });

  it("links to the Study Abroad directory", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Study Abroad" })).toHaveAttribute(
      "href",
      "/study-abroad",
    );
  });
});
