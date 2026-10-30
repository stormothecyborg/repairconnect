import { Suspense, type ReactNode } from "react";
import { Sidebar, type UserRole } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export function RoleLayout({ role, children }: { role: UserRole; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="fixed inset-y-0 left-0 hidden w-72 border-r border-border bg-sidebar lg:block" aria-hidden="true" />}>
        <Sidebar role={role} />
      </Suspense>
      <div className="min-h-screen lg:pl-72">
        <Topbar role={role} />
        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}