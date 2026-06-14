"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      source: "contact" as const,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      preferredContact: String(formData.get("preferredContact") ?? "phone") as
        | "phone"
        | "text"
        | "email",
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""), // honeypot — must stay empty
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Something went wrong. Please call or text us directly."
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please call or text us directly.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-success/30 bg-success/10 p-8 text-center"
      >
        <CheckCircle2 className="size-10 text-success" aria-hidden="true" />
        <h3 className="font-display text-lg font-semibold text-foreground">Message received</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thanks for reaching out! Our team will follow up by phone or text shortly to confirm your
          request.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users; bots that fill it are silently dropped. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name <span aria-hidden="true" className="text-destructive">*</span></Label>
          <Input id="name" name="name" autoComplete="name" required placeholder="Jordan Mitchell" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone <span aria-hidden="true" className="text-destructive">*</span></Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="(256) 555-0100" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email <span aria-hidden="true" className="text-destructive">*</span></Label>
        <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </div>

      <div className="space-y-2">
        <Label>Preferred contact method</Label>
        <RadioGroup defaultValue="phone" name="preferredContact" className="flex flex-wrap gap-4">
          {[
            { value: "phone", label: "Phone call" },
            { value: "text", label: "Text message" },
            { value: "email", label: "Email" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm font-medium text-foreground">
              <RadioGroupItem value={option.value} id={`contact-${option.value}`} />
              {option.label}
            </label>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us a bit about what you're looking for..."
        />
      </div>

      {status === "error" && errorMessage && (
        <div role="alert" className="flex items-start gap-2.5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button type="submit" size="lg" className="h-12 w-full text-base sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" && <Loader2 data-icon="inline-start" className="animate-spin" />}
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
      <p className="text-xs text-muted-foreground">
        This form is for general inquiries and appointment requests — not real-time scheduling. Our
        team will follow up by phone or text.
      </p>
    </form>
  );
}
