import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HelpNavigator } from "@/components/help/help-navigator";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { createEmptyProgress } from "@/lib/learning/types";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

beforeEach(() => {
  push.mockClear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
  useSessionStore.setState({ userId: null, email: null });
});

describe("HelpNavigator", () => {
  it("is closed by default and opens with the initial 'How can I help you?' prompt", () => {
    render(<HelpNavigator />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("How can I help you?")).toBeInTheDocument();
  });

  it("lists every option as a selectable button", () => {
    render(<HelpNavigator />);
    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    expect(screen.getByRole("button", { name: "Find a course" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Explore study-abroad roadmaps" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Verify a certificate" })).toBeInTheDocument();
  });

  it("selecting an option shows a response and a working navigation action", () => {
    render(<HelpNavigator />);
    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    fireEvent.click(screen.getByRole("button", { name: "Find a course" }));

    expect(screen.getByText(/every course is independent/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Browse all courses" }));
    expect(push).toHaveBeenCalledWith("/courses");
    // Navigating closes the dialog and resets it.
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("the signed-out dashboard option explains sign-in is required", () => {
    render(<HelpNavigator />);
    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    fireEvent.click(screen.getByRole("button", { name: "View my dashboard" }));
    expect(screen.getByText(/sign in first/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(push).toHaveBeenCalledWith("/sign-in?next=%2Fdashboard");
  });

  it("Back returns to the menu without closing the dialog", () => {
    render(<HelpNavigator />);
    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    fireEvent.click(screen.getByRole("button", { name: "Find a course" }));
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByText("How can I help you?")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("Escape closes the dialog and resets it back to the menu for next time", () => {
    render(<HelpNavigator />);
    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    fireEvent.click(screen.getByRole("button", { name: "Find a course" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    expect(screen.getByText("How can I help you?")).toBeInTheDocument();
  });

  it("the verify-certificate option accepts a typed code and navigates to its verification URL", () => {
    render(<HelpNavigator />);
    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    fireEvent.click(screen.getByRole("button", { name: "Verify a certificate" }));

    fireEvent.change(screen.getByLabelText("Verification code"), {
      target: { value: "vcode-test-1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Verify" }));
    expect(push).toHaveBeenCalledWith("/certificates/verify/vcode-test-1");
  });

  it("never renders a free-form question textbox (deterministic navigator, not an LLM chat)", () => {
    render(<HelpNavigator />);
    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
