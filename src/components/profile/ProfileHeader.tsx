import { BriefcaseBusiness, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import type { Technician } from "@/types";

export function ProfileHeader({ technician }: { technician: Technician }) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <Avatar initials={technician.avatarInitials} size="xl" label={technician.name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-heading">{technician.name}</h1>
              <p className="mt-1 text-sm text-body">{technician.headline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" />{technician.city}</span>
                <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness className="size-4" />{technician.experienceYears} years experience</span>
              </div>
            </div>
            <RatingStars rating={technician.rating} showValue size="md" />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-body">{technician.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {technician.skills.map((skill) => <Badge key={skill} variant="teal">{skill}</Badge>)}
          </div>
          <p className="mt-4 text-xs text-muted">{technician.completedJobs} completed jobs · {technician.reviewCount} reviews</p>
        </div>
      </div>
    </Card>
  );
}