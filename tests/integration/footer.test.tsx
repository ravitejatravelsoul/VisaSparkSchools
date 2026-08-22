import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site-config";

describe("Footer", () => {
  it("attributes the developer and the CEO on two separate semantic lines", () => {
    render(<Footer />);
    const developerLine = screen.getByText(/Developed by/i);
    const ceoLine = screen.getByText(/CEO: BODDU NAGA MALLESWARA RAO/);

    expect(developerLine.textContent).toContain("Raviteja Vemulapelli");
    // The developer credit must NOT also contain the CEO credit -- they are
    // two distinct paragraphs now, not one combined sentence.
    expect(developerLine.textContent).not.toContain("CEO");
    expect(ceoLine).toBeInTheDocument();

    // Two different DOM elements, not one node split visually with a <br>.
    expect(developerLine.closest("p")).not.toBe(ceoLine.closest("p"));
  });

  it("gives the CEO credit a distinct, non-interactive visual treatment", () => {
    render(<Footer />);
    const ceoLine = screen.getByText(/CEO: BODDU NAGA MALLESWARA RAO/);

    // It's a highlighted badge/pill, not a link or button.
    expect(ceoLine.tagName).toBe("SPAN");
    expect(ceoLine.closest("a")).toBeNull();
    expect(ceoLine.closest("button")).toBeNull();
  });

  it("uses the exact owner-approved spelling, word order, and uppercase CEO name", () => {
    render(<Footer />);
    const ceoLine = screen.getByText(/CEO: BODDU NAGA MALLESWARA RAO/);
    // Regression guard for the exact corrected name: uppercase, "Boddu"
    // first, "Malleswara" and "Rao" as two separate words -- not the earlier
    // "Naga Malleswararao Boddu" ordering/casing/merging.
    expect(ceoLine.textContent).toBe("CEO: BODDU NAGA MALLESWARA RAO");
    expect(ceoLine.textContent).not.toContain("Naga Malleswararao Boddu");
    expect(ceoLine.textContent).not.toContain("Malleswararao");
  });

  it("does not change the certificate signatory identity", () => {
    // The footer credit and the certificate signatory are deliberately
    // different facts (see lib/site-config.ts) -- this footer change must
    // not touch that separate, differently-formatted value.
    expect(siteConfig.certificateSignatory.name).toBe("Naga Malleswararao Boddu");
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
