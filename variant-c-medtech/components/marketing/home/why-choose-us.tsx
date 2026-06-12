"use client";

import {
  Home,
  FlaskConical,
  Stethoscope,
  Wallet,
  CreditCard,
  CalendarClock,
} from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  Reveal,
  Stagger,
  StaggerItem,
  motion,
  useReducedMotion,
} from "@/components/motion/motion-primitives";
import { TiltCard } from "@/components/motion/tilt-card";

const reasons = [
  {
    icon: Home,
    title: "Everything under one roof",
    body: "Hormones, weight, longevity, aesthetics and recovery — coordinated by one care team, with no referrals to chase.",
    wide: true,
  },
  {
    icon: FlaskConical,
    title: "Advanced testing & biomarkers",
    body: "Comprehensive labs map your baseline, so every protocol is guided by data — not guesswork.",
  },
  {
    icon: Stethoscope,
    title: "Experienced physician",
    body: "Dr. Gary Adams brings 30+ years of clinical experience and a root-cause approach to every plan.",
  },
  {
    icon: Wallet,
    title: "HSA / FSA friendly",
    body: "Many patients put pre-tax HSA and FSA dollars toward their care — our team helps you understand options.",
  },
  {
    icon: CreditCard,
    title: "Flexible membership & financing",
    body: "Membership plans and flexible financing make ongoing optimization predictable and accessible.",
  },
  {
    icon: CalendarClock,
    title: "Same-week appointments",
    body: "Skip the long waitlist — most new patients are seen within the same week they reach out.",
    wide: true,
  },
];

export function WhyChooseUs() {
  const reduce = useReducedMotion();

  return (
    <section className="section-y relative overflow-hidden bg-secondary/40">
      <div
        className="pointer-events-none absolute -right-32 top-1/4 size-96 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent),transparent_60%),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            eyebrow="Why THRIVE"
            title="A premium standard of integrative care"
            description="The reasons patients across Athens choose THRIVE Longevity Center for complete, physician-led care."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {reasons.map((r) => (
            <StaggerItem key={r.title} className={r.wide ? "lg:col-span-1" : ""}>
              <TiltCard className="h-full rounded-[26px]" max={6}>
                <motion.div
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col gap-4 rounded-[26px] border border-white/60 bg-background/70 p-7 shadow-card backdrop-blur-xl"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <r.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-primary">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                </motion.div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
