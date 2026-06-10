"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data/services";

const GOALS = [
  "More energy & focus",
  "Hormone balance",
  "Weight loss",
  "Better sleep",
  "Aesthetics / confidence",
  "Recovery & longevity",
  "Addiction support",
  "Not sure — help me figure it out",
];

const AGE_RANGES = ["18–29", "30–39", "40–49", "50–59", "60+"];

const TIMEFRAMES = [
  "As soon as possible",
  "Within the next month",
  "Just exploring options",
];

type FormState = {
  goals: string[];
  ageRange: string;
  sex: string;
  symptoms: string;
  serviceInterest: string;
  timeframe: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const initialState: FormState = {
  goals: [],
  ageRange: "",
  sex: "",
  symptoms: "",
  serviceInterest: "",
  timeframe: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const steps = [
  { id: "goals", title: "Your Goals" },
  { id: "basics", title: "Health Basics" },
  { id: "interest", title: "Service Interest" },
  { id: "contact", title: "Contact Details" },
  { id: "review", title: "Review & Submit" },
];

type Status = "idle" | "submitting" | "success" | "error";

export function AssessmentWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const headingId = useId();

  const isLastStep = step === steps.length - 1;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleGoal(goal: string) {
    setForm((f) => ({
      ...f,
      goals: f.goals.includes(goal)
        ? f.goals.filter((g) => g !== goal)
        : [...f.goals, goal],
    }));
  }

  function canProceed(): boolean {
    switch (steps[step].id) {
      case "goals":
        return form.goals.length > 0;
      case "basics":
        return form.ageRange !== "" && form.sex !== "";
      case "interest":
        return form.serviceInterest !== "" && form.timeframe !== "";
      case "contact":
        return form.name.trim() !== "" && (form.email.trim() !== "" || form.phone.trim() !== "");
      default:
        return true;
    }
  }

  function next() {
    if (!canProceed()) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "assessment", ...form }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-soft-lg sm:p-12"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-light text-sage-dark">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-extrabold text-brown">
          Thanks, {form.name.split(" ")[0] || "there"}!
        </h2>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-brown-soft">
          Your assessment has been received. A member of our care team will
          reach out by phone, text, or email within 1–2 business days to talk
          through next steps.
        </p>
        <Button asChild className="mt-6 rounded-full" variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brown-soft">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{steps[step].title}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-clay">
          <div
            className="h-full rounded-full bg-terracotta transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft-md sm:p-8">
        <h2 id={headingId} className="font-display text-2xl font-extrabold text-brown">
          {steps[step].title}
        </h2>

        {/* Step 1: Goals */}
        {steps[step].id === "goals" && (
          <div className="mt-6">
            <p className="text-sm text-brown-soft">
              What are you hoping to improve? Select all that apply.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {GOALS.map((goal) => {
                const checked = form.goals.includes(goal);
                return (
                  <label
                    key={goal}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition-colors",
                      checked
                        ? "border-terracotta bg-clay text-terracotta-dark"
                        : "border-border bg-cream-soft text-brown-soft hover:border-terracotta-light"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleGoal(goal)}
                    />
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        checked
                          ? "border-terracotta bg-terracotta text-white"
                          : "border-brown-soft/40"
                      )}
                      aria-hidden="true"
                    >
                      {checked && <CheckCircle2 className="h-4 w-4" />}
                    </span>
                    {goal}
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Health basics */}
        {steps[step].id === "basics" && (
          <div className="mt-6 space-y-6">
            <div>
              <Label className="text-base font-semibold text-brown">
                Age range
              </Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {AGE_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => update("ageRange", range)}
                    className={cn(
                      "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors",
                      form.ageRange === range
                        ? "border-terracotta bg-clay text-terracotta-dark"
                        : "border-border bg-cream-soft text-brown-soft hover:border-terracotta-light"
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-base font-semibold text-brown">
                Sex assigned at birth
              </Label>
              <p className="mt-1 text-xs text-brown-soft">
                This helps us recommend the most relevant programs (e.g.
                Men's vs. Women's Health).
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Female", "Male", "Prefer not to say"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("sex", opt)}
                    className={cn(
                      "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors",
                      form.sex === opt
                        ? "border-terracotta bg-clay text-terracotta-dark"
                        : "border-border bg-cream-soft text-brown-soft hover:border-terracotta-light"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="symptoms" className="text-base font-semibold text-brown">
                Anything else you'd like us to know? (optional)
              </Label>
              <Textarea
                id="symptoms"
                rows={4}
                placeholder="E.g. current symptoms, medications, or relevant health history..."
                value={form.symptoms}
                onChange={(e) => update("symptoms", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 3: Service interest */}
        {steps[step].id === "interest" && (
          <div className="mt-6 space-y-6">
            <div>
              <Label className="text-base font-semibold text-brown">
                Which service are you most interested in?
              </Label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => update("serviceInterest", service.name)}
                    className={cn(
                      "rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors",
                      form.serviceInterest === service.name
                        ? "border-terracotta bg-clay text-terracotta-dark"
                        : "border-border bg-cream-soft text-brown-soft hover:border-terracotta-light"
                    )}
                  >
                    {service.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => update("serviceInterest", "Not sure yet")}
                  className={cn(
                    "rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors",
                    form.serviceInterest === "Not sure yet"
                      ? "border-terracotta bg-clay text-terracotta-dark"
                      : "border-border bg-cream-soft text-brown-soft hover:border-terracotta-light"
                  )}
                >
                  Not sure yet
                </button>
              </div>
            </div>
            <div>
              <Label className="text-base font-semibold text-brown">
                When would you like to get started?
              </Label>
              <div className="mt-3 flex flex-col gap-2">
                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => update("timeframe", tf)}
                    className={cn(
                      "rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors",
                      form.timeframe === tf
                        ? "border-terracotta bg-clay text-terracotta-dark"
                        : "border-border bg-cream-soft text-brown-soft hover:border-terracotta-light"
                    )}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact details */}
        {steps[step].id === "contact" && (
          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(256) 555-0100"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
            </div>
            <p className="text-xs text-brown-soft">
              Please provide at least one way to reach you (email or phone).
            </p>
            <div className="space-y-2">
              <Label htmlFor="notes">Anything else? (optional)</Label>
              <Textarea
                id="notes"
                rows={3}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Best time to reach you, additional questions, etc."
              />
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {steps[step].id === "review" && (
          <div className="mt-6 space-y-5">
            <p className="text-sm text-brown-soft">
              Please review your information before submitting. Our care team
              will follow up by phone, text, or email — this is not a
              scheduled appointment.
            </p>
            <dl className="space-y-3 rounded-2xl bg-cream-soft p-5 text-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="font-semibold text-brown">Goals</dt>
                <dd className="text-brown-soft sm:text-right">
                  {form.goals.join(", ") || "—"}
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="font-semibold text-brown">Age range</dt>
                <dd className="text-brown-soft">{form.ageRange || "—"}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="font-semibold text-brown">Sex</dt>
                <dd className="text-brown-soft">{form.sex || "—"}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="font-semibold text-brown">Service interest</dt>
                <dd className="text-brown-soft sm:text-right">
                  {form.serviceInterest || "—"}
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="font-semibold text-brown">Timeframe</dt>
                <dd className="text-brown-soft sm:text-right">
                  {form.timeframe || "—"}
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="font-semibold text-brown">Name</dt>
                <dd className="text-brown-soft">{form.name || "—"}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="font-semibold text-brown">Email</dt>
                <dd className="text-brown-soft">{form.email || "—"}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <dt className="font-semibold text-brown">Phone</dt>
                <dd className="text-brown-soft">{form.phone || "—"}</dd>
              </div>
            </dl>

            {error && (
              <p role="alert" className="text-sm font-semibold text-destructive">
                {error}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={back}
            disabled={step === 0 || status === "submitting"}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {!isLastStep ? (
            <Button
              type="button"
              onClick={next}
              disabled={!canProceed()}
              className="rounded-full shadow-soft"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={status === "submitting"}
              className="rounded-full shadow-soft"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Submit Assessment
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
