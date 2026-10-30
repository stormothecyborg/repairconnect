"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, UserRound } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Sidebar, type UserRole } from "@/components/layout/Sidebar";
import { employers } from "@/data/employers";
import { technicians } from "@/data/technicians";

interface TopbarProps {
  role: UserRole;
}

export function Topbar({ role }: TopbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const user = role === "employer" ? employers[0] : technicians[0];
  const name = role === "employer" ? employers[0].ownerName : technicians[0].name;
  const initials = role === "employer" ? employers[0].logoInitials : technicians[0].avatarInitials;
  const accountHref = role === "employer" ? "/employer/dashboard" : "/tech/profile";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-topbar/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex size-10 items-center justify-center rounded-lg text-body hover:bg-surface-hover lg:hidden"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <span className="text-sm font-medium text-muted">{role === "employer" ? "Employer workspace" : "Technician workspace"}</span>
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2.5 rounded-lg p-1.5 text-left hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10"
            aria-haspopup="menu"
            aria-expanded={userMenuOpen}
            onClick={() => setUserMenuOpen((open) => !open)}
          >
            <Avatar initials={initials} size="sm" label={name} />
            <span className="hidden min-w-0 sm:block">
              <span className="block max-w-40 truncate text-sm font-medium text-heading">{name}</span>
              <span className="block text-xs text-muted">{user.city}</span>
            </span>
            <ChevronDown className="hidden size-4 text-muted sm:block" aria-hidden="true" />
          </button>
          {userMenuOpen && (
            <>
              <button
                className="fixed inset-0 z-30 cursor-default"
                aria-label="Close user menu"
                onClick={() => setUserMenuOpen(false)}
              />
              <div className="absolute right-0 top-full z-40 mt-2 w-52 rounded-xl border border-border bg-surface p-1.5 shadow-lg" role="menu">
                <div className="border-b border-border px-3 py-2">
                  <p className="truncate text-sm font-medium text-heading">{name}</p>
                  <p className="text-xs text-muted">{role === "employer" ? "Employer" : "Technician"}</p>
                </div>
                <Link
                  href={accountHref}
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                  className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-body hover:bg-surface-hover"
                >
                  <UserRound className="size-4" aria-hidden="true" />
                  {role === "employer" ? "Workspace" : "My profile"}
                </Link>
                <Link
                  href="/login"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center rounded-lg px-3 py-2 text-sm text-body hover:bg-surface-hover"
                >
                  Log out
                </Link>
              </div>
            </>
          )}
        </div>
      </header>
      <Suspense fallback={null}>
        <Sidebar role={role} mobileOpen={mobileOpen} mobileDrawerOnly onClose={() => setMobileOpen(false)} />
      </Suspense>
    </>
  );
}