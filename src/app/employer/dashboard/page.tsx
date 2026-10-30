"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Plus,
  UsersRound,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { useAppContext } from "@/context/AppContext";
import { employers } from "@/data/employers";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { JobStatus } from "@/types";

const statusVariant: Record<JobStatus, "success" | "warning" | "default"> = {
  Open: "success",
  "In Progress": "warning",
  Closed: "default",
};

export default function EmployerDashboardPage() {
  const { jobs, applications, currentEmployerId } = useAppContext();
  const employerJobs = jobs.filter((job) => job.employerId === currentEmployerId);
  const employerJobIds = new Set(employerJobs.map((job) => job.id));
  const employerApplications = applications.filter((application) => employerJobIds.has(application.jobId));
  const activeJobs = employerJobs.filter((job) => job.status !== "Closed").length;
  const closedJobs = employerJobs.filter((job) => job.status === "Closed").length;
  const shop = employers.find((employer) => employer.id === currentEmployerId);

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow={shop?.shopName}
        title="Dashboard"
        description="Track your repair jobs and meet technicians ready to help."
        action={(
          <Link href="/employer/post-job" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30">
            <Plus className="size-4" aria-hidden="true" />Post New Job
          </Link>
        )}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Job statistics">
        <StatCard label="Active jobs" value={activeJobs} detail="Open or in progress" icon={<BriefcaseBusiness className="size-5" />} />
        <StatCard label="Total applicants" value={employerApplications.length} detail="Across your posted jobs" icon={<UsersRound className="size-5" />} />
        <StatCard label="Jobs closed" value={closedJobs} detail="Completed or no longer active" icon={<CheckCircle2 className="size-5" />} />
      </section>

      <section aria-labelledby="posted-jobs-heading">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 id="posted-jobs-heading" className="text-lg font-semibold text-heading">Your jobs</h2>
            <p className="mt-1 text-sm text-muted">{employerJobs.length} posted {employerJobs.length === 1 ? "job" : "jobs"}</p>
          </div>
        </div>

        {employerJobs.length === 0 ? (
          <Card>
            <EmptyState
              title="No jobs posted yet"
              description="Post your first repair job to connect with qualified technicians."
              icon={<BriefcaseBusiness className="size-5" />}
              action={<Link href="/employer/post-job" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"><Plus className="size-4" />Post a job</Link>}
            />
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="hidden grid-cols-[minmax(14rem,2fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)_minmax(7rem,0.8fr)_minmax(6rem,0.7fr)_4.5rem] gap-4 border-b border-border bg-surface-hover px-5 py-3 text-xs font-semibold uppercase text-muted lg:grid">
              <span>Job</span><span>Location</span><span>Pay</span><span>Status</span><span>Applicants</span><span />
            </div>
            <div className="divide-y divide-border">
              {employerJobs.map((job) => {
                const applicantCount = applications.filter((application) => application.jobId === job.id).length;
                return (
                  <article key={job.id} className="grid gap-3 px-4 py-4 sm:px-5 lg:grid-cols-[minmax(14rem,2fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)_minmax(7rem,0.8fr)_minmax(6rem,0.7fr)_4.5rem] lg:items-center lg:gap-4">
                    <div className="min-w-0">
                      <Link href={`/employer/job/${job.id}`} className="block truncate text-sm font-semibold text-heading hover:text-primary">{job.title}</Link>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <Badge variant="teal">{job.deviceType}</Badge>
                        <span className="text-xs text-muted">{job.brandModel}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-body">
                      <MapPin className="size-3.5 shrink-0 text-muted" aria-hidden="true" />
                      <span className="truncate">{job.location}, {job.city}</span>
                    </div>
                    <span className="text-sm font-semibold text-heading">{formatCurrency(job.payAmount)}<span className="ml-1 font-normal text-muted">/ {job.payType.toLowerCase()}</span></span>
                    <Badge variant={statusVariant[job.status]}>{job.status}</Badge>
                    <div className="flex items-center gap-1.5 text-sm text-body">
                      <UsersRound className="size-4 text-muted" aria-hidden="true" />
                      {applicantCount}
                      <span className="lg:hidden">applicants</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 lg:justify-end">
                      <span className="inline-flex items-center gap-1 text-xs text-muted lg:hidden"><CalendarDays className="size-3.5" />{formatDate(job.postedAt)}</span>
                      <Link href={`/employer/job/${job.id}`} className="text-sm font-semibold text-primary hover:text-primary-hover">View</Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}