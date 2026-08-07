"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { SpeakingTask } from "@/lib/exam-prep/types";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

type Phase = "setup" | "prep" | "recording" | "review";

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Speaking self-review practice: a prep timer, then a speak timer with
 * local-only recording (MediaRecorder, never uploaded anywhere) where the
 * browser supports it, falling back to a plain timer + rubric if the API is
 * unavailable or permission is denied. There is no speech-to-text and no
 * automated scoring anywhere -- self-review only, same as WritingPractice.
 */
export function SpeakingPractice({ tasks }: { tasks: SpeakingTask[] }) {
  const formId = useId();
  const [selectedId, setSelectedId] = useState(tasks[0]?.id);
  const task = tasks.find((t) => t.id === selectedId) ?? tasks[0];

  const [phase, setPhase] = useState<Phase>("setup");
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingSupported, setRecordingSupported] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const announceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Feature-detects a browser API unavailable during SSR -- there is no
    // way to know this before the client mounts, so it can't be computed
    // during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecordingSupported(
      typeof navigator !== "undefined" &&
        Boolean(navigator.mediaDevices?.getUserMedia) &&
        typeof MediaRecorder !== "undefined",
    );
  }, []);

  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const beginRecording = useCallback(async () => {
    if (recordingSupported) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        chunksRef.current = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          setAudioUrl(URL.createObjectURL(blob));
          stream.getTracks().forEach((t) => t.stop());
        };
        mediaRecorderRef.current = recorder;
        recorder.start();
      } catch {
        // Permission denied or device error -- fall back to timer-only practice.
        setRecordingSupported(false);
      }
    }
    if (announceRef.current) announceRef.current.textContent = "Speaking time started.";
    setPhase("recording");
    setSecondsRemaining(task.speakSeconds);
  }, [recordingSupported, task.speakSeconds]);

  useEffect(() => {
    if ((phase !== "prep" && phase !== "recording") || secondsRemaining === null) return;
    const timer = setInterval(() => {
      setSecondsRemaining((s) => {
        if (s === null) return s;
        if (s > 1) return s - 1;
        if (phase === "prep") {
          beginRecording();
        } else {
          mediaRecorderRef.current?.stop();
          setPhase("review");
          if (announceRef.current) announceRef.current.textContent = "Time is up.";
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, secondsRemaining, beginRecording]);

  if (!task) return null;

  function selectTask(id: string) {
    setSelectedId(id);
    setChecked({});
    setAudioUrl(null);
    setPhase("setup");
    setSecondsRemaining(null);
  }

  function start() {
    setAudioUrl(null);
    if (task.prepSeconds > 0) {
      setPhase("prep");
      setSecondsRemaining(task.prepSeconds);
    } else {
      beginRecording();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div ref={announceRef} aria-live="polite" className="sr-only" />

      <div className="flex flex-wrap gap-2">
        {tasks.map((t) => (
          <Button
            key={t.id}
            type="button"
            variant={t.id === task.id ? "primary" : "secondary"}
            size="sm"
            onClick={() => selectTask(t.id)}
          >
            {t.taskName}
          </Button>
        ))}
      </div>

      <Card>
        <CardBody className="flex flex-col gap-4 p-6">
          <div>
            <h3 className="font-semibold">{task.taskName}</h3>
            <p className="mt-1 text-sm text-(--color-ink-muted)">{task.instructions}</p>
          </div>
          <p className="rounded-lg bg-(--color-canvas) p-3 text-sm">{task.prompt}</p>

          {!recordingSupported && phase === "setup" && (
            <Alert tone="info">
              Your browser doesn&apos;t support local audio recording (or permission was denied).
              You can still practice with the timer and speak out loud on your own.
            </Alert>
          )}

          {phase === "setup" && (
            <div>
              <p className="mb-2 text-sm text-(--color-ink-faint)">
                {task.prepSeconds > 0 ? `${task.prepSeconds}s to prepare, then ` : ""}
                {task.speakSeconds}s to speak.
              </p>
              <Button type="button" onClick={start}>
                {task.prepSeconds > 0 ? "Start preparation" : "Start speaking"}
              </Button>
            </div>
          )}

          {(phase === "prep" || phase === "recording") && secondsRemaining !== null && (
            <div aria-live="polite">
              <p className="text-lg font-semibold">
                {phase === "prep" ? "Preparing" : "Speaking"}: {formatClock(secondsRemaining)}
              </p>
              {phase === "recording" && recordingSupported && (
                <p className="text-sm text-(--color-ink-muted)">
                  Recording locally in your browser -- never uploaded anywhere.
                </p>
              )}
            </div>
          )}

          {phase === "review" && (
            <div className="border-t border-(--color-border) pt-4">
              {audioUrl && (
                <div className="mb-4">
                  <p className="mb-1 text-sm font-medium">Your recording</p>
                  <audio controls src={audioUrl} className="w-full" />
                </div>
              )}
              <Alert tone="info" title="Self-review, not an automated score">
                Nobody and nothing has graded this response -- listen back (if recorded) and score
                yourself honestly against each criterion below.
              </Alert>
              <fieldset className="mt-3 flex flex-col gap-2">
                <legend className="text-sm font-medium">Review your response against:</legend>
                {task.rubric.map((r) => {
                  const id = `${formId}-${task.id}-${r.criterion}`;
                  return (
                    <label
                      key={r.criterion}
                      htmlFor={id}
                      className="flex cursor-pointer items-start gap-2 rounded-lg border border-(--color-border) p-3"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0"
                        checked={Boolean(checked[r.criterion])}
                        onChange={(e) =>
                          setChecked((c) => ({ ...c, [r.criterion]: e.target.checked }))
                        }
                      />
                      <span className="text-sm">
                        <span className="font-medium">{r.criterion}.</span> {r.guidance}
                      </span>
                    </label>
                  );
                })}
              </fieldset>
              <Button
                type="button"
                variant="secondary"
                className="mt-3"
                onClick={() => selectTask(task.id)}
              >
                Try this task again
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
