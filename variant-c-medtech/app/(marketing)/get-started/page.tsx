import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ClipboardList,
  Stethoscope,
  FlaskConical,
  LineChart,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ProgramCard } from "@/components/marketing/program-card";
import { programs } from "@/lib/data/programs";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Start your journey with THRIVE Longevity Center — take our health assessment and our team will follow up to schedule your consultation with Dr. Adams.",
};

const steps = [
  {
    icon: ClipboardList,
    title: "Take the assessment",
    description: "Tell us about your goals and a few health basics — about 5 minutes.",
  },
  {
    icon: Stethoscope,
    title: "We follow up",
    description: "Our team reaches out by phone, text, or email to schedule your consultation.",
  },
  {
    icon: FlaskConical,
    title: "Meet with Dr. Adams",
    description: "A real conversation and lab work to build your personalized protocol.",
  },
  {
    icon: LineChart,
    title: "Track your progress",
    description: "Once you're a patient, follow your labs and protocol in the patient portal.",
  },
];

export default function GetStartedPage() {
  return (
    <>
      <section className="grid-pattern relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/60 via-transparent to-transparent" />
        <div className="container-page relative section-y !pb-12 text-center">
          <Badge className="mx-auto mb-5 bg-accent-soft text-primary">
            <ShieldCheck data-icon="inline-start" className="size-3.5" />
            Physician-owned · Athens, AL
          </Badge>
          <h1 className="mx-auto max-w-2xl text-balance font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Ready to get started? Here&rsquo;s how it works.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every patient at THRIVE starts with a short health assessment. From there, our
            team follows up to schedule a real consultation with Dr. Adams — no online
            scheduling, no automated prescriptions, just integrative care built around your
            numbers.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-12 w-full px-6 text-base sm:w-auto" asChild>
              <Link href="/assessment">
                Start Your Health Assessment
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 w-full px-6 text-base sm:w-auto" asChild>
              <a href={clinic.phoneHref}>
                <Phone data-icon="inline-start" />
                Call {clinic.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="The process"
            title="From first click to ongoing care"
            description="A clear, physician-led path — designed so you always know what's next."
            align="center"
            className="mx-auto"
          />
          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div
              className="absolute top-7 right-0 left-0 hidden h-px bg-border lg:block"
              aria-hidden="true"
            />
            {steps.map((step, index) => (
              <div key={step.title} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-elevated">
                  <step.icon className="size-6" aria-hidden="true" />
                </div>
                <p className="mt-4 text-xs font-semibold tracking-widest text-accent uppercase">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-y bg-secondary/50">
        <div className="container-page">
          <SectionHeading
            eyebrow="Not sure where to start?"
            title="Browse our themed programs"
            description="If one of these sounds like you, mention it during your assessment — Dr. Adams will tailor your plan from there."
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-y">
        <div className="container-page">
          <div className="grid-pattern relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[color-mix(in_oklch,var(--primary),var(--accent)_18%)]" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance font-display text-3xl font-semibold text-primary-foreground sm:text-4xl">
                Your health assessment takes about 5 minutes.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-balance text-base text-primary-foreground/80 sm:text-lg">
                It&rsquo;s the first step toward a personalized, physician-led plan — and there&rsquo;s
                no obligation.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="h-12 w-full bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90 sm:w-auto" asChild>
                  <Link href="/assessment">
                    Start Your Assessment
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full border-primary-foreground/30 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                  asChild
                >
                  <Link href="/portal/login">Patient Portal Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
