"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Activity, AlertCircle, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPortalSession } from "@/lib/portal-auth";

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.trim().length < 4) {
      setError("Enter your password (any value works in this demo).");
      return;
    }

    setSubmitting(true);
    setPortalSession(email.trim());
    router.push("/portal");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Branding side */}
      <div className="grid-pattern relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[color-mix(in_oklch,var(--primary),var(--accent)_18%)]" />
        <Link href="/" className="relative flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Activity className="size-5" aria-hidden="true" />
          </span>
          THRIVE Longevity Center
        </Link>

        <div className="relative max-w-md">
          <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">Patient Portal</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight">
            Your labs, protocol, and progress — all in one place.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
            Track your biomarker trends, stay on top of your protocol, message your care team, and
            review upcoming visits with Dr. Adams and the THRIVE team.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-primary-foreground/80">
            {["Biomarker trends with optimal ranges", "Medication & supplement schedule", "Direct messaging with your care team"].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-primary-foreground/60">
          This is a demo prototype. No real patient data is stored or transmitted.
        </p>
      </div>

      {/* Form side */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center gap-2 font-display text-lg font-semibold text-primary lg:hidden">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Activity className="size-5" aria-hidden="true" />
            </span>
            THRIVE Longevity Center
          </Link>

          <h2 className="font-display text-2xl font-semibold text-primary">Sign in to your portal</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Demo only — enter any email and password to view the sample patient experience.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jordan.mitchell@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="size-4 shrink-0" /> {error}
              </p>
            )}

            <Button type="submit" className="h-11 w-full text-base" disabled={submitting}>
              {submitting && <Loader2 data-icon="inline-start" className="animate-spin" />}
              {submitting ? "Signing in..." : "Sign In"}
              {!submitting && <ArrowRight data-icon="inline-end" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing in you&rsquo;re viewing a demo dashboard pre-loaded with sample data for{" "}
            <span className="font-medium text-foreground">Jordan Mitchell</span>. No real patient
            information is used.
          </p>

          <div className="mt-8 border-t border-border pt-6 text-center">
            <Link href="/" className="text-sm font-medium text-primary hover:underline">
              Back to thrivelongevitycenter.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
