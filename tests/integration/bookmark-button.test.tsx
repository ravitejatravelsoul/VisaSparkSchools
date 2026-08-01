import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookmarkButton } from "@/components/lesson/bookmark-button";
import { useProgressStore } from "@/lib/learning/store";
import { createEmptyProgress } from "@/lib/learning/types";

beforeEach(() => {
  useProgressStore.setState({ state: createEmptyProgress(), hydrated: true });
});

describe("BookmarkButton", () => {
  it("starts unbookmarked and toggles on click", () => {
    render(<BookmarkButton lessonId="lesson-a" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveTextContent(/bookmark/i);

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(useProgressStore.getState().state.bookmarks).toContain("lesson-a");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(useProgressStore.getState().state.bookmarks).not.toContain("lesson-a");
  });

  it("does not affect other lessons' bookmark state", () => {
    useProgressStore.setState((s) => ({ state: { ...s.state, bookmarks: ["lesson-b"] } }));
    render(<BookmarkButton lessonId="lesson-a" />);
    fireEvent.click(screen.getByRole("button"));
    const bookmarks = useProgressStore.getState().state.bookmarks;
    expect(bookmarks).toContain("lesson-a");
    expect(bookmarks).toContain("lesson-b");
  });
});
