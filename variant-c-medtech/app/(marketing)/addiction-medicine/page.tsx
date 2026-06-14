import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Lock, Phone, ShieldPlus } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives";
import { addictionMedicine } from "@/lib/data/standalone-services";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Addiction Medicine — Crossroads Medical Wellness",
  description:
    "Confidential, compassionate, physician-led addiction medicine and medication-assisted treatment (MAT) from Crossroads Medical Wellness in Athens, AL.",
};

export default function AddictionMedicinePage() {
  const phone = (clinic as { phone?: string }).phone ?? "(256) 434-9301";
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      {/* Header — clearly a Crossroads Medical Wellness service */}
      <section className="border-b border-border bg-card">
        <div className="container-page section-y !pb-12">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <ShieldPlus className="size-3.5 text-accent" aria-hidden="true" />
              A service of {addictionMedicine.brand}
            </p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold text-primary sm:text-5xl">
              {addictionMedicine.title}
            </h1>
            <p className="mt-4 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              {addictionMedicine.intro}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Offered separately from the THRIVE Longevity Center program.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Request a confidential consultation
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={phoneHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Phone className="size-4" aria-hidden="true" />
                {phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
              Treatment &amp; consultations
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Evidence-based, judgment-free care — every visit is private and tailored to where you
              are in your recovery.
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.05}>
            {addictionMedicine.services.map((svc) => (
              <StaggerItem key={svc}>
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <span className="mt-0.5 grid size-7 shrink-0 place-content-center rounded-full bg-accent-soft text-primary">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{svc}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-8">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="size-4 text-accent" aria-hidden="true" />
              Your care is confidential and delivered with discretion and respect.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA (Crossroads-branded, not THRIVE/Sentinel) */}
      <section className="section-y pt-0">
        <div className="container-page">
          <Reveal>
            <div className="rounded-3xl border border-border bg-secondary/40 p-8 text-center sm:p-12">
              <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                Take the first step, privately
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Reach out to {addictionMedicine.brand} for a confidential conversation. We&rsquo;ll
                meet you where you are.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Contact us
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href={phoneHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
