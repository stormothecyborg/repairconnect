import { Suspense, type ReactNode } from "react";

export default function TechnicianJobLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<p role="status" className="p-6 text-sm text-muted">Loading job...</p>}>
      {children}
    </Suspense>
  );
}