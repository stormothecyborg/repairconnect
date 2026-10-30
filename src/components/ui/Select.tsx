import { useId, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Select({ label, error, hint, id, className, children, ...props }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = error || hint ? `${selectId}-message` : undefined;

  return (
    <div className="grid gap-1.5">
      {label && <label htmlFor={selectId} className="text-sm font-medium text-heading">{label}</label>}
      <select
        id={selectId}
        aria-invalid={Boolean(error)}
        aria-describedby={messageId}
        className={cn(
          "h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-50",
          error && "border-danger focus:border-danger focus:ring-danger/10",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {(error || hint) && <p id={messageId} className={cn("text-xs", error ? "text-danger" : "text-muted")}>{error ?? hint}</p>}
    </div>
  );
}