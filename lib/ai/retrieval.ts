import type { ContentChunk, RetrievedChunk } from "@/lib/ai/types";

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "is",
  "are",
  "was",
  "were",
  "to",
  "of",
  "in",
  "on",
  "for",
  "and",
  "or",
  "how",
  "what",
  "why",
  "do",
  "does",
  "it",
  "this",
  "that",
  "with",
  "as",
  "be",
  "can",
  "i",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

/**
 * Deterministic keyword relevance score (term-overlap ratio weighted by term
 * frequency in the chunk) -- this is the "keyword/full-text" half of hybrid
 * retrieval. It requires no embedding API call, so tutor grounding still
 * works even when only AI_TUTOR_ENABLED (not a configured embedding model)
 * is set. A vector similarity score can be merged in by callers once an
 * embedding provider is configured (see mergeHybridScores below).
 */
export function keywordSearch(
  query: string,
  chunks: ContentChunk[],
  topK: number,
): RetrievedChunk[] {
  const queryTerms = new Set(tokenize(query));
  if (queryTerms.size === 0) return [];

  const scored = chunks.map((chunk) => {
    const chunkTerms = tokenize(chunk.text + " " + chunk.heading + " " + chunk.lessonTitle);
    if (chunkTerms.length === 0) return { ...chunk, score: 0 };
    const termCounts = new Map<string, number>();
    for (const term of chunkTerms) termCounts.set(term, (termCounts.get(term) ?? 0) + 1);

    let matchWeight = 0;
    for (const term of queryTerms) {
      const count = termCounts.get(term) ?? 0;
      if (count > 0) matchWeight += 1 + Math.log(1 + count);
    }
    const score = matchWeight / (queryTerms.size + Math.log(1 + chunkTerms.length));
    return { ...chunk, score };
  });

  return scored
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/** Merges keyword and (optional) vector similarity scores with equal weight. */
export function mergeHybridScores(
  keywordResults: RetrievedChunk[],
  vectorResults: RetrievedChunk[],
): RetrievedChunk[] {
  const byId = new Map<string, RetrievedChunk>();
  for (const chunk of keywordResults) {
    byId.set(chunk.id, { ...chunk, score: 0.5 * chunk.score });
  }
  for (const chunk of vectorResults) {
    const existing = byId.get(chunk.id);
    if (existing) {
      existing.score += 0.5 * chunk.score;
    } else {
      byId.set(chunk.id, { ...chunk, score: 0.5 * chunk.score });
    }
  }
  return [...byId.values()].sort((a, b) => b.score - a.score);
}

export function dedupeByLesson(chunks: RetrievedChunk[]): RetrievedChunk[] {
  const bestPerLesson = new Map<string, RetrievedChunk>();
  for (const chunk of chunks) {
    const existing = bestPerLesson.get(chunk.lessonId);
    if (!existing || chunk.score > existing.score) {
      bestPerLesson.set(chunk.lessonId, chunk);
    }
  }
  return [...bestPerLesson.values()].sort((a, b) => b.score - a.score);
}

export const MIN_RELEVANCE_THRESHOLD = 0.15;
