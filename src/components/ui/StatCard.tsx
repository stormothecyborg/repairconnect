import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ label, value, detail, icon, className }: StatCardProps) {
  return (
    <Card className={cn("flex items-start justify-between gap-4 p-5", className)}>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted">{label}</p>
        <p className="mt-2 text-2xl font-semibold leading-none text-heading">{value}</p>
        {detail && <p className="mt-2 text-xs text-muted">{detail}</p>}
      </div>
      {icon && <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-tint text-primary">{icon}</span>}
    </Card>
  );
}