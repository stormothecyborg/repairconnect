import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center px-6 py-12 text-center ${className ?? ""}`}>
      {icon && <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary-tint text-primary">{icon}</div>}
      <h2 className="text-base font-semibold text-heading">{title}</h2>
      <p className="mt-1.5 max-w-sm text-sm leading-6 text-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}