import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StudyPlanPanel } from "@/components/study-studio/study-plan-panel";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";

beforeEach(() => {
  window.localStorage.clear();
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

describe("StudyPlanPanel", () => {
  it("shows an empty state with a create-plan call to action when there are no plans", () => {
    render(<StudyPlanPanel />);
    expect(screen.getByText(/no study plans yet/i)).toBeInTheDocument();
  });

  it("creates a plan from the form and shows it in the list", () => {
    render(<StudyPlanPanel />);
    fireEvent.click(screen.getByRole("button", { name: /create a study plan/i }));

    fireEvent.change(screen.getByLabelText(/plan title/i), {
      target: { value: "Foundations sprint" },
    });
    fireEvent.click(screen.getByLabelText("How Computing & the Web Work"));
    fireEvent.click(screen.getByRole("button", { name: /^create plan$/i }));

    expect(screen.getByText("Foundations sprint")).toBeInTheDocument();
    expect(Object.keys(useProgressStore.getState().state.studyPlans)).toHaveLength(1);
  });

  it("disables the create button until a title and at least one course are chosen", () => {
    render(<StudyPlanPanel />);
    fireEvent.click(screen.getByRole("button", { name: /create a study plan/i }));
    expect(screen.getByRole("button", { name: /^create plan$/i })).toBeDisabled();
  });

  it("pauses and resumes a plan", () => {
    useProgressStore.getState().createStudyPlan({
      title: "My Plan",
      courseSlugs: ["how-computing-works"],
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      minutesPerSession: 60,
    });
    render(<StudyPlanPanel />);
    fireEvent.click(screen.getByRole("button", { name: /^pause$/i }));
    expect(screen.getByText("paused")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^resume$/i }));
    expect(screen.getByText("active")).toBeInTheDocument();
  });

  it("requires a confirmation step before deleting a plan", () => {
    useProgressStore.getState().createStudyPlan({
      title: "My Plan",
      courseSlugs: ["how-computing-works"],
      targetDate: null,
      preferredDaysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      minutesPerSession: 60,
    });
    render(<StudyPlanPanel />);
    fireEvent.click(screen.getByRole("button", { name: /^delete$/i }));
    expect(screen.getByText(/delete this plan/i)).toBeInTheDocument();
    expect(Object.keys(useProgressStore.getState().state.studyPlans)).toHaveLength(1);

    fireEvent.click(screen.getByRole("button", { name: /delete permanently/i }));
    expect(Object.keys(useProgressStore.getState().state.studyPlans)).toHaveLength(0);
  });

  it("warns when a target date is unrealistic in the preview", () => {
    render(<StudyPlanPanel />);
    fireEvent.click(screen.getByRole("button", { name: /create a study plan/i }));
    fireEvent.change(screen.getByLabelText(/plan title/i), { target: { value: "Tight plan" } });
    // A 14-lesson course at the form's default 30 min/session cannot possibly
    // finish by tomorrow, regardless of what "today" actually is.
    fireEvent.click(screen.getByLabelText("Test Automation Framework Engineering"));
    fireEvent.click(screen.getByLabelText(/finish by a target date/i));
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = screen.getByDisplayValue("");
    fireEvent.change(dateInput, { target: { value: tomorrow.toISOString().slice(0, 10) } });

    expect(screen.getByText(/later than your target date/i)).toBeInTheDocument();
  });
});
