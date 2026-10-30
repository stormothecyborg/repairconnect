import type { ReactNode } from "react";
import { RoleLayout } from "@/components/layout/RoleLayout";

export default function EmployerLayout({ children }: { children: ReactNode }) {
  return <RoleLayout role="employer">{children}</RoleLayout>;
}