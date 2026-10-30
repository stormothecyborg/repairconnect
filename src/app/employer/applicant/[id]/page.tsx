"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, FolderKanban, MessageSquareQuote } from "lucide-react";
import { ExperienceTimeline } from "@/components/profile/ExperienceTimeline";
import { PortfolioGrid } from "@/components/profile/PortfolioGrid";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ReviewList } from "@/components/profile/ReviewList";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAppContext } from "@/context/AppContext";
import { technicians } from "@/data/technicians";
import type { ApplicationStatus } from "@/types";

const applicationStatusVariant: Record<ApplicationStatus, "default" | "teal" | "danger" | "success"> = {
  Pending: "default",
  Shortlisted: "teal",
  Rejected: "danger",
  Accepted: "success",
};

export default function EmployerApplicantPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const requestedJobId = searchParams.get("jobId");
  const { jobs, applications, currentEmployerId, updateApplicationStatus } = useAppContext();
  const employerJobs = jobs.filter((job) => job.employerId === currentEmployerId);
  const employerJobIds = new Set(employerJobs.map((job) => job.id));
  const technician = technicians.find((item) => item.id === params.id);
  const application = applications.find((item) =>
    item.technicianId === params.id &&
    employerJobIds.has(item.jobId) &&
    (!requestedJobId || item.jobId === requestedJobId),
  );
  const job = application ? jobs.find((item) => item.id === application.jobId) : undefined;

  if (!technician || !application || !job) {
    return (
      <Card><EmptyState title="Applicant not found" description="This technician profile is not associated with one of your shop's job applications." action={<Link href="/employer/dashboard" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover">Back to dashboard</Link>} /></Card>
    );
  }

  return (
    <div className="space-y-6">
      <Link href={`/employer/job/${job.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary"><ArrowLeft className="size-4" />Back to job</Link>
      <ProfileHeader technician={technician} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)]">
        <div className="space-y-7">
          <section aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="mb-3 flex items-center gap-2 text-lg font-semibold text-heading"><BriefcaseBusiness className="size-5 text-primary" />Experience</h2>
            <ExperienceTimeline experience={technician.experience} />
          </section>
          <section aria-labelledby="portfolio-heading">
            <h2 id="portfolio-heading" className="mb-3 flex items-center gap-2 text-lg font-semibold text-heading"><FolderKanban className="size-5 text-primary" />Repair portfolio</h2>
            <PortfolioGrid portfolio={technician.portfolio} />
          </section>
          <section aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="mb-3 flex items-center gap-2 text-lg font-semibold text-heading"><MessageSquareQuote className="size-5 text-primary" />Reviews</h2>
            <ReviewList reviews={technician.reviews} />
          </section>
        </div>

        <aside>
          <Card className="p-5 xl:sticky xl:top-24">
            <p className="text-xs font-semibold uppercase text-muted">Application for</p>
            <h2 className="mt-2 text-base font-semibold text-heading">{job.title}</h2>
            <p className="mt-1 text-sm text-muted">{job.brandModel} · {job.city}</p>
            <div className="mt-4"><Badge variant={applicationStatusVariant[application.status]}>{application.status}</Badge></div>
            {application.coverNote && <p className="mt-4 text-sm leading-6 text-body">“{application.coverNote}”</p>}
            <div className="mt-5 grid gap-2 border-t border-border pt-4 sm:grid-cols-2 xl:grid-cols-1">
              <Button variant="secondary" disabled={application.status === "Shortlisted"} onClick={() => updateApplicationStatus(application.id, "Shortlisted")}>Shortlist</Button>
              <Button disabled={application.status === "Accepted"} onClick={() => updateApplicationStatus(application.id, "Accepted")}>Accept applicant</Button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}