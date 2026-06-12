import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, BookOpen, HeartPulse, Microscope, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "About Dr. Gary Adams",
  description:
    "Meet Dr. Gary Adams, MD, and learn about the integrative philosophy behind THRIVE Longevity Center in Athens, AL.",
};

const philosophyPoints = [
  {
    icon: Microscope,
    title: "Lab-driven, not guesswork",
    description:
      "Every plan starts with comprehensive testing. We look at where your numbers actually fall — not just whether they're 'within range.'",
  },
  {
    icon: HeartPulse,
    title: "Root-cause focus",
    description:
      "Symptoms are signals, not the whole story. We look for the underlying drivers — hormonal, metabolic, inflammatory — behind how you feel.",
  },
  {
    icon: Stethoscope,
    title: "Integrative, not either/or",
    description:
      "We use conventional diagnostics and evidence-based treatments alongside functional approaches — combining the best of both worlds.",
  },
  {
    icon: BookOpen,
    title: "Education-first",
    description:
      "You'll understand why a treatment is recommended, what to expect, and how we'll measure whether it's working.",
  },
];

const credentials = [
  "30+ years of clinical practice",
  "Physician-owned and operated practice",
  "BioTE-certified hormone optimization provider",
  "Focus on integrative, whole-person care",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="grid-pattern border-b border-border bg-card">
        <div className="container-page section-y !pb-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl shadow-elevated ring-1 ring-border">
                <Image
                  src="/DrGari1.png"
                  alt={`Dr. Gary Adams, MD, ${clinic.provider.credentials} physician at ${clinic.name}, in white coat with clipboard`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />

                {/* Secondary headshot accent */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/60 bg-background/85 py-2 pr-4 pl-2 shadow-card backdrop-blur-xl">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-xl ring-1 ring-border sm:size-14">
                    <Image
                      src="/DrGari2.png"
                      alt="Dr. Gary Adams, MD, smiling headshot"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="leading-tight">
                    <p className="font-display text-sm font-semibold text-primary">
                      {clinic.provider.name}, {clinic.provider.credentials}
                    </p>
                    <p className="text-xs text-muted-foreground">{clinic.name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
                Meet your physician
              </p>
              <h1 className="text-balance font-display text-4xl font-semibold text-primary sm:text-5xl">
                {clinic.provider.name}, {clinic.provider.credentials}
              </h1>
              <p className="mt-4 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
                {clinic.provider.bio}
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {credentials.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-sm text-foreground">
                    <Award className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button size="lg" className="h-12 px-6 text-base" asChild>
                  <Link href="/assessment">
                    Start Your Assessment
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our philosophy"
            title="Physician-owned integrative care, built on measurement"
            description="THRIVE Longevity Center was founded on a simple idea: combine the rigor of traditional medicine with a root-cause, whole-person approach — and let your data guide every decision."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {philosophyPoints.map((point) => (
              <Card key={point.title} className="h-full rounded-2xl border-0 shadow-card ring-1 ring-border">
                <CardContent className="flex h-full flex-col gap-3 px-6 py-2">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <point.icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-primary">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-y bg-secondary/40">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">Our story</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              After more than three decades practicing medicine, Dr. Gary Adams saw a recurring pattern:
              patients who were told their labs were &ldquo;normal&rdquo; while continuing to feel
              fatigued, foggy, or simply not like themselves. THRIVE Longevity Center was founded to
              close that gap — combining the diagnostic rigor of conventional medicine with an integrative,
              root-cause approach to how patients actually feel day to day.
            </p>
            <p>
              Located at {clinic.address.full}, our practice is physician-owned, which means every
              treatment plan reflects Dr. Adams&rsquo; clinical judgment — not a corporate protocol. From
              bioidentical hormone therapy to medically supervised weight loss and regenerative
              therapies, our approach starts the same way every time: comprehensive labs, a real
              conversation, and a plan built around your specific goals.
            </p>
            <p>
              Whether you&rsquo;re navigating a major life transition like menopause, looking to optimize
              energy and performance, working toward a healthier weight, or simply want a physician
              partner focused on long-term healthspan, our team is here to help you get there — measured
              every step of the way.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
