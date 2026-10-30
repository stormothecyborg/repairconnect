"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock3, MapPin, UsersRound } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { RatingStars } from "@/components/ui/RatingStars";
import { useAppContext } from "@/context/AppContext";
import { employers } from "@/data/employers";
import { technicians } from "@/data/technicians";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { ApplicationStatus, JobStatus } from "@/types";

const jobStatusVariant: Record<JobStatus, "success" | "warning" | "default"> = {
  Open: "success",
  "In Progress": "warning",
  Closed: "default",
};

const applicationStatusVariant: Record<ApplicationStatus, "default" | "teal" | "danger" | "success"> = {
  Pending: "default",
  Shortlisted: "teal",
  Rejected: "danger",
  Accepted: "success",
};

export default function EmployerJobDetailPage() {
  const params = useParams<{ id: string }>();
  const { jobs, applications, currentEmployerId, updateApplicationStatus } = useAppContext();
  const job = jobs.find((item) => item.id === params.id && item.employerId === currentEmployerId);

  if (!job) {
    return (
      <Card><EmptyState title="Job not found" description="This job may have been removed or belongs to another shop." action={<Link href="/employer/dashboard" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover">Back to dashboard</Link>} /></Card>
    );
  }

  const employer = employers.find((item) => item.id === job.employerId);
  const jobApplications = applications.filter((application) => application.jobId === job.id);

  return (
    <div className="space-y-6">
      <Link href="/employer/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary"><ArrowLeft className="size-4" />Back to dashboard</Link>
      <PageHeader eyebrow={employer?.shopName} title={job.title} description={`${job.deviceType} · ${job.brandModel}`} action={<Badge variant={jobStatusVariant[job.status]}>{job.status}</Badge>} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
        <div className="space-y-6">
          <Card className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-heading">Job summary</h2>
            <p className="mt-3 text-sm leading-6 text-body">{job.description}</p>
            <dl className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
              <div><dt className="text-xs font-medium text-muted">Issue</dt><dd className="mt-1 text-sm font-medium text-heading">{job.issue}</dd></div>
              <div><dt className="text-xs font-medium text-muted">Device</dt><dd className="mt-1 text-sm font-medium text-heading">{job.brandModel}</dd></div>
              <div><dt className="text-xs font-medium text-muted">Location</dt><dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-heading"><MapPin className="size-4 text-muted" />{job.location}, {job.city}</dd></div>
              <div><dt className="text-xs font-medium text-muted">Pay</dt><dd className="mt-1 text-sm font-semibold text-heading">{formatCurrency(job.payAmount)} <span className="font-normal text-muted">/ {job.payType.toLowerCase()}</span></dd></div>
              <div><dt className="text-xs font-medium text-muted">Urgency</dt><dd className="mt-1"><Badge variant={job.urgency === "Urgent" ? "warning" : "default"}>{job.urgency}</Badge></dd></div>
              <div><dt className="text-xs font-medium text-muted">Posted</dt><dd className="mt-1 inline-flex items-center gap-1.5 text-sm text-heading"><Clock3 className="size-4 text-muted" />{formatDate(job.postedAt)}</dd></div>
            </dl>
            <div className="mt-5 border-t border-border pt-5">
              <h3 className="text-xs font-semibold uppercase text-muted">Required skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">{job.skillsRequired.map((skill) => <Badge key={skill} variant="teal">{skill}</Badge>)}</div>
            </div>
          </Card>

          <section aria-labelledby="applicants-heading">
            <div className="mb-3 flex items-center justify-between">
              <h2 id="applicants-heading" className="text-lg font-semibold text-heading">Applicants</h2>
              <Badge>{jobApplications.length}</Badge>
            </div>
            {jobApplications.length === 0 ? (
              <Card><EmptyState title="No applicants yet" description="Technician applications for this job will appear here." icon={<UsersRound className="size-5" />} /></Card>
            ) : (
              <div className="space-y-3">
                {jobApplications.map((application) => {
                  const technician = technicians.find((item) => item.id === application.technicianId);
                  if (!technician) return null;
                  return (
                    <Card key={application.id} className="p-4 sm:p-5">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                          <Avatar initials={technician.avatarInitials} label={technician.name} />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-semibold text-heading">{technician.name}</h3>
                              <Badge variant={applicationStatusVariant[application.status]}>{application.status}</Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted">{technician.headline}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                              <RatingStars rating={technician.rating} showValue />
                              <span>{technician.experienceYears} years experience</span>
                              <span>Applied {formatDate(application.appliedAt)}</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1.5">{technician.skills.slice(0, 4).map((skill) => <Badge key={skill}>{skill}</Badge>)}</div>
                          </div>
                        </div>
                        {application.coverNote && <p className="rounded-lg bg-surface-hover px-3.5 py-3 text-sm leading-6 text-body">“{application.coverNote}”</p>}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                          <Link href={`/employer/applicant/${technician.id}?jobId=${job.id}`} className="text-sm font-semibold text-primary hover:text-primary-hover">View profile</Link>
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary" disabled={application.status === "Shortlisted"} onClick={() => updateApplicationStatus(application.id, "Shortlisted")}>Shortlist</Button>
                            <Button size="sm" variant="danger" disabled={application.status === "Rejected"} onClick={() => updateApplicationStatus(application.id, "Rejected")}>Reject</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-heading">Posted by</h2>
            <div className="mt-4 flex items-center gap-3">
              <Avatar initials={employer?.logoInitials ?? "RC"} size="lg" label={employer?.shopName ?? "Repair shop"} />
              <div><p className="text-sm font-semibold text-heading">{employer?.shopName}</p><p className="mt-0.5 text-sm text-muted">{employer?.city}</p></div>
            </div>
            {employer && <div className="mt-4 border-t border-border pt-4"><RatingStars rating={employer.rating} showValue /></div>}
          </Card>
        </aside>
      </div>
    </div>
  );
}