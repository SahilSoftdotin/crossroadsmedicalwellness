import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { isAuthenticated, signIn } from "@/lib/auth";
import { LoginForm } from "@/components/portal/login-form";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Sign in to your portal",
};

const highlights = [
  "View biomarker lab results & trends",
  "Track your physician-designed protocol",
  "Message your care team securely",
];

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect("/portal");
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Brand / value panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[var(--forest-900)] p-10 text-[var(--primary-foreground)] lg:flex xl:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[var(--forest-700)] opacity-40 blur-3xl"
        />
        <Link href="/" className="relative inline-flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-700)] ring-1 ring-[var(--forest-600)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M2 12h20" stroke="var(--brass-500)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="3.4" stroke="var(--primary-foreground)" strokeWidth="1.6" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.05rem] font-semibold">Crossroads</span>
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-[var(--brass-400)]">
              Patient Portal
            </span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <p className="eyebrow !text-[var(--brass-400)]">Your health, organized</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-balance">
            Welcome back to your care command center.
          </h1>
          <ul className="mt-8 flex flex-col gap-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[var(--brass-200)]">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[var(--brass-400)]" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-[var(--forest-400)]">
          {clinic.name} · {clinic.address.city}, {clinic.address.state}
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-[var(--background)] px-5 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid size-9 place-items-center rounded-[var(--radius-md)] bg-[var(--primary)]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M2 12h20" stroke="var(--brass-500)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="3.4" stroke="var(--primary-foreground)" strokeWidth="1.6" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold">Crossroads</span>
            </Link>
          </div>

          <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
            Sign in
          </h2>
          <p className="mt-1.5 mb-7 text-sm text-[var(--muted-foreground)]">
            Access your labs, protocol and care team.
          </p>

          <LoginForm signInAction={signIn} />

          <div className="mt-8 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted-foreground)]">
            <p>
              New to Crossroads?{" "}
              <Link
                href="/assessment"
                className="inline-flex items-center gap-1 font-medium text-[var(--primary)] hover:underline"
              >
                Start your assessment
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
