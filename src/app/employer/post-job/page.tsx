"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, Check, Plus, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Toast } from "@/components/ui/Toast";
import { useAppContext } from "@/context/AppContext";
import type { DeviceType } from "@/types";

const cities = ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai"];
const devices: DeviceType[] = ["Mobile", "Android", "iPhone", "Laptop", "MacBook"];
const commonIssues = [
  "Cracked screen",
  "Battery swelling",
  "Water damage",
  "Motherboard no-power",
  "Charging port failure",
  "Keyboard replacement",
  "Liquid damage",
  "Display hinge damage",
  "Other",
];
const skillOptions = [
  "Android repair",
  "iPhone repair",
  "Laptop repair",
  "MacBook repair",
  "Screen replacement",
  "Battery replacement",
  "Board diagnostics",
  "Microsoldering",
  "Liquid damage",
  "Charging port repair",
  "Keyboard replacement",
  "Device testing",
];

interface JobFormValues {
  title: string;
  deviceType: DeviceType | "";
  brandModel: string;
  issue: string;
  otherIssue: string;
  description: string;
  payAmount: string;
  payType: "Fixed" | "Hourly";
  location: string;
  city: string;
  urgency: "Normal" | "Urgent";
}

type JobFormErrors = Partial<Record<keyof JobFormValues | "skillsRequired", string>>;

const initialValues: JobFormValues = {
  title: "",
  deviceType: "",
  brandModel: "",
  issue: "",
  otherIssue: "",
  description: "",
  payAmount: "",
  payType: "Fixed",
  location: "",
  city: "",
  urgency: "Normal",
};

