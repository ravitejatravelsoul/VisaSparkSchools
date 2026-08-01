export interface TestOutcome {
  id: string;
  passed: boolean;
  message?: string;
}

export interface LogLine {
  level: "log" | "warn" | "error" | "info";
  text: string;
}

export interface RunResult {
  ok: boolean;
  logs: LogLine[];
  error?: string;
  testResults?: TestOutcome[];
  /** Wall-clock ms the run took, used to detect/communicate slow runs. */
  durationMs?: number;
}

export type RunnerStatus = "idle" | "running" | "done" | "error" | "timeout";
