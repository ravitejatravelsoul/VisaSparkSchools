"use client";

import { useProgressStore } from "@/lib/learning/store";
import { Button } from "@/components/ui/button";

export function BookmarkButton({ lessonId }: { lessonId: string }) {
  const isBookmarked = useProgressStore((s) => s.state.bookmarks.includes(lessonId));
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={() => toggleBookmark(lessonId)}
      aria-pressed={isBookmarked}
    >
      {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
    </Button>
  );
}
