import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  interactive = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  /** Adds the hover/focus elevation treatment for a card that's itself a link or button target. */
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-(--color-border) bg-(--color-surface) shadow-[var(--shadow-sm)]",
        interactive &&
          "transition-[box-shadow,border-color,transform] duration-[var(--motion-base)] hover:-translate-y-0.5 hover:border-(--color-border-strong) hover:shadow-[var(--shadow-md)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}
