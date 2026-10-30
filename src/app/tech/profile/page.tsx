"use client";

import Link from "next/link";
import { BriefcaseBusiness, FolderKanban, MessageSquareQuote, UserRound } from "lucide-react";
import { ExperienceTimeline } from "@/components/profile/ExperienceTimeline";
import { PortfolioGrid } from "@/components/profile/PortfolioGrid";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ReviewList } from "@/components/profile/ReviewList";
import { JobCard } from "@/components/jobs/JobCard";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAppContext } from "@/context/AppContext";
import { technicians } from "@/data/technicians";

export default function TechnicianProfilePage() {
  const { jobs, applications, currentTechnicianId } = useAppContext();
  const technician = technicians.find((item) => item.id === currentTechnicianId);
  const myApplications = applications
    .filter((application) => application.technicianId === currentTechnicianId)
    .sort((left, right) => right.appliedAt.localeCompare(left.appliedAt));

  if (!technician) {
    return <Card><EmptyState title="Profile unavailable" description="The current technician profile could not be found." icon={<UserRound className="size-5" />} /></Card>;
  }

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Technician workspace" title="My profile" description="Your repair experience, work samples, and job applications." />
      <ProfileHeader technician={technician} />

      <section aria-labelledby="applications-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div><h2 id="applications-heading" className="text-lg font-semibold text-heading">Applied jobs</h2><p className="mt-1 text-sm text-muted">Applications you have submitted and their current status.</p></div>
          <Badge>{myApplications.length} {myApplications.length === 1 ? "application" : "applications"}</Badge>
        </div>
        {myApplications.length === 0 ? (
          <Card><EmptyState title="No applications yet" description="Explore open jobs and apply when you find a good fit." action={<Link href="/tech/dashboard" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white hover:bg-primary-hover">Find jobs</Link>} /></Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {myApplications.map((application) => {
              const job = jobs.find((item) => item.id === application.jobId);
              if (!job) return null;
              return (
                <div key={application.id} className="relative">
                  <JobCard job={job} applied applicationStatus={application.status} />
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="grid gap-7 xl:grid-cols-2">
        <section aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="mb-3 flex items-center gap-2 text-lg font-semibold text-heading"><BriefcaseBusiness className="size-5 text-primary" />Experience</h2>
          <ExperienceTimeline experience={technician.experience} />
        </section>
        <section aria-labelledby="portfolio-heading">
          <h2 id="portfolio-heading" className="mb-3 flex items-center gap-2 text-lg font-semibold text-heading"><FolderKanban className="size-5 text-primary" />Repair portfolio</h2>
          <PortfolioGrid portfolio={technician.portfolio} />
        </section>
      </div>

      <section aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="mb-3 flex items-center gap-2 text-lg font-semibold text-heading"><MessageSquareQuote className="size-5 text-primary" />Reviews</h2>
        <ReviewList reviews={technician.reviews} />
      </section>
    </div>
  );
}