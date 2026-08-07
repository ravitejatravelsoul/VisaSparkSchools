import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import { SplitRunnerLayout } from "@/components/runners/split-runner-layout";

function Wrapper() {
  const [tab, setTab] = useState<"editor" | "output">("editor");
  return (
    <SplitRunnerLayout
      editor={<textarea aria-label="Code input" defaultValue="console.log(1)" />}
      output={<p>Output: 1</p>}
      activeMobileTab={tab}
      onActiveMobileTabChange={setTab}
    />
  );
}

describe("SplitRunnerLayout", () => {
  it("renders both the editor and output content simultaneously (present in the DOM for desktop side-by-side)", () => {
    render(<Wrapper />);
    expect(screen.getByLabelText("Code input")).toBeInTheDocument();
    expect(screen.getByText("Output: 1")).toBeInTheDocument();
  });

  it("exposes an accessible tab pair for mobile", () => {
    render(<Wrapper />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
  });

  it("switching tabs never unmounts the editor -- its content survives the switch", () => {
    render(<Wrapper />);
    const editorTextarea = screen.getByLabelText("Code input") as HTMLTextAreaElement;
    fireEvent.change(editorTextarea, { target: { value: "console.log(2)" } });

    fireEvent.click(screen.getByRole("tab", { name: "Output" }));
    fireEvent.click(screen.getByRole("tab", { name: "Editor" }));

    expect((screen.getByLabelText("Code input") as HTMLTextAreaElement).value).toBe(
      "console.log(2)",
    );
  });

  it("switching the active tab does not move keyboard focus unexpectedly", () => {
    render(<Wrapper />);
    const outputTab = screen.getByRole("tab", { name: "Output" });
    outputTab.focus();
    fireEvent.click(outputTab);
    // Focus stays on the tab the user actually activated -- nothing steals it.
    expect(document.activeElement).toBe(outputTab);
  });

  it("a controlled activeMobileTab prop lets the caller switch to Output programmatically (e.g. after Run)", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <SplitRunnerLayout
        editor={<div>editor</div>}
        output={<div>output</div>}
        activeMobileTab="editor"
        onActiveMobileTabChange={onChange}
      />,
    );
    expect(screen.getByRole("tab", { name: "Editor" })).toHaveAttribute("aria-selected", "true");

    rerender(
      <SplitRunnerLayout
        editor={<div>editor</div>}
        output={<div>output</div>}
        activeMobileTab="output"
        onActiveMobileTabChange={onChange}
      />,
    );
    expect(screen.getByRole("tab", { name: "Output" })).toHaveAttribute("aria-selected", "true");
  });
});
