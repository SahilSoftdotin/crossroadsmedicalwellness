"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowLeft, BellRing, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ComingSoonPage() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "waitlist", email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  const drift = (x: number[], y: number[], s: number[], d: number) =>
    reduce ? undefined : { x, y, scale: s, transition: { duration: d, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#081326_0%,#0d1f3c_50%,#0a1830_100%)] px-6 py-16 text-white">
      {/* ---------- Live abstract motion (transform-only, reduced-motion safe) ---------- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Slowly rotating conic halo */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, var(--accent) 18%, transparent 38%, #3b6fe0 60%, transparent 82%, var(--accent) 100%)",
          }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        {/* Drifting aurora blobs */}
        <motion.div
          className="absolute -left-[12%] top-[8%] size-[42rem] rounded-full bg-[radial-gradient(circle,var(--accent),transparent_68%)] opacity-30 blur-[120px]"
          animate={drift([0, 60, 0], [0, 40, 0], [1, 1.15, 1], 20)}
        />
        <motion.div
          className="absolute -right-[14%] bottom-[2%] size-[40rem] rounded-full bg-[radial-gradient(circle,#3b6fe0,transparent_70%)] opacity-30 blur-[130px]"
          animate={drift([0, -50, 0], [0, -30, 0], [1.1, 1, 1.1], 24)}
        />
        {/* Floating accent rings */}
        {[
          { c: "left-[14%] top-[22%]", s: "size-24", dur: 7 },
          { c: "right-[18%] top-[30%]", s: "size-16", dur: 9 },
          { c: "left-[22%] bottom-[20%]", s: "size-20", dur: 8 },
          { c: "right-[26%] bottom-[26%]", s: "size-12", dur: 6 },
        ].map((r, i) => (
          <motion.span
            key={i}
            className={`absolute ${r.c} ${r.s} rounded-full border border-[var(--accent)]/25`}
            animate={reduce ? undefined : { y: [0, -16, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: r.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
        {/* Subtle dot grid + bottom vignette */}
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#081326] to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <motion.div
        className="relative z-10 w-full max-w-lg text-center"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={reduce ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/"
          aria-label="THRIVE Longevity Center — go to homepage"
          className="group mx-auto inline-flex flex-col items-center gap-2"
        >
          <span className="flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight text-white">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md transition-colors group-hover:bg-white/20">
              <Activity className="size-5" aria-hidden="true" />
            </span>
            THRIVE
          </span>
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-white/55">
            Longevity Center
          </span>
        </Link>

        <h1 className="mt-12 font-display text-6xl font-semibold leading-[1.03] tracking-tight sm:text-7xl">
          Coming{" "}
          <span className="bg-gradient-to-r from-[var(--accent)] to-[#6aa6ff] bg-clip-text text-transparent">
            soon
          </span>
        </h1>

        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent)] backdrop-blur-md">
          Patient Dashboard
        </p>

        <p className="mx-auto mt-5 max-w-md text-balance text-base leading-relaxed text-white/70">
          Your secure patient dashboard — labs, protocols, biomarker trends, and progress in one
          place — is on the way. Leave your email and we&rsquo;ll let you know the moment it&rsquo;s live.
        </p>

        {/* Email capture / success */}
        <div className="mt-9">
          {status === "success" ? (
            <div
              role="status"
              className="mx-auto flex max-w-md items-center justify-center gap-2.5 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-5 py-4 text-sm font-medium text-white"
            >
              <CheckCircle2 className="size-5 text-[var(--accent)]" aria-hidden="true" />
              You&rsquo;re on the list — we&rsquo;ll be in touch the moment it launches.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row" noValidate>
              <label htmlFor="notify-email" className="sr-only">
                Email address
              </label>
              <input
                id="notify-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-base text-white placeholder:text-white/45 backdrop-blur-md focus:border-[var(--accent)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[#3b9fe0] px-6 text-base font-semibold text-[#06243a] shadow-[0_10px_40px_-10px_var(--accent)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[#0d1f3c] disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                ) : (
                  <BellRing className="size-5" aria-hidden="true" />
                )}
                {status === "submitting" ? "Submitting…" : "Notify me"}
              </button>
            </form>
          )}
          {error && (
            <p role="alert" className="mt-3 text-sm text-[#ff9a9a]">
              {error}
            </p>
          )}
        </div>

        {/* Back to home */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to homepage
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
