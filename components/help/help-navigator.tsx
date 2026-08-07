"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useProgressStore } from "@/lib/learning/store";
import { useSessionStore } from "@/lib/auth/session-store";
import { getNextLessonRecommendation } from "@/lib/learning/recommendation";
import { visaSparkUrl } from "@/lib/site-config";
import { useModalA11y } from "@/lib/hooks/use-modal-a11y";
import {
  HELP_OPTIONS,
  resolveHelpOption,
  buildVerifyByCodeHref,
  type HelpOptionId,
  type HelpResponse,
} from "@/lib/help/options";
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/components/ui/icons";

/**
 * A deterministic navigation assistant -- NOT an LLM chatbot. No external
 * API call, no ongoing cost, no free-form question box (one bounded
 * exception: typing a verification code, which only ever builds a
 * `/certificates/verify/<code>` link, never sent anywhere as a "question").
 * No transcript is stored -- state resets to the menu every time this closes.
 * See docs/product-expansion/DECISIONS.md.
 */
export function HelpNavigator() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<HelpOptionId["id"] | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const userId = useSessionStore((s) => s.userId);
  const progressState = useProgressStore((s) => s.state);
  const hydrated = useProgressStore((s) => s.hydrated);

  const close = () => {
    setOpen(false);
    setSelected(null);
    setVerifyCode("");
  };

  useModalA11y({
    open,
    onClose: close,
    containerRef: dialogRef,
    initialFocusRef: closeButtonRef,
    triggerRef,
  });

  const recommendation = hydrated ? getNextLessonRecommendation(progressState) : undefined;
  const response: HelpResponse | null = selected
    ? resolveHelpOption(selected, {
        signedIn: Boolean(userId),
        recommendedLesson: recommendation
          ? {
              href: `/courses/${recommendation.lesson.courseSlug}/${recommendation.lesson.slug}`,
              title: recommendation.lesson.title,
            }
          : undefined,
        visaSparkUrl,
      })
    : null;

  const go = (href: string) => {
    close();
    router.push(href);
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 z-40 print:hidden">
        <Button
          ref={triggerRef}
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
        >
          Help
        </Button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 print:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={close} aria-hidden="true" />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-navigator-title"
            className="animate-fade-up absolute bottom-4 left-4 flex max-h-[70vh] w-[min(360px,calc(100vw-2rem))] flex-col rounded-2xl border border-(--color-border) bg-(--color-surface) p-4 shadow-[var(--shadow-lg)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <p id="help-navigator-title" className="font-semibold">
                {selected ? "Here's what I found" : "How can I help you?"}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Close help"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--color-border-strong) hover:bg-(--color-surface-sunken)"
              >
                <CloseIcon width={16} height={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {!selected ? (
                <ul className="flex flex-col gap-1.5">
                  {HELP_OPTIONS.map((opt) => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => setSelected(opt.id)}
                        className="w-full rounded-lg border border-(--color-border) px-3 py-2 text-left text-sm hover:bg-(--color-surface-sunken)"
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                response && (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-(--color-ink-muted)">{response.text}</p>

                    {selected === "verify-certificate" && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (verifyCode.trim()) go(buildVerifyByCodeHref(verifyCode));
                        }}
                        className="flex gap-2"
                      >
                        <label className="sr-only" htmlFor="help-verify-code">
                          Verification code
                        </label>
                        <input
                          id="help-verify-code"
                          type="text"
                          value={verifyCode}
                          onChange={(e) => setVerifyCode(e.target.value)}
                          placeholder="Verification code"
                          className="flex-1 rounded-lg border border-(--color-border-strong) bg-(--color-canvas) px-2 py-1.5 text-sm"
                        />
                        <Button type="submit" size="sm" disabled={!verifyCode.trim()}>
                          Verify
                        </Button>
                      </form>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {response.actions.map((action) => (
                        <Button
                          key={action.href}
                          type="button"
                          size="sm"
                          onClick={() => go(action.href)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {selected && (
              <div className="mt-3 flex gap-2 border-t border-(--color-border) pt-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelected(null)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelected(null);
                    setVerifyCode("");
                  }}
                >
                  Start over
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
