"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton, ToolField, INPUT_CLASS, ErrorText } from "@/components/tools/tool-shell";

const MAX_TIMESTAMP_LENGTH = 20;
// A timestamp this large in *seconds* would be far beyond any real date (year ~275760 in ms);
// used to auto-detect whether the learner typed seconds or milliseconds.
const MS_THRESHOLD = 1e12;

function parseTimestamp(raw: string): Date | null {
  if (!/^-?\d+$/.test(raw.trim())) return null;
  const n = Number(raw.trim());
  if (!Number.isFinite(n)) return null;
  const ms = Math.abs(n) >= MS_THRESHOLD ? n : n * 1000;
  const date = new Date(ms);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function TimestampConverterTool() {
  const [timestampInput, setTimestampInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const fromTimestamp = useMemo(() => {
    if (timestampInput.trim().length === 0) return null;
    return parseTimestamp(timestampInput);
  }, [timestampInput]);

  const fromDate = useMemo(() => {
    if (dateInput.trim().length === 0) return null;
    const date = new Date(dateInput);
    return Number.isNaN(date.getTime()) ? null : date;
  }, [dateInput]);

  const nowMs = () => Date.now().toString();

  const reset = () => {
    setTimestampInput("");
    setDateInput("");
  };

  return (
    <div className="grid gap-8">
      <div>
        <ToolField label="Unix timestamp (seconds or milliseconds)" htmlFor="ts-input">
          <input
            id="ts-input"
            type="text"
            inputMode="numeric"
            value={timestampInput}
            onChange={(e) =>
              setTimestampInput(
                e.target.value.replace(/[^0-9-]/g, "").slice(0, MAX_TIMESTAMP_LENGTH),
              )
            }
            maxLength={MAX_TIMESTAMP_LENGTH}
            placeholder="e.g. 1735689600"
            className={`${INPUT_CLASS} font-mono`}
          />
        </ToolField>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setTimestampInput(nowMs())}
          >
            Use current time
          </Button>
        </div>
        {timestampInput.trim().length > 0 && !fromTimestamp && (
          <ErrorText>
            Enter a whole number of seconds or milliseconds since the Unix epoch.
          </ErrorText>
        )}
        {fromTimestamp && (
          <div className="mt-3 space-y-1 rounded-lg border border-(--color-border) p-3 text-sm">
            <p>
              <span className="text-(--color-ink-faint)">Local: </span>
              {fromTimestamp.toString()}
            </p>
            <p>
              <span className="text-(--color-ink-faint)">UTC: </span>
              {fromTimestamp.toUTCString()}
            </p>
            <p>
              <span className="text-(--color-ink-faint)">ISO 8601: </span>
              {fromTimestamp.toISOString()}
            </p>
            <CopyButton text={fromTimestamp.toISOString()} label="Copy ISO 8601" />
          </div>
        )}
      </div>

      <div>
        <ToolField label="Date and time" htmlFor="date-input">
          <input
            id="date-input"
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className={INPUT_CLASS}
          />
        </ToolField>
        {fromDate && (
          <div className="mt-3 space-y-1 rounded-lg border border-(--color-border) p-3 text-sm">
            <p>
              <span className="text-(--color-ink-faint)">Seconds: </span>
              {Math.floor(fromDate.getTime() / 1000)}
            </p>
            <p>
              <span className="text-(--color-ink-faint)">Milliseconds: </span>
              {fromDate.getTime()}
            </p>
            <CopyButton
              text={Math.floor(fromDate.getTime() / 1000).toString()}
              label="Copy seconds"
            />
          </div>
        )}
      </div>

      <div>
        <Button type="button" variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
