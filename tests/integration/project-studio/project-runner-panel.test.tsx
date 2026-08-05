import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProjectRunnerPanel } from "@/components/project-studio/project-runner-panel";

// The real CodeEditor renders Monaco, which doesn't mount in jsdom -- mock it
// with a plain, testable textarea so these tests exercise ProjectRunnerPanel's
// own autosave/reset/export/import logic, not a third-party editor. Runner
// behavior itself (Run/output) is covered by the Playwright e2e suite in a
// real browser, matching this codebase's existing convention (no runner
// component is rendered directly in any Vitest integration test today).
vi.mock("@/components/runners/code-editor", () => ({
  CodeEditor: ({
    value,
    onChange,
    ariaLabel,
  }: {
    value: string;
    onChange: (v: string) => void;
    ariaLabel: string;
  }) => (
    <textarea aria-label={ariaLabel} value={value} onChange={(e) => onChange(e.target.value)} />
  ),
}));

beforeEach(() => {
  window.localStorage.clear();
  // jsdom doesn't implement Blob URL creation -- stub it so Export doesn't throw.
  URL.createObjectURL = vi.fn(() => "blob:mock");
  URL.revokeObjectURL = vi.fn();
});

const STARTER = "// starter code";

describe("ProjectRunnerPanel", () => {
  it("shows the starter code by default", async () => {
    render(<ProjectRunnerPanel projectId="p1" runnerLanguage="javascript" starterCode={STARTER} />);
    await waitFor(() => {
      expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument();
    });
  });

  it("autosaves edited code to this browser under a project-scoped key", async () => {
    render(<ProjectRunnerPanel projectId="p1" runnerLanguage="javascript" starterCode={STARTER} />);
    await waitFor(() => expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument());

    fireEvent.change(screen.getByDisplayValue(STARTER), {
      target: { value: "console.log('hi')" },
    });

    expect(window.localStorage.getItem("visasparkschools:code:project-studio:p1")).toBe(
      "console.log('hi')",
    );
  });

  it("recovers edited code after a remount (refresh recovery)", async () => {
    const { unmount } = render(
      <ProjectRunnerPanel projectId="p1" runnerLanguage="javascript" starterCode={STARTER} />,
    );
    await waitFor(() => expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument());
    fireEvent.change(screen.getByDisplayValue(STARTER), { target: { value: "let x = 1;" } });
    unmount();

    render(<ProjectRunnerPanel projectId="p1" runnerLanguage="javascript" starterCode={STARTER} />);
    await waitFor(() => {
      expect(screen.getByDisplayValue("let x = 1;")).toBeInTheDocument();
    });
  });

  it("reset requires confirmation, then restores the starter code", async () => {
    render(<ProjectRunnerPanel projectId="p1" runnerLanguage="javascript" starterCode={STARTER} />);
    await waitFor(() => expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument());
    fireEvent.change(screen.getByDisplayValue(STARTER), { target: { value: "changed" } });

    fireEvent.click(screen.getByRole("button", { name: "Reset workspace" }));
    // Not reset yet -- confirmation is required first.
    expect(screen.getByDisplayValue("changed")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument();
  });

  it("Cancel on the reset confirmation leaves the code untouched", async () => {
    render(<ProjectRunnerPanel projectId="p1" runnerLanguage="javascript" starterCode={STARTER} />);
    await waitFor(() => expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument());
    fireEvent.change(screen.getByDisplayValue(STARTER), { target: { value: "changed" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset workspace" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.getByDisplayValue("changed")).toBeInTheDocument();
  });

  it("rejects an imported workspace file for a different project", async () => {
    render(<ProjectRunnerPanel projectId="p1" runnerLanguage="javascript" starterCode={STARTER} />);
    await waitFor(() => expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument());

    const file = new File(
      [
        JSON.stringify({
          projectId: "other-project",
          code: "hacked",
          runnerLanguage: "javascript",
        }),
      ],
      "workspace.json",
      { type: "application/json" },
    );
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/different project/i)).toBeInTheDocument();
    });
    expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument();
  });

  it("rejects a malformed import file with a clear error, never crashing", async () => {
    render(<ProjectRunnerPanel projectId="p1" runnerLanguage="javascript" starterCode={STARTER} />);
    await waitFor(() => expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument());

    const file = new File(["not json at all"], "workspace.json", { type: "application/json" });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/couldn.t read that file/i)).toBeInTheDocument();
    });
  });

  it("accepts a valid, matching workspace import and restores its code", async () => {
    render(<ProjectRunnerPanel projectId="p1" runnerLanguage="javascript" starterCode={STARTER} />);
    await waitFor(() => expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument());

    const file = new File(
      [
        JSON.stringify({
          projectId: "p1",
          code: "restored code",
          runnerLanguage: "javascript",
          exportedAt: new Date().toISOString(),
        }),
      ],
      "workspace.json",
      { type: "application/json" },
    );
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByDisplayValue("restored code")).toBeInTheDocument();
    });
  });

  it("Export does not throw (creates and revokes a blob URL)", async () => {
    render(<ProjectRunnerPanel projectId="p1" runnerLanguage="javascript" starterCode={STARTER} />);
    await waitFor(() => expect(screen.getByDisplayValue(STARTER)).toBeInTheDocument());
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: "Export workspace" })),
    ).not.toThrow();
    expect(URL.createObjectURL).toHaveBeenCalled();
  });
});
