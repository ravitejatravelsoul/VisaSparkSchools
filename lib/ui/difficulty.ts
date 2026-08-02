import type { Difficulty } from "@/lib/content/types";

/**
 * Badge tone per difficulty level -- gives the catalog/course cards visual
 * differentiation beyond the label text alone. The label word itself always
 * carries the meaning (never color-only); this is reinforcement, not the
 * only signal.
 */
const DIFFICULTY_TONE = {
  beginner: "success",
  intermediate: "warning",
  advanced: "danger",
} as const satisfies Record<Difficulty, "success" | "warning" | "danger">;

export function difficultyTone(difficulty: Difficulty): "success" | "warning" | "danger" {
  return DIFFICULTY_TONE[difficulty];
}
