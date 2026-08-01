import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TutorLauncher } from "@/components/ai/tutor-launcher";
import { getLessonBySlug } from "@/lib/content/registry";

describe("TutorLauncher (AI disabled by default)", () => {
  it("shows an honest 'not enabled' message instead of a fake chat UI", () => {
    const lesson = getLessonBySlug("js-variables-types");
    expect(lesson).toBeDefined();
    render(<TutorLauncher lesson={lesson!} />);

    const notices = screen.getAllByText(/isn't enabled in this deployment/i);
    expect(notices.length).toBeGreaterThan(0);
    expect(screen.queryByPlaceholderText(/ask about this lesson/i)).not.toBeInTheDocument();
  });
});
