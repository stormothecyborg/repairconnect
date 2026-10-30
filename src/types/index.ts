export type DeviceType = "Mobile" | "Android" | "iPhone" | "Laptop" | "MacBook";

export type JobStatus = "Open" | "In Progress" | "Closed";

export type ApplicationStatus = "Pending" | "Shortlisted" | "Rejected" | "Accepted";

export interface Employer {
  id: string;
  shopName: string;
  ownerName: string;
  city: string;
  rating: number;
  logoInitials: string;
}

export interface Job {
  id: string;
  employerId: string;
  title: string;
  deviceType: DeviceType;
  brandModel: string;
  issue: string;
  description: string;
  payAmount: number;
  payType: "Fixed" | "Hourly";
  location: string;
  city: string;
  postedAt: string;
  status: JobStatus;
  urgency: "Normal" | "Urgent";
  skillsRequired: string[];
}

export interface Technician {
  id: string;
  name: string;
  headline: string;
  city: string;
  avatarInitials: string;
  skills: string[];
  experienceYears: number;
  bio: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  experience: {
    role: string;
    shop: string;
    period: string;
    description: string;
  }[];
  portfolio: {
    id: string;
    title: string;
    deviceType: DeviceType;
    description: string;
  }[];
  reviews: {
    id: string;
    shopName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface Application {
  id: string;
  jobId: string;
  technicianId: string;
  status: ApplicationStatus;
  appliedAt: string;
  coverNote: string;
}