"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, AlertCircle, CalendarDays, Check, Clock3, MapPin, MonitorSmartphone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { RatingStars } from "@/components/ui/RatingStars";
import { Textarea } from "@/components/ui/Textarea";
import { Toast } from "@/components/ui/Toast";
import { useAppContext } from "@/context/AppContext";
import { employers } from "@/data/employers";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function TechnicianJobDetailPage() {
  const params = useParams<{ id: string }>();
  const { jobs, applications, currentTechnicianId, applyToJob } = useAppContext();
  const job = jobs.find((item) => item.id === params.id);
  const existingApplication = applications.find(
    (application) => application.jobId === params.id && application.technicianId === currentTechnicianId,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [applied, setApplied] = useState(Boolean(existingApplication));

  if (!job) {
    return (
      <Card><EmptyState title="Job not found" description="This job is no longer available or the link may be incorrect." action={<Link href="/tech/dashboard" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white hover:bg-primary-hover">Browse jobs</Link>} /></Card>
    );
  }

  const activeJob = job;
  const employer = employers.find((item) => item.id === activeJob.employerId);

  function confirmApplication() {
    const application = applyToJob(activeJob.id, coverNote.trim());
    if (application) {
      setApplied(true);
      setModalOpen(false);
      setCoverNote("");
      setToastOpen(true);
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/tech/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary"><ArrowLeft className="size-4" />Back to jobs</Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap gap-2"><Badge variant="teal">{job.deviceType}</Badge>{job.urgency === "Urgent" && <Badge variant="warning"><AlertCircle className="mr-1 size-3.5" />Urgent</Badge>}</div>
          <h1 className="text-2xl font-semibold text-heading">{job.title}</h1>
          <p className="mt-1 text-sm text-muted">{job.brandModel}</p>
        </div>
        <Button size="lg" disabled={applied || job.status !== "Open"} onClick={() => setModalOpen(true)}>
          {applied ? <><Check className="size-4" />Applied</> : job.status !== "Open" ? "No longer accepting applications" : "Apply to job"}
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(19rem,0.6fr)]">
        <div className="space-y-5">
          <Card className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-heading">About this repair</h2>
            <p className="mt-3 text-sm leading-7 text-body">{job.description}</p>
            <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
              <div><dt className="text-xs font-medium text-muted">Issue</dt><dd className="mt-1 text-sm font-medium text-heading">{job.issue}</dd></div>
              <div><dt className="text-xs font-medium text-muted">Device model</dt><dd className="mt-1 text-sm font-medium text-heading">{job.brandModel}</dd></div>
              <div><dt className="text-xs font-medium text-muted">Location</dt><dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-heading"><MapPin className="size-4 text-muted" />{job.location}, {job.city}</dd></div>
              <div><dt className="text-xs font-medium text-muted">Posted</dt><dd className="mt-1 inline-flex items-center gap-1.5 text-sm text-heading"><CalendarDays className="size-4 text-muted" />{formatDate(job.postedAt)}</dd></div>
              <div><dt className="text-xs font-medium text-muted">Estimated pay</dt><dd className="mt-1 text-lg font-semibold text-heading">{formatCurrency(job.payAmount)}<span className="ml-1 text-xs font-normal text-muted">/ {job.payType.toLowerCase()}</span></dd></div>
              <div><dt className="text-xs font-medium text-muted">Availability</dt><dd className="mt-1"><Badge variant={job.status === "Open" ? "success" : "default"}>{job.status}</Badge></dd></div>
            </dl>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-2"><MonitorSmartphone className="size-5 text-primary" /><h2 className="text-base font-semibold text-heading">Skills for this job</h2></div>
            <div className="mt-4 flex flex-wrap gap-2">{job.skillsRequired.map((skill) => <Badge key={skill} variant="teal">{skill}</Badge>)}</div>
          </Card>
        </div>

        <aside>
          <Card className="p-5 xl:sticky xl:top-24">
            <p className="text-xs font-semibold uppercase text-muted">About the shop</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-tint text-sm font-semibold text-primary">{employer?.logoInitials ?? "RC"}</span>
              <div className="min-w-0"><h2 className="truncate text-sm font-semibold text-heading">{employer?.shopName ?? "Repair shop"}</h2><p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted"><MapPin className="size-3.5" />{employer?.city ?? job.city}</p></div>
            </div>
            {employer && <div className="mt-4 flex items-center gap-2 border-t border-border pt-4"><RatingStars rating={employer.rating} showValue /><span className="text-xs text-muted">Shop rating</span></div>}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
              <div><p className="text-xs text-muted">Work type</p><p className="mt-1 font-medium text-heading">{job.payType}</p></div>
              <div><p className="text-xs text-muted">Posted</p><p className="mt-1 inline-flex items-center gap-1 font-medium text-heading"><Clock3 className="size-3.5 text-muted" />{formatDate(job.postedAt)}</p></div>
            </div>
            <div className="mt-5"><Button className="w-full" size="lg" disabled={applied || job.status !== "Open"} onClick={() => setModalOpen(true)}>{applied ? <><Check className="size-4" />Applied</> : "Apply to job"}</Button></div>
          </Card>
        </aside>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Apply for this job"
        description={`Send an application to ${employer?.shopName ?? "the repair shop"}.`}
        footer={<><Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={confirmApplication}>Confirm application</Button></>}
      >
        <div className="mb-4 rounded-lg bg-slate-50 p-3.5">
          <p className="text-sm font-semibold text-heading">{job.title}</p>
          <p className="mt-1 text-sm text-muted">{job.city} · {formatCurrency(job.payAmount)} / {job.payType.toLowerCase()}</p>
        </div>
        <Textarea label="Cover note (optional)" name="coverNote" placeholder="Briefly share your relevant repair experience..." value={coverNote} onChange={(event) => setCoverNote(event.target.value)} maxLength={500} />
      </Modal>
      <Toast open={toastOpen} title="Application sent" description="You can track this application from your profile." onClose={() => setToastOpen(false)} />
    </div>
  );
}