import { MonitorSmartphone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Technician } from "@/types";

export function PortfolioGrid({ portfolio }: { portfolio: Technician["portfolio"] }) {
  if (portfolio.length === 0) {
    return <Card className="p-5"><p className="text-sm text-muted">No portfolio repairs have been added.</p></Card>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {portfolio.map((item) => (
        <Card key={item.id} className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-wash text-primary"><MonitorSmartphone className="size-4" /></span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-heading">{item.title}</h3>
              <Badge className="mt-2" variant="teal">{item.deviceType}</Badge>
              <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}