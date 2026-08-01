import { allLessons } from "@/lib/content/registry";
import type { ContentChunk } from "@/lib/ai/types";

/**
 * Splits every lesson's approved course content into retrieval-sized chunks
 * by markdown heading (falling back to the whole explanation if there are
 * no headings), plus one chunk each for the takeaway and summary. Chunk IDs
 * are stable (derived from lessonId + section) so re-running ingestion is
 * idempotent -- unchanged lessons produce identical chunk IDs and text.
 */
export function chunkAllLessons(): ContentChunk[] {
  const chunks: ContentChunk[] = [];

  for (const lesson of allLessons) {
    const sections = splitByHeading(lesson.explanation);
    sections.forEach((section, i) => {
      chunks.push({
        id: `${lesson.id}::explanation::${i}`,
        lessonId: lesson.id,
        lessonSlug: lesson.slug,
        lessonTitle: lesson.title,
        heading: section.heading || lesson.title,
        text: section.text,
      });
    });

    chunks.push({
      id: `${lesson.id}::takeaway`,
      lessonId: lesson.id,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
      heading: "Takeaway",
      text: lesson.takeaway,
    });
    chunks.push({
      id: `${lesson.id}::summary`,
      lessonId: lesson.id,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
      heading: "Summary",
      text: lesson.summary,
    });
  }

  return chunks;
}

function splitByHeading(markdown: string): { heading: string; text: string }[] {
  const lines = markdown.split("\n");
  const sections: { heading: string; text: string }[] = [];
  let currentHeading = "";
  let currentLines: string[] = [];

  const flush = () => {
    const text = currentLines.join("\n").trim();
    if (text) sections.push({ heading: currentHeading, text });
    currentLines = [];
  };

  for (const line of lines) {
    const headingMatch = /^#{1,6}\s+(.*)/.exec(line);
    if (headingMatch) {
      flush();
      currentHeading = headingMatch[1];
    } else {
      currentLines.push(line);
    }
  }
  flush();

  if (sections.length === 0) {
    return [{ heading: "", text: markdown.trim() }];
  }
  return sections;
}
