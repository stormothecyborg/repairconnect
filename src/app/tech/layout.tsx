import type { ReactNode } from "react";
import { RoleLayout } from "@/components/layout/RoleLayout";

export default function TechnicianLayout({ children }: { children: ReactNode }) {
  return <RoleLayout role="technician">{children}</RoleLayout>;
}