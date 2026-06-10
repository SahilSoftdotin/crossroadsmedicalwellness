"use client";

import Link from "next/link";
import { Wallet, BadgeCheck, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives";

const options = [
  {
    icon: Wallet,
    title: "HSA / FSA eligible",
    body: "Many of our services qualify for pre-tax HSA and FSA dollars — a smart way to invest in your health.",
  },
  {
    icon: BadgeCheck,
    title: "Membership plans",
    body: "Predictable monthly membership options bundle labs, visits, and ongoing optimization into one plan.",
  },
  {
    icon: CreditCard,
    title: "Flexible financing",
    body: "Spread the cost of your care over time with flexible financing options — ask our team for details.",
  },
];

export function InsuranceFinancing() {
  return (
    <section className="section-y bg-secondary/40">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Insurance & financing"
            title="Care that fits your life — and your budget"
            description="We keep payment simple and transparent, so cost never stands between you and feeling your best."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-3" stagger={0.1}>
          {options.map((o) => (
            <StaggerItem
              key={o.title}
              className="flex flex-col gap-4 rounded-[26px] border border-white/60 bg-background/70 p-7 shadow-card backdrop-blur-xl"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-primary">
                <o.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-primary">{o.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{o.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 text-center" delay={0.1}>
          <Button size="lg" variant="outline" className="h-12 px-7 text-base" asChild>
            <Link href="/contact">
              Verify coverage & learn more
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
