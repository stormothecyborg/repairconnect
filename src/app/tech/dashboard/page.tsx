"use client";

import { useMemo, useState } from "react";
import { BriefcaseBusiness, Search, SlidersHorizontal, X } from "lucide-react";
import { JobCard } from "@/components/jobs/JobCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { useAppContext } from "@/context/AppContext";
import type { DeviceType } from "@/types";

const deviceTypes: DeviceType[] = ["Mobile", "Android", "iPhone", "Laptop", "MacBook"];
const cities = ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai"];

export default function TechnicianDashboardPage() {
  const { jobs, applications, currentTechnicianId } = useAppContext();
  const [query, setQuery] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [city, setCity] = useState("");
  const [minPay, setMinPay] = useState("");
  const [maxPay, setMaxPay] = useState("");

  const availableJobs = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    const minimum = minPay === "" ? null : Number(minPay);
    const maximum = maxPay === "" ? null : Number(maxPay);

    return jobs.filter((job) => {
      if (job.status !== "Open") return false;
      const matchesSearch = !searchTerm || [job.title, job.issue, job.brandModel].some((value) => value.toLowerCase().includes(searchTerm));
      const matchesDevice = !deviceType || job.deviceType === deviceType;
      const matchesCity = !city || job.city === city;
      const matchesMinimum = minimum === null || job.payAmount >= minimum;
      const matchesMaximum = maximum === null || job.payAmount <= maximum;
      return matchesSearch && matchesDevice && matchesCity && matchesMinimum && matchesMaximum;
    });
  }, [jobs, query, deviceType, city, minPay, maxPay]);

  const appliedJobIds = new Set(
    applications
      .filter((application) => application.technicianId === currentTechnicianId)
      .map((application) => application.jobId),
  );
  const filtersActive = Boolean(query || deviceType || city || minPay || maxPay);

  function clearFilters() {
    setQuery("");
    setDeviceType("");
    setCity("");
    setMinPay("");
    setMaxPay("");
  }

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Technician workspace"
        title="Find repair jobs"
        description="Explore open repair work from shops across India."
      />

      <Card className="p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-heading"><SlidersHorizontal className="size-4 text-primary" />Search and filters</div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div className="sm:col-span-2 xl:col-span-1">
            <label htmlFor="job-search" className="mb-1.5 block text-sm font-medium text-heading">Search jobs</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <Input
                id="job-search"
                name="search"
                placeholder="Title, issue, model"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Select label="Device type" name="deviceType" value={deviceType} onChange={(event) => setDeviceType(event.target.value)}>
            <option value="">All devices</option>
            {deviceTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </Select>
          <Select label="City" name="city" value={city} onChange={(event) => setCity(event.target.value)}>
            <option value="">All cities</option>
            {cities.map((item) => <option key={item} value={item}>{item}</option>)}
          </Select>
          <Input label="Minimum pay (₹)" name="minPay" type="number" min="0" inputMode="numeric" placeholder="Any" value={minPay} onChange={(event) => setMinPay(event.target.value)} />
          <Input label="Maximum pay (₹)" name="maxPay" type="number" min="0" inputMode="numeric" placeholder="Any" value={maxPay} onChange={(event) => setMaxPay(event.target.value)} />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm text-muted" aria-live="polite"><span className="font-semibold text-heading">{availableJobs.length}</span> {availableJobs.length === 1 ? "job" : "jobs"} found</p>
          {filtersActive && <Button variant="ghost" size="sm" onClick={clearFilters}><X className="size-4" />Clear filters</Button>}
        </div>
      </Card>

      {availableJobs.length === 0 ? (
        <Card>
          <EmptyState
            title="No matching jobs"
            description="Try a broader search or clear some filters to see more repair work."
            icon={<BriefcaseBusiness className="size-5" />}
            action={filtersActive ? <Button variant="secondary" onClick={clearFilters}>Clear filters</Button> : undefined}
          />
        </Card>
      ) : (
        <section aria-label="Open repair jobs">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-base font-semibold text-heading">Available jobs</h2>
            <Badge>{availableJobs.length}</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {availableJobs.map((job) => <JobCard key={job.id} job={job} applied={appliedJobIds.has(job.id)} />)}
          </div>
        </section>
      )}
    </div>
  );
}