"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { services } from "@/lib/data/services";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact" }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Network error. Please try again or call us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--forest-100)] p-10 text-center"
      >
        <CheckCircle2 className="size-12 text-[var(--success)]" aria-hidden="true" />
        <h3 className="font-display text-2xl font-semibold text-[var(--forest-800)]">
          Thank you — we&apos;ve got it
        </h3>
        <p className="max-w-md text-sm text-[var(--forest-700)]">
          Your message has been received. A member of our team will reach out within one business
          day. For urgent needs, please call us at (256) 434-9301.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First name <span className="text-[var(--danger)]">*</span>
          </Label>
          <Input id="firstName" name="firstName" autoComplete="given-name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last name <span className="text-[var(--danger)]">*</span>
          </Label>
          <Input id="lastName" name="lastName" autoComplete="family-name" required />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-[var(--danger)]">*</span>
          </Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interest">I&apos;m interested in</Label>
        <select
          id="interest"
          name="interest"
          defaultValue=""
          className="flex h-11 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--input)] px-4 text-sm text-[var(--foreground)] shadow-[var(--shadow-xs)] focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40"
        >
          <option value="" disabled>
            Select a service…
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.shortName}
            </option>
          ))}
          <option value="General inquiry">General inquiry</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          How can we help? <span className="text-[var(--danger)]">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us a little about what you're looking for…"
        />
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[#f6e2df] px-4 py-3 text-sm text-[var(--danger)]"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" /> {errorMsg}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
      <p className="text-xs text-[var(--muted-foreground)]">
        This form is a lead-capture demo. Submissions are logged by a mock API and not stored as PHI.
      </p>
    </form>
  );
}
