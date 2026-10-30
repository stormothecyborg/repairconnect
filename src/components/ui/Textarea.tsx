import { useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, id, className, ...props }: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const messageId = error || hint ? `${textareaId}-message` : undefined;

  return (
    <div className="grid gap-1.5">
      {label && <label htmlFor={textareaId} className="text-sm font-medium text-heading">{label}</label>}
      <textarea
        id={textareaId}
        aria-invalid={Boolean(error)}
        aria-describedby={messageId}
        className={cn(
          "min-h-28 w-full resize-y rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-sidebar",
          error && "border-danger focus:border-danger focus:ring-danger/10",
          className,
        )}
        {...props}
      />
      {(error || hint) && <p id={messageId} className={cn("text-xs", error ? "text-danger" : "text-muted")}>{error ?? hint}</p>}
    </div>
  );
}