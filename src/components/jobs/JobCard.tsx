import Link from "next/link";
import { AlertCircle, ArrowUpRight, MapPin, Store } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { RatingStars } from "@/components/ui/RatingStars";
import { employers } from "@/data/employers";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { ApplicationStatus, Job } from "@/types";

interface JobCardProps {
  job: Job;
  applied?: boolean;
  applicationStatus?: ApplicationStatus;
}

const applicationVariant: Record<ApplicationStatus, "default" | "teal" | "danger" | "success"> = {
  Pending: "default",
  Shortlisted: "teal",
  Rejected: "danger",
  Accepted: "success",
};

export function JobCard({ job, applied = false, applicationStatus }: JobCardProps) {
  const employer = employers.find((item) => item.id === job.employerId);

  return (
    <Card className="group relative flex h-full flex-col p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <Badge variant="teal">{job.deviceType}</Badge>
        <div className="flex flex-wrap justify-end gap-2">
          {job.urgency === "Urgent" && <Badge variant="warning"><AlertCircle className="mr-1 size-3.5" />Urgent</Badge>}
          {applied && (applicationStatus ? <Badge variant={applicationVariant[applicationStatus]}>{applicationStatus}</Badge> : <Badge variant="success">Applied</Badge>)}
        </div>
      </div>

      <h2 className="mt-4 text-base font-semibold leading-6 text-heading">
        <Link href={`/tech/job/${job.id}`} className="outline-none after:absolute after:inset-0 focus-visible:rounded-lg focus-visible:ring-4 focus-visible:ring-primary/20">
          {job.title}
        </Link>
      </h2>
      <p className="mt-1 text-sm text-muted">{job.brandModel}</p>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-body">{job.issue}</p>
      <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Required skills">
        {job.skillsRequired.map((skill) => <Badge key={skill}>{skill}</Badge>)}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5"><Store className="size-3.5" />{employer?.shopName ?? "Repair shop"}</span>
        {employer && <RatingStars rating={employer.rating} showValue />}
        <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" />{job.location}, {job.city}</span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <div>
          <p className="text-lg font-semibold leading-none text-heading">{formatCurrency(job.payAmount)}<span className="ml-1 text-xs font-normal text-muted">/ {job.payType.toLowerCase()}</span></p>
          <p className="mt-2 text-xs text-muted">Posted {formatDate(job.postedAt)}</p>
        </div>
        <span aria-hidden="true" className="inline-flex size-9 items-center justify-center rounded-lg bg-primary-wash text-primary transition-colors group-hover:bg-primary group-hover:text-white"><ArrowUpRight className="size-4" /></span>
      </div>
    </Card>
  );
}