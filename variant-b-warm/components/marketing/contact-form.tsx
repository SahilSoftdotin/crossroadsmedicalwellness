"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      source: "contact" as const,
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      preferredContact: String(formData.get("preferredContact") || ""),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-light text-sage-dark">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-brown">
          Message received!
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-brown-soft">
          Thanks for reaching out. Our care team will follow up by phone,
          text, or email shortly.
        </p>
        <Button
          variant="outline"
          className="mt-6 rounded-full"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(256) 555-0100"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <p className="text-xs text-brown-soft">
          Please provide at least one way to reach you (email or phone).
        </p>
      </div>
      <div className="space-y-2">
        <Label>Preferred contact method</Label>
        <div className="flex flex-wrap gap-2">
          {["Phone", "Text", "Email"].map((method) => (
            <label
              key={method}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-cream-soft px-4 py-2 text-sm font-semibold text-brown-soft has-[:checked]:border-terracotta has-[:checked]:bg-clay has-[:checked]:text-terracotta-dark"
            >
              <input
                type="radio"
                name="preferredContact"
                value={method}
                defaultChecked={method === "Phone"}
                className="sr-only"
              />
              {method}
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us a bit about what you're looking for..."
          required
        />
      </div>

      {error && (
        <p role="alert" className="text-sm font-semibold text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full rounded-full shadow-soft sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </Button>
      <p className="text-xs text-brown-soft">
        This form is for general inquiries and is not for medical
        emergencies. If you are experiencing a medical emergency, call 911.
      </p>
    </form>
  );
}
