import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RoadmapStepList } from "@/components/study-abroad/roadmap-step-list";
import type { CountryStepContent } from "@/lib/study-abroad/types";

function sampleSteps(): CountryStepContent[] {
  return [
    {
      stepId: "clarify-goals",
      whyItMatters: "Deciding your degree level early shapes every later step.",
      whatToDo: "Write down your target degree level and field.",
      commonDocuments: [],
      commonMistakes: ["Shortlisting schools before deciding degree level."],
      checklist: ["Degree level decided"],
      officialSourceLinks: [],
      typicalTiming: "12-18 months before start.",
    },
    {
      stepId: "apply-visa",
      whyItMatters: "The visa process has a specific required sequence.",
      whatToDo: "Complete the required visa application steps in order.",
      commonDocuments: ["Passport", "Proof of funds"],
      commonMistakes: ["Applying out of order."],
      checklist: ["Application submitted"],
      officialSourceLinks: [{ label: "Official visa page", url: "https://example.gov/visa" }],
      typicalTiming: "2-4 months before start.",
      degreeNotes: { phd: "PhD applicants may have different work-hour rules." },
    },
  ];
}

describe("RoadmapStepList", () => {
  it("renders one entry per step, each starting collapsed", () => {
    render(<RoadmapStepList steps={sampleSteps()} />);
    expect(screen.getByText("Clarify your goals and target degree level")).toBeInTheDocument();
    expect(screen.getByText("Apply for the student visa")).toBeInTheDocument();
    // whyItMatters text is inside a closed <details>, so it isn't visible yet.
    expect(screen.queryByText(/Deciding your degree level early shapes/)).not.toBeVisible();
  });

  it("Expand all reveals step detail content for every step", () => {
    render(<RoadmapStepList steps={sampleSteps()} />);
    fireEvent.click(screen.getByRole("button", { name: /expand all/i }));
    expect(screen.getByText(/Deciding your degree level early shapes/)).toBeVisible();
    expect(screen.getByText(/The visa process has a specific required sequence/)).toBeVisible();
  });

  it("Collapse all hides step detail content again", () => {
    render(<RoadmapStepList steps={sampleSteps()} />);
    fireEvent.click(screen.getByRole("button", { name: /expand all/i }));
    fireEvent.click(screen.getByRole("button", { name: /collapse all/i }));
    expect(screen.queryByText(/Deciding your degree level early shapes/)).not.toBeVisible();
  });

  it("shows commonly requested documents, mistakes, checklist, and degree-level notes once expanded", () => {
    render(<RoadmapStepList steps={sampleSteps()} />);
    fireEvent.click(screen.getByRole("button", { name: /expand all/i }));
    expect(screen.getByText("Passport")).toBeInTheDocument();
    expect(screen.getByText("Applying out of order.")).toBeInTheDocument();
    expect(screen.getByText("Application submitted")).toBeInTheDocument();
    expect(
      screen.getByText(/PhD applicants may have different work-hour rules/),
    ).toBeInTheDocument();
  });

  it("official source links open safely in a new tab", () => {
    render(<RoadmapStepList steps={sampleSteps()} />);
    fireEvent.click(screen.getByRole("button", { name: /expand all/i }));
    const link = screen.getByRole("link", { name: "Official visa page" });
    expect(link).toHaveAttribute("href", "https://example.gov/visa");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render a 'Commonly requested documents' section for a step with none", () => {
    render(<RoadmapStepList steps={sampleSteps()} />);
    fireEvent.click(screen.getByRole("button", { name: /expand all/i }));
    // Only one step (apply-visa) has documents; clarify-goals should not add a duplicate heading with an empty list.
    expect(screen.getAllByText("Commonly requested documents")).toHaveLength(1);
  });
});
