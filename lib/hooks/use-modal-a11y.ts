"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Shared modal-dialog keyboard behavior: focuses `initialFocusRef` on open,
 * traps Tab/Shift+Tab within `containerRef`, closes on Escape, restores
 * focus to `triggerRef` on close, and locks body scroll while open.
 *
 * Consolidates what were four separately hand-rolled `fixed inset-0`
 * dialogs (mobile nav, course-contents drawer, technology filter drawer, AI
 * tutor panel) -- each focused an initial element and (some) handled
 * Escape, but none actually trapped Tab, so a keyboard user could tab past
 * the dialog into the page behind it while it was still visually covering
 * that page (confirmed by tabbing through the open mobile nav in a real
 * browser: focus landed on "Skip to main content" behind the drawer).
 */
export function useModalA11y({
  open,
  onClose,
  containerRef,
  initialFocusRef,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef: RefObject<HTMLElement | null>;
  triggerRef?: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    if (!open) return;
    initialFocusRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef?.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const container = containerRef.current;
      if (!container) return;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally re-runs only when `open` toggles, not on every ref/callback identity change
  }, [open]);
}
