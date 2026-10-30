import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
}

const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
  xl: "size-20 text-xl",
};

export function Avatar({ initials, size = "md", label, className, ...props }: AvatarProps) {
  return (
    <div
      aria-label={label ?? initials}
      role="img"
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-primary-tint font-semibold text-primary", sizes[size], className)}
      {...props}
    >
      {initials.slice(0, 2).toUpperCase()}
    </div>
  );
}