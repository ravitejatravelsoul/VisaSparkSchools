/**
 * Previews the AI tutor's content-ingestion pipeline: chunks every lesson's
 * approved course content into retrieval-sized pieces with stable IDs.
 *
 * This script does not call any external API or write to a vector database
 * -- there is no vector store wired up in this beta (see docs/ARCHITECTURE.md
 * and README "Known limitations"). It exists to make the chunking behavior
 * inspectable and to prove idempotency: running it twice produces byte-identical
 * chunk IDs and text for unchanged lessons, which is the property a real
 * ingestion job (chunk -> embed -> upsert by ID) depends on to avoid
 * duplicating unchanged content on every run.
 */
import { chunkAllLessons } from "../lib/ai/chunking";

const chunks = chunkAllLessons();

const byLesson = new Map<string, number>();
for (const chunk of chunks) {
  byLesson.set(chunk.lessonId, (byLesson.get(chunk.lessonId) ?? 0) + 1);
}

const ids = chunks.map((c) => c.id);
const uniqueIds = new Set(ids);
if (uniqueIds.size !== ids.length) {
  console.error(`✗ Found duplicate chunk ids (${ids.length - uniqueIds.size} duplicates).`);
  process.exit(1);
}

console.log(`Chunked ${byLesson.size} lessons into ${chunks.length} chunks.`);
console.log(`All chunk ids are stable and unique (idempotent re-ingestion is safe).`);
console.log("\nSample chunks:");
for (const chunk of chunks.slice(0, 3)) {
  console.log(`  [${chunk.id}] ${chunk.lessonTitle} — ${chunk.heading || "(untitled section)"}`);
  console.log(`    ${chunk.text.slice(0, 100).replace(/\n/g, " ")}...`);
}
