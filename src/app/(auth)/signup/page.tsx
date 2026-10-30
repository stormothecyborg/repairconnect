"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, HardHat } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type Role = "employer" | "technician";

const cities = ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai"];
const skills = ["Mobile repair", "Android repair", "iPhone repair", "Laptop repair", "MacBook repair", "Board-level repair"];

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("employer");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(role === "employer" ? "/employer/dashboard" : "/tech/dashboard");
  }

  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold text-primary">Get started</p>
      <h2 className="mt-1 text-2xl font-semibold text-heading">Create your account</h2>
      <p className="mt-2 text-sm leading-6 text-muted">Join as a repair shop or a repair technician.</p>

      <div className="mt-5 grid grid-cols-2 rounded-lg bg-slate-100 p-1" role="group" aria-label="Choose your account type">
        {(["employer", "technician"] as const).map((option) => {
          const Icon = option === "employer" ? BriefcaseBusiness : HardHat;
          const selected = role === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => setRole(option)}
              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-2 text-sm font-medium capitalize transition ${selected ? "bg-white text-primary shadow-sm" : "text-muted hover:text-heading"}`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {option}
            </button>
          );
        })}
      </div>

      <form className="mt-5 grid gap-3.5" onSubmit={handleSubmit}>
        <Input label="Full name" name="name" autoComplete="name" placeholder="Your name" required />
        <Input label="Email address" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        <Input label="Password" name="password" type="password" autoComplete="new-password" placeholder="Create a password" required />

        {role === "employer" ? (
          <>
            <Input label="Shop name" name="shopName" autoComplete="organization" placeholder="Your repair shop" required />
            <Select label="City" name="city" defaultValue="" required>
              <option value="" disabled>Select your city</option>
              {cities.map((city) => <option key={city} value={city}>{city}</option>)}
            </Select>
          </>
        ) : (
          <>
            <Select label="Primary skill" name="skill" defaultValue="" required>
              <option value="" disabled>Select your main device type</option>
              {skills.map((skill) => <option key={skill} value={skill}>{skill}</option>)}
            </Select>
            <Input label="Years of experience" name="experienceYears" type="number" min="0" max="60" inputMode="numeric" placeholder="e.g. 3" required />
            <Select label="City" name="city" defaultValue="" required>
              <option value="" disabled>Select your city</option>
              {cities.map((city) => <option key={city} value={city}>{city}</option>)}
            </Select>
          </>
        )}

        <Button type="submit" size="lg" className="mt-1 w-full">
          Create account <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Already have an account? <Link href="/login" className="font-semibold text-primary hover:text-primary-hover">Sign in</Link>
      </p>
    </div>
  );
}