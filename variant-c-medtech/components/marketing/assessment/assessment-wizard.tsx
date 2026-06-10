"use client";

import { useId, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data/services";

type FormState = {
  goals: string[];
  ageRange: string;
  sex: string;
  healthNotes: string;
  serviceInterest: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: "phone" | "text" | "email";
};

const initialState: FormState = {
  goals: [],
  ageRange: "",
  sex: "",
  healthNotes: "",
  serviceInterest: "",
  name: "",
  email: "",
  phone: "",
  preferredContact: "phone",
};

const goalOptions = [
  "More energy & focus",
  "Weight loss / body composition",
  "Hormone balance (men)",
  "Hormone balance (women / menopause)",
  "Better sleep",
  "Healthy aging / longevity",
  "Hair restoration / aesthetics",
  "Support with substance use",
];

const ageRangeOptions = ["Under 30", "30-39", "40-49", "50-59", "60+"];
const sexOptions = ["Female", "Male", "Prefer not to say"];

const steps = ["Goals", "Health Basics", "Service Interest", "Your Info", "Review"] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function AssessmentWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const formId = useId();

  const isLastStep = step === steps.length - 1;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleGoal(goal: string) {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  }

  function validateStep(currentStep: number): boolean {
    switch (currentStep) {
      case 0:
        return form.goals.length > 0;
      case 1:
        return form.ageRange !== "" && form.sex !== "";
      case 2:
        return form.serviceInterest !== "";
      case 3:
        return form.name.trim() !== "" && /\S+@\S+\.\S+/.test(form.email) && form.phone.trim().length >= 7;
      default:
        return true;
    }
  }

  function goNext() {
    setTouched(true);
    if (!validateStep(step)) return;
    setTouched(false);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goBack() {
    setTouched(false);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "assessment",
          name: form.name,
          email: form.email,
          phone: form.phone,
          preferredContact: form.preferredContact,
          goals: form.goals,
          serviceInterest: form.serviceInterest,
          ageRange: form.ageRange,
          sex: form.sex,
          healthNotes: form.healthNotes,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please call or text us directly.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please call or text us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-success/30 bg-success/10 p-10 text-center sm:p-14">
        <CheckCircle2 className="mx-auto size-12 text-success" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
          Thanks, {form.name.split(" ")[0] || "there"}!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Your assessment has been received. Our team will reach out by{" "}
          {form.preferredContact === "phone" ? "phone call" : form.preferredContact === "text" ? "text message" : "email"}{" "}
          to schedule your consultation with Dr. Adams.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-elevated sm:p-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{steps[step]}</span>
        </div>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {steps.map((s, i) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-accent" : "bg-border"
              )}
            />
          ))}
        </div>
      </div>

      <div role="group" aria-labelledby={`${formId}-step-heading`}>
        <h2 id={`${formId}-step-heading`} className="font-display text-2xl font-semibold text-primary">
          {step === 0 && "What are your main goals?"}
          {step === 1 && "A few health basics"}
          {step === 2 && "Which service interests you most?"}
          {step === 3 && "How can we reach you?"}
          {step === 4 && "Review your assessment"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {step === 0 && "Select everything that applies — this isn't a diagnosis, just a starting point for your consultation."}
          {step === 1 && "This helps Dr. Adams understand context before your visit."}
          {step === 2 && "We'll prioritize this in your consultation, but feel free to discuss other options too."}
          {step === 3 && "We'll use this to follow up and schedule your consultation — never shared or sold."}
          {step === 4 && "Please confirm everything looks correct before submitting."}
        </p>

        <div className="mt-8">
          {/* Step 0: Goals */}
          {step === 0 && (
            <fieldset>
              <legend className="sr-only">Health goals</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {goalOptions.map((goal) => {
                  const checked = form.goals.includes(goal);
                  return (
                    <label
                      key={goal}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm font-medium transition-colors",
                        checked
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border bg-background text-foreground hover:border-primary/40"
                      )}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleGoal(goal)}
                        aria-label={goal}
                      />
                      {goal}
                    </label>
                  );
                })}
              </div>
              {touched && !validateStep(0) && (
                <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="size-4" /> Please select at least one goal.
                </p>
              )}
            </fieldset>
          )}

          {/* Step 1: Health basics */}
          {step === 1 && (
            <div className="space-y-6">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-foreground">
                  Age range <span className="text-destructive">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {ageRangeOptions.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => update("ageRange", range)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        form.ageRange === range
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary/40"
                      )}
                      aria-pressed={form.ageRange === range}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-foreground">
                  Sex <span className="text-destructive">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {sexOptions.map((sex) => (
                    <button
                      key={sex}
                      type="button"
                      onClick={() => update("sex", sex)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        form.sex === sex
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary/40"
                      )}
                      aria-pressed={form.sex === sex}
                    >
                      {sex}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-2">
                <Label htmlFor="health-notes">Anything else we should know? (optional)</Label>
                <Textarea
                  id="health-notes"
                  rows={4}
                  value={form.healthNotes}
                  onChange={(e) => update("healthNotes", e.target.value)}
                  placeholder="Current medications, relevant history, specific symptoms..."
                />
              </div>

              {touched && !validateStep(1) && (
                <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="size-4" /> Please select an age range and sex.
                </p>
              )}
            </div>
          )}

          {/* Step 2: Service interest */}
          {step === 2 && (
            <fieldset>
              <legend className="sr-only">Service interest</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <label
                    key={service.slug}
                    className={cn(
                      "flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition-colors",
                      form.serviceInterest === service.slug
                        ? "border-primary bg-primary-soft"
                        : "border-border bg-background hover:border-primary/40"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="serviceInterest"
                        value={service.slug}
                        checked={form.serviceInterest === service.slug}
                        onChange={() => update("serviceInterest", service.slug)}
                        className="size-4 accent-primary"
                      />
                      <span className="font-display text-sm font-semibold text-primary">{service.name}</span>
                    </span>
                    <span className="text-xs leading-relaxed text-muted-foreground">{service.summary}</span>
                  </label>
                ))}
                <label
                  className={cn(
                    "flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition-colors",
                    form.serviceInterest === "not-sure"
                      ? "border-primary bg-primary-soft"
                      : "border-border bg-background hover:border-primary/40"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="serviceInterest"
                      value="not-sure"
                      checked={form.serviceInterest === "not-sure"}
                      onChange={() => update("serviceInterest", "not-sure")}
                      className="size-4 accent-primary"
                    />
                    <span className="font-display text-sm font-semibold text-primary">Not sure yet</span>
                  </span>
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    I&rsquo;d like to discuss options with Dr. Adams during my consultation.
                  </span>
                </label>
              </div>
              {touched && !validateStep(2) && (
                <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="size-4" /> Please select an option.
                </p>
              )}
            </fieldset>
          )}

          {/* Step 3: Contact details */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="assessment-name">
                    Full name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="assessment-name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Jordan Mitchell"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assessment-phone">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="assessment-phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(256) 555-0100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assessment-email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="assessment-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-foreground">Preferred contact method</legend>
                <div className="flex flex-wrap gap-2">
                  {(["phone", "text", "email"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => update("preferredContact", method)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors",
                        form.preferredContact === method
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary/40"
                      )}
                      aria-pressed={form.preferredContact === method}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </fieldset>
              {touched && !validateStep(3) && (
                <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="size-4" /> Please complete all required fields with a valid email.
                </p>
              )}
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-4 rounded-2xl border border-border bg-secondary/40 p-5">
                <ReviewRow label="Goals">
                  <div className="flex flex-wrap gap-1.5">
                    {form.goals.map((g) => (
                      <Badge key={g} variant="secondary">{g}</Badge>
                    ))}
                  </div>
                </ReviewRow>
                <ReviewRow label="Age range">{form.ageRange}</ReviewRow>
                <ReviewRow label="Sex">{form.sex}</ReviewRow>
                {form.healthNotes && <ReviewRow label="Notes">{form.healthNotes}</ReviewRow>}
                <ReviewRow label="Service interest">
                  {services.find((s) => s.slug === form.serviceInterest)?.name ?? "Not sure yet"}
                </ReviewRow>
                <ReviewRow label="Name">{form.name}</ReviewRow>
                <ReviewRow label="Email">{form.email}</ReviewRow>
                <ReviewRow label="Phone">{form.phone}</ReviewRow>
                <ReviewRow label="Preferred contact">
                  <span className="capitalize">{form.preferredContact}</span>
                </ReviewRow>
              </div>
              <p className="text-xs text-muted-foreground">
                By submitting, you agree to be contacted by Crossroads Medical Wellness regarding your
                assessment. This is a request for consultation, not a diagnosis or appointment
                confirmation.
              </p>
              {status === "error" && errorMessage && (
                <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="size-4" /> {errorMessage}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={goBack}
          disabled={step === 0 || status === "submitting"}
          className={step === 0 ? "invisible" : ""}
        >
          <ArrowLeft data-icon="inline-start" />
          Back
        </Button>

        {!isLastStep ? (
          <Button type="button" onClick={goNext}>
            Continue
            <ArrowRight data-icon="inline-end" />
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={status === "submitting"}>
            {status === "submitting" && <Loader2 data-icon="inline-start" className="animate-spin" />}
            {status === "submitting" ? "Submitting..." : "Submit Assessment"}
          </Button>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-4">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}
