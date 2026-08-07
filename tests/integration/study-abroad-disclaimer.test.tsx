import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StudyAbroadDisclaimer } from "@/components/study-abroad/disclaimer";

describe("StudyAbroadDisclaimer", () => {
  it("states this platform is not a government, university, or licensed legal/immigration advisor", () => {
    render(<StudyAbroadDisclaimer />);
    expect(
      screen.getByText(
        /not a government agency, university, or licensed immigration\/legal advisor/i,
      ),
    ).toBeInTheDocument();
  });

  it("never guarantees admission, a scholarship, or visa approval", () => {
    render(<StudyAbroadDisclaimer />);
    expect(
      screen.getByText(/nothing here guarantees admission, a scholarship, or visa approval/i),
    ).toBeInTheDocument();
  });
});
