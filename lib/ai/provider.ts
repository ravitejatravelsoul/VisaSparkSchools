import "server-only";
import type { AiConfig } from "@/lib/ai/config";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * A minimal, provider-agnostic chat-completion call against an
 * OpenAI-compatible `/chat/completions` endpoint. Swapping providers means
 * changing AI_API_BASE_URL / AI_CHAT_MODEL -- the app is not hard-wired to
 * one vendor. Server-only: never import this from a client component.
 */
export async function callChatCompletion(
  config: AiConfig,
  messages: ChatMessage[],
): Promise<string> {
  if (!config.apiKey) {
    throw new Error("AI provider is not configured.");
  }

  const response = await fetch(`${config.apiBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.chatModel,
      messages,
      temperature: 0.3,
      max_tokens: 700,
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`AI provider responded with ${response.status}: ${body.slice(0, 200)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("AI provider returned an unexpected response shape.");
  }
  return content;
}
