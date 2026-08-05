/** Pure line-level diff (Myers-style LCS via dynamic programming), no dependency. */
export type DiffLineKind = "same" | "added" | "removed";

export interface DiffLine {
  kind: DiffLineKind;
  text: string;
}

/** Bounds the DP table to O(limit^2) cells so a huge paste can't hang the tab. */
export const MAX_DIFF_LINES = 2000;

export function diffLines(original: string, changed: string): DiffLine[] {
  const a = original.split("\n").slice(0, MAX_DIFF_LINES);
  const b = changed.split("\n").slice(0, MAX_DIFF_LINES);
  const n = a.length;
  const m = b.length;

  // dp[i][j] = length of the LCS of a[i:] and b[j:]
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      result.push({ kind: "same", text: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ kind: "removed", text: a[i] });
      i++;
    } else {
      result.push({ kind: "added", text: b[j] });
      j++;
    }
  }
  while (i < n) {
    result.push({ kind: "removed", text: a[i] });
    i++;
  }
  while (j < m) {
    result.push({ kind: "added", text: b[j] });
    j++;
  }
  return result;
}
