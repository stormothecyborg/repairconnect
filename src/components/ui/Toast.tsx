"use client";

import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastProps {
  open: boolean;
  title: string;
  description?: string;
  variant?: ToastVariant;
  onClose?: () => void;
}

const variants = {
  success: { icon: CheckCircle2, className: "text-success" },
  error: { icon: TriangleAlert, className: "text-danger" },
  info: { icon: Info, className: "text-primary" },
};

export function Toast({ open, title, description, variant = "success", onClose }: ToastProps) {
  if (!open) return null;
  const { icon: Icon, className } = variants[variant];

  return (
    <div className="fixed right-4 top-4 z-[60] flex w-[min(24rem,calc(100vw-2rem))] items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-lg" role="status" aria-live="polite">
      <Icon className={cn("mt-0.5 size-5 shrink-0", className)} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-heading">{title}</p>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {onClose && (
        <Button variant="ghost" size="sm" aria-label="Dismiss notification" onClick={onClose} className="-mr-2 -mt-2 size-8 px-0 text-muted">
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}