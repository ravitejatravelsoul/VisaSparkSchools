"use client";

import { useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { PrimaryNavMobile } from "@/components/layout/primary-nav";
import { AccountNav } from "@/components/auth/account-nav";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import { useModalA11y } from "@/lib/hooks/use-modal-a11y";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useModalA11y({
    open,
    onClose: () => setOpen(false),
    containerRef: dialogRef,
    initialFocusRef: closeButtonRef,
    triggerRef,
  });

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={dialogId}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-(--color-border-strong) text-(--color-ink) transition-colors hover:bg-(--color-surface-sunken)"
        aria-label="Open navigation menu"
      >
        <MenuIcon width={20} height={20} />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              ref={dialogRef}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="animate-fade-up absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-(--color-surface) p-5 shadow-[var(--shadow-lg)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-semibold">Menu</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-(--color-border-strong) hover:bg-(--color-surface-sunken)"
                  aria-label="Close navigation menu"
                >
                  <CloseIcon width={16} height={16} />
                </button>
              </div>
              <PrimaryNavMobile onNavigate={() => setOpen(false)} />
              <ul className="mt-1 flex flex-col gap-1">
                <li>
                  <Link
                    href="/study-studio"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-(--color-ink) hover:bg-(--color-surface-sunken)"
                  >
                    Study Studio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-(--color-ink) hover:bg-(--color-surface-sunken)"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
              <div className="mt-4 border-t border-(--color-border) pt-4">
                <AccountNav />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
