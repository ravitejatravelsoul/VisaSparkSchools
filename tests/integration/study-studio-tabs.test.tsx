import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StudyStudioTabs } from "@/components/study-studio/study-studio-tabs";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";

const push = vi.fn();
let searchParamsValue = "";
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/study-studio",
  useSearchParams: () => new URLSearchParams(searchParamsValue),
}));

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
  push.mockClear();
  searchParamsValue = "";
});

describe("StudyStudioTabs", () => {
  it("renders a tablist with all six sections, defaulting to Today", () => {
    render(<StudyStudioTabs />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((t) => t.textContent)).toEqual([
      "Today",
      "Study Plan",
      "Review",
      "Focus",
      "Insights",
      "Saved Learning",
    ]);
    expect(screen.getByRole("tab", { name: "Today" })).toHaveAttribute("aria-selected", "true");
  });

  it("clicking a tab navigates via router.push with the right query param", () => {
    render(<StudyStudioTabs />);
    fireEvent.click(screen.getByRole("tab", { name: "Insights" }));
    expect(push).toHaveBeenCalledWith("/study-studio?tab=insights", { scroll: false });
  });

  it("honors the ?tab= search param for which panel is active", () => {
    searchParamsValue = "tab=focus";
    render(<StudyStudioTabs />);
    expect(screen.getByRole("tab", { name: "Focus" })).toHaveAttribute("aria-selected", "true");
  });

  it("falls back to Today for an unrecognized ?tab= value", () => {
    searchParamsValue = "tab=not-a-real-tab";
    render(<StudyStudioTabs />);
    expect(screen.getByRole("tab", { name: "Today" })).toHaveAttribute("aria-selected", "true");
  });

  it("ArrowRight moves to the next tab and navigates to it", () => {
    render(<StudyStudioTabs />);
    const todayTab = screen.getByRole("tab", { name: "Today" });
    todayTab.focus();
    fireEvent.keyDown(todayTab, { key: "ArrowRight" });
    expect(push).toHaveBeenCalledWith("/study-studio?tab=plan", { scroll: false });
  });

  it("ArrowLeft from the first tab wraps around to the last tab", () => {
    render(<StudyStudioTabs />);
    const todayTab = screen.getByRole("tab", { name: "Today" });
    todayTab.focus();
    fireEvent.keyDown(todayTab, { key: "ArrowLeft" });
    expect(push).toHaveBeenCalledWith("/study-studio?tab=saved", { scroll: false });
  });

  it("only the active tab is keyboard-tabbable (roving tabindex)", () => {
    render(<StudyStudioTabs />);
    const tabs = screen.getAllByRole("tab");
    const active = tabs.find((t) => t.getAttribute("aria-selected") === "true")!;
    const inactive = tabs.filter((t) => t !== active);
    expect(active).toHaveAttribute("tabindex", "0");
    for (const tab of inactive) {
      expect(tab).toHaveAttribute("tabindex", "-1");
    }
  });

  it("renders the Today panel's content by default", () => {
    render(<StudyStudioTabs />);
    // Empty progress with no items should still show the fallback recommendation.
    expect(screen.getByText(/suggested/i)).toBeInTheDocument();
  });
});
