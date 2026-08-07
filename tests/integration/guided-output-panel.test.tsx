import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GuidedOutputPanel } from "@/components/runners/guided-output-panel";
import type { GuidedOutputLab } from "@/lib/content/types";

function predictLab(): GuidedOutputLab {
  return {
    id: "c-predict-1",
    title: "What does this print?",
    language: "C",
    mode: "predict",
    prompt: "Read the code below and predict what it prints.",
    steps: [
      {
        code: '#include <stdio.h>\n\nint main(void) {\n  printf("%d\\n", 2 + 2);\n  return 0;\n}',
        expectedOutput: "4",
      },
    ],
    hints: ["printf formats and prints a value.", "%d formats an integer."],
  };
}

function fillInBlankLab(): GuidedOutputLab {
  return {
    id: "go-fill-1",
    title: "Fill in the missing keyword",
    language: "Go",
    mode: "fill-in-blank",
    prompt: "Fill in the blank to declare the function.",
    steps: [
      {
        code: '____ main() {\n  fmt.Println("hi")\n}',
        expectedOutput: "hi",
      },
    ],
    blankPlaceholder: "____",
    blankAnswer: "func",
    hints: ["Go functions start with a keyword."],
  };
}

function walkthroughLab(): GuidedOutputLab {
  return {
    id: "cpp-walkthrough-1",
    title: "Adding a null check",
    language: "C++",
    mode: "guided-editing",
    prompt: "Follow each edit and see how the output changes.",
    steps: [
      {
        description: "Start with the original function.",
        code: "int* p = nullptr;\nstd::cout << *p;",
        expectedOutput: "Undefined behavior (crash) -- dereferences a null pointer",
      },
      {
        description: "Add a null check before dereferencing.",
        code: 'int* p = nullptr;\nif (p) std::cout << *p;\nelse std::cout << "null";',
        expectedOutput: "null",
      },
    ],
    hints: ["Always check a pointer before dereferencing it."],
  };
}

describe("GuidedOutputPanel", () => {
  it("never renders a Run button, in any mode", () => {
    render(<GuidedOutputPanel lab={predictLab()} />);
    expect(screen.queryByRole("button", { name: /^run$/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/^your output$/i)).not.toBeInTheDocument();
  });

  it("shows the fixed 'Not executed' banner", () => {
    render(<GuidedOutputPanel lab={predictLab()} />);
    expect(screen.getByText("Not executed")).toBeInTheDocument();
    expect(screen.getByText(/does not run in your browser/i)).toBeInTheDocument();
  });

  it("predict mode: expected output is hidden until revealed, then labeled 'Expected output'", () => {
    render(<GuidedOutputPanel lab={predictLab()} />);
    expect(screen.queryByText("4")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /reveal expected output/i }));
    // "Expected output" appears twice by design: once as the split-layout's
    // desktop pane heading, once as the mobile tab label -- CSS (display:none
    // via Tailwind's `hidden`) keeps only one visible/announced per viewport
    // in a real browser; jsdom renders both regardless of viewport.
    expect(screen.getAllByText("Expected output").length).toBeGreaterThan(0);
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("predict mode: a learner's own prediction is labeled distinctly and never graded", () => {
    render(<GuidedOutputPanel lab={predictLab()} />);
    const field = screen.getByLabelText(/your prediction/i);
    fireEvent.change(field, { target: { value: "It prints 4" } });
    expect(field).toHaveValue("It prints 4");
  });

  it("fill-in-blank mode: shows the placeholder in the code until revealed, then shows the filled code and expected output", () => {
    render(<GuidedOutputPanel lab={fillInBlankLab()} />);
    expect(screen.getByText(/____ main/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /reveal expected output/i }));
    expect(screen.getByText(/func main/)).toBeInTheDocument();
    expect(screen.getAllByText("Expected output").length).toBeGreaterThan(0);
    expect(screen.getByText("hi")).toBeInTheDocument();
  });

  it("guided-editing mode: shows the expected output for the current step without a separate reveal step", () => {
    render(<GuidedOutputPanel lab={walkthroughLab()} />);
    expect(
      screen.queryByRole("button", { name: /reveal expected output/i }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByText("Expected output").length).toBeGreaterThan(0);
    expect(screen.getByText(/dereferences a null pointer/)).toBeInTheDocument();
  });

  it("guided-editing mode: Next step advances to the next code/expected-output pair", () => {
    render(<GuidedOutputPanel lab={walkthroughLab()} />);
    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /next step/i }));
    expect(screen.getByText("Step 2 of 2")).toBeInTheDocument();
    expect(screen.getByText("Add a null check before dereferencing.")).toBeInTheDocument();
    expect(screen.getAllByText("null").length).toBeGreaterThan(0);
  });

  it("reveals hints progressively, one click at a time", () => {
    render(<GuidedOutputPanel lab={predictLab()} />);
    expect(screen.queryByText(/printf formats and prints a value/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /show a hint/i }));
    expect(screen.getByText(/printf formats and prints a value/)).toBeInTheDocument();
    expect(screen.queryByText(/%d formats an integer/)).not.toBeInTheDocument();
  });
});
