import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RegexTesterTool } from "@/components/tools/regex-tester";

describe("RegexTesterTool", () => {
  it("finds every match against the test text", () => {
    render(<RegexTesterTool />);
    fireEvent.change(screen.getByLabelText("Pattern"), { target: { value: "\\d+" } });
    fireEvent.change(screen.getByLabelText("Test text"), { target: { value: "a1 b22 c333" } });
    expect(screen.getByText("3 matches")).toBeInTheDocument();
  });

  it("shows a clear error for an invalid pattern instead of crashing", () => {
    render(<RegexTesterTool />);
    fireEvent.change(screen.getByLabelText("Pattern"), { target: { value: "(unclosed" } });
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("shows zero matches, no crash, for a pattern with no hits", () => {
    render(<RegexTesterTool />);
    fireEvent.change(screen.getByLabelText("Pattern"), { target: { value: "zzz" } });
    fireEvent.change(screen.getByLabelText("Test text"), { target: { value: "hello world" } });
    expect(screen.getByText("0 matches")).toBeInTheDocument();
  });

  it("caps a zero-width-match pattern at MAX_MATCHES instead of hanging the tab", () => {
    render(<RegexTesterTool />);
    fireEvent.change(screen.getByLabelText("Pattern"), { target: { value: "x*" } });
    fireEvent.change(screen.getByLabelText("Test text"), {
      // A zero-width match at every position -- without the lastIndex-advance
      // guard in the tool, this would loop forever instead of returning.
      target: { value: "a".repeat(5000) },
    });
    expect(screen.getByText(/1000 match/)).toBeInTheDocument();
    expect(screen.getByText(/showing first 1000/)).toBeInTheDocument();
  });

  it("Load example produces at least one real match", () => {
    render(<RegexTesterTool />);
    fireEvent.click(screen.getByRole("button", { name: "Load example" }));
    expect(screen.getByText(/[1-9]\d* match/)).toBeInTheDocument();
  });

  it("Reset clears pattern, flags, and text", () => {
    render(<RegexTesterTool />);
    fireEvent.change(screen.getByLabelText("Pattern"), { target: { value: "abc" } });
    fireEvent.change(screen.getByLabelText("Test text"), { target: { value: "abcabc" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect((screen.getByLabelText("Pattern") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Test text") as HTMLTextAreaElement).value).toBe("");
  });

  it("strips disallowed characters from the flags field", () => {
    render(<RegexTesterTool />);
    const flags = screen.getByLabelText("Flags") as HTMLInputElement;
    fireEvent.change(flags, { target: { value: "gzZi" } });
    expect(flags.value).toBe("gi");
  });
});
