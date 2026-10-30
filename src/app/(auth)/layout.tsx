import type { ReactNode } from "react";
import { ArrowUpRight, BadgeCheck, Wrench } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[minmax(19rem,0.9fr)_minmax(34rem,1.1fr)]">
      <section className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-primary px-6 py-7 text-white sm:px-10 sm:py-9 lg:min-h-screen lg:px-12 lg:py-11 xl:px-16">
        <div className="pointer-events-none absolute -right-20 top-1/4 size-72 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-7 top-[30%] size-48 rounded-full border border-white/10" />
        <div className="relative z-10 flex items-center gap-2.5">
          <span className="inline-flex size-10 items-center justify-center rounded-lg bg-white/15">
            <Wrench className="size-5" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold">RepairConnect</span>
        </div>

        <div className="relative z-10 max-w-xl py-9 lg:py-16">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase text-teal-100">
            <BadgeCheck className="size-4" aria-hidden="true" />
            Built for repair professionals
          </p>
          <h1 className="max-w-lg text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            Good repairs start with the right connection.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-teal-50 sm:text-base">
            A practical place for trusted repair shops and skilled technicians to find their next great fit.
          </p>
        </div>

        <div className="relative z-10 hidden items-center justify-between border-t border-white/20 pt-5 text-sm text-teal-50 lg:flex">
          <span>Mobile, laptop and MacBook repair</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </div>
      </section>

      <section className="flex min-w-0 items-center justify-center bg-background px-4 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}