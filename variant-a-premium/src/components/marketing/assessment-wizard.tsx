"use client";

import { useState } from "react";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Target,
  Activity,
  ClipboardList,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const GOALS = [
  "More energy",
  "Lose weight",
  "Balance hormones",
  "Better sleep",
  "Improve libido",
  "Healthy aging / longevity",
  "Reduce inflammation",
  "Mental clarity",
];

const INTERESTS = [
  "Bioidentical Hormone Therapy (BioTE)",
  "Medical Weight Loss (GLP-1)",
  "Aesthetics",
  "Regenerative & Anti-Aging",
  "Addiction Therapy",
  "Not sure yet — help me decide",
];

const SEX = ["Female", "Male", "Prefer not to say"];
const AGE = ["Under 30", "30–39", "40–49", "50–59", "60+"];
const TIMELINE = ["As soon as possible", "Within a month", "Just exploring"];

type FormState = {
  goals: string[];
  sex: string;
  ageRange: string;
  energy: string;
  interest: string;
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const initialState: FormState = {
  goals: [],
  sex: "",
  ageRange: "",
  energy: "",
  interest: "",
  timeline: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const steps = [
  { id: "goals", title: "Your goals", icon: Target },
  { id: "health", title: "Health basics", icon: Activity },
  { id: "interest", title: "Service interest", icon: ClipboardList },
  { id: "contact", title: "Contact details", icon: User },
  { id: "review", title: "Review & submit", icon: Check },
];

type Status = "idle" | "submitting" | "success" | "error";

export function AssessmentWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [reference, setReference] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleGoal = (g: string) =>
    setData((d) => ({
      ...d,
      goals: d.goals.includes(g) ? d.goals.filter((x) => x !== g) : [...d.goals, g],
    }));

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

  const canAdvance = (() => {
    switch (step) {
      case 0:
        return data.goals.length > 0;
      case 1:
        return Boolean(data.sex && data.ageRange && data.energy);
      case 2:
        return Boolean(data.interest);
      case 3:
        return Boolean(data.firstName && data.lastName && emailValid);
      default:
        return true;
    }
  })();

  const progress = ((step + 1) / steps.length) * 100;

  async function submit() {
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "assessment" }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setReference(json.reference ?? "");
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again or call us at (256) 434-9301.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-10 text-center shadow-[var(--shadow-md)]"
      >
        <CheckCircle2 className="mx-auto size-14 text-[var(--success)]" aria-hidden="true" />
        <h2 className="mt-5 font-display text-3xl font-semibold text-[var(--foreground)]">
          Your assessment is in
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[var(--muted-foreground)]">
          Thank you, {data.firstName}. Dr. Adams&apos; team will review your responses and reach out
          within one business day to schedule your consultation.
        </p>
        {reference ? (
          <p className="mt-4 inline-block rounded-full bg-[var(--cream-100)] px-4 py-1.5 text-sm font-medium text-[var(--foreground)]">
            Reference: <span className="tabular-nums">{reference}</span>
          </p>
        ) : null}
        <p className="mt-6 text-sm text-[var(--muted-foreground)]">
          Prefer to talk now? Call{" "}
          <a href="tel:2564349301" className="font-medium text-[var(--primary)] underline">
            (256) 434-9301
          </a>{" "}
          or text (256) 608-4111.
        </p>
      </div>
    );
  }

  const StepIcon = steps[step].icon;

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)]">
      {/* Progress header */}
      <div className="border-b border-[var(--border)] p-6 md:p-8">
        <div className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-2 font-medium text-[var(--foreground)]">
            <StepIcon className="size-4 text-[var(--brass-600)]" aria-hidden="true" />
            {steps[step].title}
          </span>
          <span className="tabular-nums text-[var(--muted-foreground)]">
            Step {step + 1} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="mt-4" />
        <ol className="mt-4 hidden items-center justify-between gap-2 sm:flex">
          {steps.map((s, i) => (
            <li
              key={s.id}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium",
                i < step
                  ? "text-[var(--success)]"
                  : i === step
                    ? "text-[var(--primary)]"
                    : "text-[var(--charcoal-400)]",
              )}
            >
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full border text-[0.65rem]",
                  i < step
                    ? "border-[var(--success)] bg-[var(--success)] text-white"
                    : i === step
                      ? "border-[var(--primary)] text-[var(--primary)]"
                      : "border-[var(--border-strong)]",
                )}
              >
                {i < step ? <Check className="size-3" /> : i + 1}
              </span>
              {s.title}
            </li>
          ))}
        </ol>
      </div>

      {/* Step body */}
      <div className="p-6 md:p-8">
        {step === 0 ? (
          <fieldset>
            <legend className="font-display text-2xl font-semibold text-[var(--foreground)]">
              What brings you here?
            </legend>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Select all the goals that resonate — choose as many as you like.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {GOALS.map((g) => {
                const active = data.goals.includes(g);
                return (
                  <button
                    type="button"
                    key={g}
                    aria-pressed={active}
                    onClick={() => toggleGoal(g)}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-[var(--radius-md)] border px-4 py-3.5 text-left text-sm font-medium transition-all cursor-pointer",
                      active
                        ? "border-[var(--primary)] bg-[var(--forest-100)] text-[var(--forest-800)]"
                        : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--brass-400)]",
                    )}
                  >
                    {g}
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border",
                        active ? "border-[var(--primary)] bg-[var(--primary)] text-white" : "border-[var(--border-strong)]",
                      )}
                    >
                      {active ? <Check className="size-3" aria-hidden="true" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <div className="space-y-7">
            <RadioGroup
              label="Biological sex"
              name="sex"
              options={SEX}
              value={data.sex}
              onChange={(v) => set("sex", v)}
            />
            <RadioGroup
              label="Age range"
              name="age"
              options={AGE}
              value={data.ageRange}
              onChange={(v) => set("ageRange", v)}
            />
            <RadioGroup
              label="How are your energy levels lately?"
              name="energy"
              options={["Great", "Okay", "Low", "Very low"]}
              value={data.energy}
              onChange={(v) => set("energy", v)}
            />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-7">
            <fieldset>
              <legend className="font-display text-2xl font-semibold text-[var(--foreground)]">
                Which service interests you most?
              </legend>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Not sure? Choose &ldquo;help me decide&rdquo; and we&apos;ll guide you.
              </p>
              <div className="mt-6 grid gap-3">
                {INTERESTS.map((opt) => {
                  const active = data.interest === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      aria-pressed={active}
                      onClick={() => set("interest", opt)}
                      className={cn(
                        "flex items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3.5 text-left text-sm font-medium transition-all cursor-pointer",
                        active
                          ? "border-[var(--primary)] bg-[var(--forest-100)] text-[var(--forest-800)]"
                          : "border-[var(--border-strong)] hover:border-[var(--brass-400)]",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full border",
                          active ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border-strong)]",
                        )}
                      >
                        {active ? <span className="size-2 rounded-full bg-white" /> : null}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <RadioGroup
              label="What's your timeline?"
              name="timeline"
              options={TIMELINE}
              value={data.timeline}
              onChange={(v) => set("timeline", v)}
            />
          </div>
        ) : null}

        {step === 3 ? (
          <div>
            <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
              Where can we reach you?
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              We&apos;ll use this only to follow up about your consultation.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First name <span className="text-[var(--danger)]">*</span>
                </Label>
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  value={data.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last name <span className="text-[var(--danger)]">*</span>
                </Label>
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  value={data.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">
                  Email <span className="text-[var(--danger)]">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={data.email.length > 0 && !emailValid}
                  required
                />
                {data.email.length > 0 && !emailValid ? (
                  <p className="text-xs text-[var(--danger)]">Please enter a valid email address.</p>
                ) : null}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div>
            <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
              Review your assessment
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Make sure everything looks right, then submit.
            </p>
            <dl className="mt-6 divide-y divide-[var(--border)] rounded-[var(--radius-md)] border border-[var(--border)]">
              <ReviewRow label="Goals" value={data.goals.join(", ") || "—"} onEdit={() => setStep(0)} />
              <ReviewRow
                label="Health basics"
                value={`${data.sex} · ${data.ageRange} · Energy: ${data.energy}`}
                onEdit={() => setStep(1)}
              />
              <ReviewRow
                label="Service interest"
                value={`${data.interest}${data.timeline ? ` · ${data.timeline}` : ""}`}
                onEdit={() => setStep(2)}
              />
              <ReviewRow
                label="Contact"
                value={`${data.firstName} ${data.lastName} · ${data.email}${data.phone ? ` · ${data.phone}` : ""}`}
                onEdit={() => setStep(3)}
              />
            </dl>

            {status === "error" ? (
              <p
                role="alert"
                className="mt-5 flex items-center gap-2 rounded-[var(--radius-md)] bg-[#f6e2df] px-4 py-3 text-sm text-[var(--danger)]"
              >
                <AlertCircle className="size-4 shrink-0" aria-hidden="true" /> {errorMsg}
              </p>
            ) : null}

            <p className="mt-5 text-xs text-[var(--muted-foreground)]">
              This is a lead-capture demo. Submissions are processed by a mock API and are not stored
              as PHI. Submitting does not create an appointment.
            </p>
          </div>
        ) : null}
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] p-6 md:p-8">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || status === "submitting"}
        >
          <ArrowLeft className="size-4" /> Back
        </Button>

        {step < steps.length - 1 ? (
          <Button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance}
          >
            Continue <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="button" onClick={submit} disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Submitting…
              </>
            ) : (
              <>Submit assessment</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-[var(--foreground)]">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-3">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              type="button"
              key={opt}
              name={name}
              aria-pressed={active}
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer",
                active
                  ? "border-[var(--primary)] bg-[var(--forest-800)] text-[var(--primary-foreground)]"
                  : "border-[var(--border-strong)] text-[var(--foreground)] hover:border-[var(--brass-400)]",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-4">
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
          {label}
        </dt>
        <dd className="mt-1 text-sm text-[var(--foreground)]">{value}</dd>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-sm font-medium text-[var(--primary)] underline-offset-2 hover:underline cursor-pointer"
      >
        Edit
      </button>
    </div>
  );
}
