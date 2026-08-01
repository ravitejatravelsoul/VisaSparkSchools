import "server-only";

/**
 * Server-side AI configuration. Never import this from a client component --
 * it reads non-public environment variables (API keys). Client components
 * should only check `featureFlags.aiTutorEnabled` from lib/site-config.
 * The `server-only` import above turns an accidental client-side import into
 * a build error instead of silently bundling secret-reading code.
 */
export interface AiConfig {
  enabled: boolean;
  apiBaseUrl: string;
  apiKey: string | undefined;
  chatModel: string;
  embeddingModel: string;
  embeddingDimensions: number;
  dailyTutorAllowance: number;
}

export function getAiConfig(): AiConfig {
  const enabled = process.env.AI_TUTOR_ENABLED === "true" && Boolean(process.env.AI_API_KEY);
  return {
    enabled,
    apiBaseUrl: process.env.AI_API_BASE_URL ?? "https://api.openai.com/v1",
    apiKey: process.env.AI_API_KEY,
    chatModel: process.env.AI_CHAT_MODEL ?? "gpt-4o-mini",
    embeddingModel: process.env.AI_EMBEDDING_MODEL ?? "text-embedding-3-small",
    embeddingDimensions: Number(process.env.AI_EMBEDDING_DIMENSIONS ?? "1536"),
    dailyTutorAllowance: Number(process.env.AI_DAILY_TUTOR_ALLOWANCE ?? "30"),
  };
}
