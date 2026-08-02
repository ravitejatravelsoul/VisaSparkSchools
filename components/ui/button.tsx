import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-(--color-brand) text-(--color-brand-contrast) hover:brightness-110 border border-transparent",
  secondary:
    "bg-(--color-surface) text-(--color-ink) border border-(--color-border-strong) hover:bg-(--color-canvas)",
  /** The "spark" accent -- for a meaningful action that isn't the page's primary one (e.g. "Try the playground" next to "Start learning"). */
  accent:
    "bg-(--color-accent) text-(--color-accent-contrast) hover:brightness-110 border border-transparent",
  ghost: "bg-transparent text-(--color-ink) border border-transparent hover:bg-(--color-surface)",
  danger: "bg-(--color-danger) text-white border border-transparent hover:brightness-110",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-5 py-3 gap-2",
};

const base =
  "inline-flex items-center justify-center rounded-lg font-medium transition-[color,background-color,border-color,transform] duration-[var(--motion-fast)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ref,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> }) {
  return (
    <button
      ref={ref}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
