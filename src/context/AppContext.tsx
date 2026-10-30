"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { applications as initialApplications } from "@/data/applications";
import { jobs as initialJobs } from "@/data/jobs";
import type { Application, ApplicationStatus, Job } from "@/types";

export type NewJobInput = Omit<Job, "id" | "postedAt" | "status">;

interface AppContextValue {
  jobs: Job[];
  applications: Application[];
  currentEmployerId: string;
  currentTechnicianId: string;
  postJob: (job: NewJobInput) => Job;
  applyToJob: (jobId: string, coverNote?: string) => Application | null;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState(initialApplications);
  const currentEmployerId = "e1";
  const currentTechnicianId = "t1";

  function postJob(input: NewJobInput): Job {
    const job: Job = {
      ...input,
      id: `j-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      postedAt: new Date().toISOString(),
      status: "Open",
    };
    setJobs((currentJobs) => [job, ...currentJobs]);
    return job;
  }

  function applyToJob(jobId: string, coverNote = ""): Application | null {
    if (!jobs.some((job) => job.id === jobId)) return null;

    const existingApplication = applications.find(
      (application) =>
        application.jobId === jobId && application.technicianId === currentTechnicianId,
    );
    if (existingApplication) return existingApplication;

    const application: Application = {
      id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      jobId,
      technicianId: currentTechnicianId,
      status: "Pending",
      appliedAt: new Date().toISOString(),
      coverNote,
    };
    setApplications((currentApplications) => [application, ...currentApplications]);
    return application;
  }

  function updateApplicationStatus(applicationId: string, status: ApplicationStatus): void {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === applicationId ? { ...application, status } : application,
      ),
    );
  }

  return (
    <AppContext.Provider
      value={{
        jobs,
        applications,
        currentEmployerId,
        currentTechnicianId,
        postJob,
        applyToJob,
        updateApplicationStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
}