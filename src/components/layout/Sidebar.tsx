"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  ClipboardPlus,
  LogOut,
  Search,
  UserRound,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type UserRole = "employer" | "technician";

interface SidebarProps {
  role: UserRole;
  mobileOpen?: boolean;
  mobileDrawerOnly?: boolean;
  onClose?: () => void;
}

interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navigation: Record<UserRole, NavigationItem[]> = {
  employer: [
    { label: "Dashboard", href: "/employer/dashboard", icon: BriefcaseBusiness },
    { label: "Post Job", href: "/employer/post-job", icon: ClipboardPlus },
  ],
  technician: [
    { label: "Find Jobs", href: "/tech/dashboard", icon: Search },
    { label: "My Profile", href: "/tech/profile", icon: UserRound },
  ],
};

const roleDetails: Record<UserRole, { label: string; workspace: string; switchLabel: string; switchHref: string }> = {
  employer: {
    label: "Employer",
    workspace: "Repair shop workspace",
    switchLabel: "Switch to Technician view",
    switchHref: "/tech/dashboard",
  },
  technician: {
    label: "Technician",
    workspace: "Technician workspace",
    switchLabel: "Switch to Employer view",
    switchHref: "/employer/dashboard",
  },
};

export function Sidebar({ role, mobileOpen = false, mobileDrawerOnly = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const details = roleDetails[role];

  return (
    <>
      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}
      <aside
        aria-label={`${details.label} navigation`}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(18rem,calc(100vw-2.5rem))] flex-col border-r border-border bg-white transition-transform duration-200 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          mobileDrawerOnly && "lg:hidden",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary text-white">
              <Wrench className="size-[18px]" aria-hidden="true" />
            </span>
            <span className="text-[15px] font-semibold text-heading">RepairConnect</span>
          </Link>
          <button
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted hover:bg-slate-100 lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-5 pb-3 pt-5">
          <p className="text-xs font-medium text-muted">{details.workspace}</p>
        </div>
        <nav className="flex-1 space-y-1 px-3" aria-label="Main navigation">
          {navigation[role].map(({ label, href, icon: Icon }) => {
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`) ||
              (role === "employer" && label === "Dashboard" && pathname.startsWith("/employer/") && pathname !== "/employer/post-job") ||
              (role === "technician" && label === "Find Jobs" && pathname.startsWith("/tech/job/"));
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                  active ? "bg-primary-wash text-primary" : "text-body hover:bg-slate-50 hover:text-heading",
                )}
              >
                <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-border p-3">
          <Link
            href={details.switchHref}
            onClick={onClose}
            className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-body transition-colors hover:bg-slate-50 hover:text-heading"
          >
            <UserRound className="size-[18px] shrink-0" aria-hidden="true" />
            {details.switchLabel}
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-body transition-colors hover:bg-slate-50 hover:text-heading"
          >
            <LogOut className="size-[18px] shrink-0" aria-hidden="true" />
            Log out
          </Link>
        </div>
      </aside>
    </>
  );
}