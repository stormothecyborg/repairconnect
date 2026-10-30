"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, HardHat } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Role = "employer" | "technician";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("employer");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(role === "employer" ? "/employer/dashboard" : "/tech/dashboard");
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold text-primary">Welcome back</p>
      <h2 className="mt-1 text-2xl font-semibold text-heading">Sign in to your account</h2>
      <p className="mt-2 text-sm leading-6 text-muted">Choose your workspace, then enter any email and password to continue.</p>

      <div className="mt-6 grid grid-cols-2 rounded-lg bg-sidebar p-1" role="group" aria-label="Choose your account type">
        {(["employer", "technician"] as const).map((option) => {
          const Icon = option === "employer" ? BriefcaseBusiness : HardHat;
          const selected = role === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => setRole(option)}
              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-2 text-sm font-medium capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? "bg-surface text-primary shadow-sm" : "text-muted hover:text-heading"}`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {option}
            </button>
          );
        })}
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <Input label="Email address" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        <Input label="Password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required />
        <Button type="submit" size="lg" className="mt-1 w-full">
          Sign in <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New to RepairConnect? <Link href="/signup" className="font-semibold text-primary hover:text-primary-hover">Create an account</Link>
      </p>
    </div>
  );
}