import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, id, className, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = error || hint ? `${inputId}-message` : undefined;

  return (
    <div className="grid gap-1.5">
      {label && <label htmlFor={inputId} className="text-sm font-medium text-heading">{label}</label>}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={messageId}
        className={cn(
          "h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-50",
          error && "border-danger focus:border-danger focus:ring-danger/10",
          className,
        )}
        {...props}
      />
      {(error || hint) && <p id={messageId} className={cn("text-xs", error ? "text-danger" : "text-muted")}>{error ?? hint}</p>}
    </div>
  );
}