export interface ContentChunk {
  id: string;
  lessonId: string;
  lessonSlug: string;
  lessonTitle: string;
  heading: string;
  text: string;
}

export interface RetrievedChunk extends ContentChunk {
  score: number;
}

export interface Citation {
  chunkId: string;
  lessonTitle: string;
  heading: string;
  lessonSlug: string;
}

export interface TutorRequestBody {
  question: string;
  lessonSlug?: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export interface TutorResponseBody {
  answer: string;
  citations: Citation[];
  groundedInEvidence: boolean;
}
