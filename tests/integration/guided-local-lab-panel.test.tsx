import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GuidedLocalLabPanel } from "@/components/lesson/guided-local-lab-panel";
import type { GuidedLocalLab } from "@/lib/content/types";

function sampleLab(): GuidedLocalLab {
  return {
    id: "sample-lab",
    title: "Set Up a Local Project",
    scenario: "Create a small local project and verify it runs.",
    requiredTools: [{ name: "Node.js", version: "20.x" }],
    setupSteps: ["Run npm install", "Run npm start"],
    projectStructure: "src/\n  index.js",
    starterFiles: [{ path: "src/index.js", content: "console.log('hello');" }],
    requirements: ["Prints 'hello' to the console"],
    commands: [{ description: "Start the app", command: "npm start" }],
    expectedBehavior: "The terminal prints 'hello'.",
    verificationSteps: [
      { command: "npm start", expectedResult: "'hello' appears in the terminal" },
    ],
    troubleshooting: [{ issue: "Command not found", fix: "Reinstall Node.js" }],
    hints: ["Check package.json", "Check the entry file"],
    referenceSolution: {
      summary: "The starter file already satisfies the requirement.",
      files: [{ path: "src/index.js", content: "console.log('hello');" }],
    },
    extensionChallenge: "Print the current date as well.",
  };
}

describe("GuidedLocalLabPanel", () => {
  it("always shows the fixed 'Runs on your computer' honesty banner, not author-supplied text", () => {
    render(<GuidedLocalLabPanel lab={sampleLab()} />);
    expect(screen.getByText("Runs on your computer")).toBeInTheDocument();
    expect(
      screen.getByText(/does not execute, run, or verify these commands for you/i),
    ).toBeInTheDocument();
  });

  it("never renders a Run button", () => {
    render(<GuidedLocalLabPanel lab={sampleLab()} />);
    expect(screen.queryByRole("button", { name: /^run$/i })).not.toBeInTheDocument();
  });

  it("renders required tools, setup steps, commands, and verification steps", () => {
    render(<GuidedLocalLabPanel lab={sampleLab()} />);
    expect(screen.getByText(/20\.x/)).toBeInTheDocument();
    expect(screen.getByText("Run npm install")).toBeInTheDocument();
    expect(screen.getAllByText("npm start").length).toBeGreaterThan(0);
    expect(screen.getByText(/'hello' appears in the terminal/)).toBeInTheDocument();
  });

  it("reveals hints progressively, one click at a time", () => {
    render(<GuidedLocalLabPanel lab={sampleLab()} />);
    expect(screen.queryByText(/Check package\.json/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /show a hint/i }));
    expect(screen.getByText(/Check package\.json/)).toBeInTheDocument();
    expect(screen.queryByText(/Check the entry file/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /show next hint/i }));
    expect(screen.getByText(/Check the entry file/)).toBeInTheDocument();
  });

  it("hides the reference solution until explicitly revealed", () => {
    render(<GuidedLocalLabPanel lab={sampleLab()} />);
    expect(screen.queryByText(/already satisfies the requirement/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /show reference solution/i }));
    expect(screen.getByText(/already satisfies the requirement/)).toBeInTheDocument();
  });
});