export default function PostJobPage() {
  const router = useRouter();
  const { postJob, currentEmployerId } = useAppContext();
  const [values, setValues] = useState(initialValues);
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [customSkillDraft, setCustomSkillDraft] = useState("");
  const [skillMessage, setSkillMessage] = useState("");
  const [errors, setErrors] = useState<JobFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof JobFormValues>(key: K, value: JobFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function toggleSkill(skill: string) {
    setSkillsRequired((current) => {
      if (current.includes(skill)) return current.filter((item) => item !== skill);
      if (current.length >= 10) {
        setSkillMessage("You can select up to 10 skills.");
        return current;
      }
      setSkillMessage("");
      return [...current, skill];
    });
    setErrors((current) => ({ ...current, skillsRequired: undefined }));
  }

  function addCustomSkill() {
    const skill = customSkillDraft.trim();
    if (!skill) return;
    const normalizedSkill = skill.toLocaleLowerCase();
    const isPreset = skillOptions.some((preset) => preset.toLocaleLowerCase() === normalizedSkill);
    const isSelected = skillsRequired.some((selected) => selected.toLocaleLowerCase() === normalizedSkill);
    if (isPreset || isSelected) {
      setSkillMessage("That skill is already available or selected.");
      return;
    }
    if (skillsRequired.length >= 10) {
      setSkillMessage("You can select up to 10 skills.");
      return;
    }

    setSkillsRequired((current) => [...current, skill]);
    setCustomSkills((current) => [...current, skill]);
    setCustomSkillDraft("");
    setSkillMessage("");
    setErrors((current) => ({ ...current, skillsRequired: undefined }));
  }

  function removeCustomSkill(skill: string) {
    setSkillsRequired((current) => current.filter((selected) => selected !== skill));
    setCustomSkills((current) => current.filter((customSkill) => customSkill !== skill));
    setSkillMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: JobFormErrors = {};
    if (!values.title.trim()) nextErrors.title = "Enter a job title.";
    if (!values.deviceType) nextErrors.deviceType = "Choose a device type.";
    if (!values.brandModel.trim()) nextErrors.brandModel = "Enter the brand and model.";
    if (!values.issue) nextErrors.issue = "Choose an issue type.";
    if (values.issue === "Other" && !values.otherIssue.trim()) nextErrors.otherIssue = "Describe the issue.";
    if (!values.description.trim()) nextErrors.description = "Add a short description of the repair.";
    const payAmount = Number(values.payAmount);
    if (!values.payAmount || !Number.isFinite(payAmount) || payAmount <= 0) nextErrors.payAmount = "Enter a pay amount greater than ₹0.";
    if (!values.location.trim()) nextErrors.location = "Enter the area or neighbourhood.";
    if (!values.city) nextErrors.city = "Choose a city.";
    if (skillsRequired.length === 0) nextErrors.skillsRequired = "Select at least one required skill.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    postJob({
      employerId: currentEmployerId,
      title: values.title.trim(),
      deviceType: values.deviceType as DeviceType,
      brandModel: values.brandModel.trim(),
      issue: values.issue === "Other" ? values.otherIssue.trim() : values.issue,
      description: values.description.trim(),
      payAmount,
      payType: values.payType,
      location: values.location.trim(),
      city: values.city,
      urgency: values.urgency,
      skillsRequired,
    });
    setSubmitted(true);
    window.setTimeout(() => router.push("/employer/dashboard"), 900);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link href="/employer/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary">
        <ArrowLeft className="size-4" aria-hidden="true" />Back to dashboard
      </Link>
      <PageHeader eyebrow="Employer workspace" title="Post a new job" description="Share the repair details and find the right technician for the work." />

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Card className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
            <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary-tint text-primary"><BriefcaseBusiness className="size-[18px]" /></span>
            <div><h2 className="text-base font-semibold text-heading">Job details</h2><p className="text-sm text-muted">Describe the device and repair needed.</p></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Job title" name="title" placeholder="e.g. iPhone 13 screen replacement" value={values.title} onChange={(event) => update("title", event.target.value)} error={errors.title} />
            <Select label="Device type" name="deviceType" value={values.deviceType} onChange={(event) => update("deviceType", event.target.value as DeviceType | "")} error={errors.deviceType}>
              <option value="">Select device type</option>
              {devices.map((device) => <option key={device} value={device}>{device}</option>)}
            </Select>
            <Input label="Brand / model" name="brandModel" placeholder="e.g. Apple iPhone 13" value={values.brandModel} onChange={(event) => update("brandModel", event.target.value)} error={errors.brandModel} />
            <Select label="Issue" name="issue" value={values.issue} onChange={(event) => update("issue", event.target.value)} error={errors.issue}>
              <option value="">Select the repair issue</option>
              {commonIssues.map((issue) => <option key={issue} value={issue}>{issue}</option>)}
            </Select>
            {values.issue === "Other" && (
              <Input label="Describe the issue" name="otherIssue" placeholder="Describe the repair issue" value={values.otherIssue} onChange={(event) => update("otherIssue", event.target.value)} error={errors.otherIssue} />
            )}
            <div className="sm:col-span-2">
              <Textarea label="Description" name="description" placeholder="Include symptoms, known history, and any testing expected..." value={values.description} onChange={(event) => update("description", event.target.value)} error={errors.description} />
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="mb-5 border-b border-border pb-4">
            <h2 className="text-base font-semibold text-heading">Pay and location</h2>
            <p className="mt-1 text-sm text-muted">Set a clear budget and where the repair will take place.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Pay amount (INR)" name="payAmount" type="number" min="1" inputMode="numeric" placeholder="e.g. 2500" value={values.payAmount} onChange={(event) => update("payAmount", event.target.value)} error={errors.payAmount} />
            <Select label="Pay type" name="payType" value={values.payType} onChange={(event) => update("payType", event.target.value as "Fixed" | "Hourly")}>
              <option value="Fixed">Fixed price</option>
              <option value="Hourly">Hourly rate</option>
            </Select>
            <Input label="Area / neighbourhood" name="location" placeholder="e.g. Indiranagar" value={values.location} onChange={(event) => update("location", event.target.value)} error={errors.location} />
            <Select label="City" name="city" value={values.city} onChange={(event) => update("city", event.target.value)} error={errors.city}>
              <option value="">Select city</option>
              {cities.map((city) => <option key={city} value={city}>{city}</option>)}
            </Select>
            <Select label="Urgency" name="urgency" value={values.urgency} onChange={(event) => update("urgency", event.target.value as "Normal" | "Urgent")}>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
            </Select>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <fieldset>
            <legend className="text-base font-semibold text-heading">Required skills</legend>
            <p className="mt-1 text-sm text-muted">Choose the skills a technician needs for this repair.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skillOptions.map((skill) => {
                const selected = skillsRequired.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleSkill(skill)}
                    className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? "border-primary bg-primary-wash text-primary" : "border-border bg-surface text-body hover:bg-surface-hover"}`}
                  >
                    {selected ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
                    {skill}
                  </button>
                );
              })}
              {customSkills.map((skill) => (
                <span key={skill} className="inline-flex min-h-9 items-center gap-1 rounded-full border border-primary bg-primary-wash py-1 pl-3 pr-1 text-sm font-medium text-primary">
                  {skill}
                  <button
                    type="button"
                    aria-label={`Remove ${skill}`}
                    onClick={() => removeCustomSkill(skill)}
                    className="inline-flex size-7 items-center justify-center rounded-full text-primary hover:bg-primary-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end">
              <Input
                label="Add a custom skill"
                name="customSkill"
                placeholder="Add another skill, e.g. FaceID repair"
                value={customSkillDraft}
                onChange={(event) => {
                  setCustomSkillDraft(event.target.value);
                  setSkillMessage("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addCustomSkill();
                  }
                }}
                disabled={skillsRequired.length >= 10}
                className="sm:max-w-sm"
              />
              <Button type="button" variant="secondary" onClick={addCustomSkill} disabled={skillsRequired.length >= 10}>
                <Plus className="size-4" aria-hidden="true" />Add
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted" aria-live="polite">
              {skillsRequired.length >= 10 ? "Maximum of 10 skills selected." : `${skillsRequired.length} of 10 skills selected.`}
              {skillMessage && ` ${skillMessage}`}
            </p>
            {errors.skillsRequired && <p className="mt-2 text-xs text-danger" role="alert">{errors.skillsRequired}</p>}
          </fieldset>
        </Card>

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link href="/employer/dashboard" className="inline-flex min-h-10 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-body transition-colors hover:bg-surface-hover">Cancel</Link>
          <Button type="submit" size="lg">Post job</Button>
        </div>
      </form>
      <Toast open={submitted} title="Job posted" description="Your new job is now on the employer dashboard." />
    </div>
  );
}