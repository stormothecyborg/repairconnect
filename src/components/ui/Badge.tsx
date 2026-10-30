import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "teal" | "amber";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-sidebar text-body",
  success: "bg-success-tint text-success-strong",
  warning: "bg-warning-tint text-warning-strong",
  danger: "bg-danger-tint text-danger-strong",
  info: "bg-info-tint text-info-strong",
  teal: "bg-primary-tint text-primary",
  amber: "bg-warning-tint text-warning-strong",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium", variants[variant], className)}
      {...props}
    />
  );
}