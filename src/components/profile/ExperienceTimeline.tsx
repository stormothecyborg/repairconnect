import { BriefcaseBusiness } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Technician } from "@/types";

export function ExperienceTimeline({ experience }: { experience: Technician["experience"] }) {
  if (experience.length === 0) {
    return <Card className="p-5"><p className="text-sm text-muted">No experience details have been added.</p></Card>;
  }

  return (
    <ol className="space-y-3">
      {experience.map((item, index) => (
        <li key={`${item.shop}-${item.period}`}>
          <Card className="relative p-4 sm:p-5">
            {index < experience.length - 1 && <span className="absolute bottom-[-13px] left-[29px] top-[calc(100%-1px)] w-px bg-border" aria-hidden="true" />}
            <div className="flex gap-3.5">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-wash text-primary"><BriefcaseBusiness className="size-4" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div><h3 className="text-sm font-semibold text-heading">{item.role}</h3><p className="mt-0.5 text-sm text-body">{item.shop}</p></div>
                  <span className="text-xs font-medium text-muted">{item.period}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ol>
  );
}