"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  CalendarCheck,
  Users,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useReducedMotion } from "framer-motion";
import { HeroBackground } from "@/components/marketing/home/hero-background";
import { MagneticButton } from "@/components/motion/magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

const floatingCards = [
  {
    icon: Star,
    title: "4.9 rating",
    sub: "Loved by patients",
    className: "left-2 top-6 sm:-left-6",
    accent: true,
  },
  {
    icon: ShieldCheck,
    title: "Complete care, one roof",
    sub: "No referrals needed",
    className: "right-2 top-24 sm:-right-8",
  },
  {
    icon: CalendarCheck,
    title: "Same-week appointments",
    sub: "Start without the wait",
    className: "left-4 bottom-24 sm:-left-10",
  },
  {
    icon: Users,
    title: "Thousands optimized",
    sub: "Across Athens, AL",
    className: "right-6 bottom-8 sm:-right-4",
  },
];

export function Hero() {
  const reduce = useReducedMotion();

  const floatAnim = (i: number) =>
    reduce
      ? {}
      : {
          y: [0, -10, 0],
          transition: {
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <section className="relative overflow-hidden bg-card">
      {/* Healthspan-style flowing aurora background */}
      <HeroBackground />

      <div className="container-page relative grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Badge className="mb-6 bg-accent-soft text-primary">
            <ShieldCheck data-icon="inline-start" className="size-3.5" />
            Physician-owned · Athens, AL
          </Badge>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-[4.1rem]">
            Complete integrative care,{" "}
            <span className="text-shimmer">under one roof</span>.
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
            Crossroads Medical Wellness pairs Dr. Gary Adams&rsquo; 30+ years of clinical
            experience with lab-driven, root-cause care — hormone optimization, medical
            weight loss, regenerative therapies and more, with one care team and no referrals.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton>
              <Button size="lg" className="btn-sheen h-13 px-7 text-base shadow-glow" asChild>
                <Link href="/assessment">
                  Start your assessment
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button size="lg" variant="outline" className="h-13 px-7 text-base" asChild>
                <Link href="/services">Explore services</Link>
              </Button>
            </MagneticButton>
          </div>
          <ul className="mt-9 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {["Lab-guided protocols", "BioTE certified", "GLP-1 medical weight loss"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Visual: sample dashboard with floating trust cards */}
        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={reduce ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <div className="relative mx-auto max-w-md rounded-[28px] border border-white/60 bg-background/70 p-6 shadow-elevated backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Sample patient dashboard
              </p>
              <Badge variant="secondary">Live preview</Badge>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                <p className="text-xs font-medium text-primary-foreground/70">Total Testosterone</p>
                <p className="mt-2 font-display text-3xl font-semibold">
                  705 <span className="text-base font-normal text-primary-foreground/60">ng/dL</span>
                </p>
                <p className="mt-1 text-xs text-accent">↑ 126% since baseline</p>
              </div>
              <div className="rounded-2xl bg-secondary p-5">
                <p className="text-xs font-medium text-muted-foreground">Body Weight</p>
                <p className="mt-2 font-display text-3xl font-semibold text-primary">
                  197 <span className="text-base font-normal text-muted-foreground">lbs</span>
                </p>
                <p className="mt-1 text-xs text-success">↓ 27 lbs since start</p>
              </div>
              <div className="rounded-2xl bg-secondary p-5">
                <p className="text-xs font-medium text-muted-foreground">hs-CRP</p>
                <p className="mt-2 font-display text-3xl font-semibold text-primary">
                  0.9 <span className="text-base font-normal text-muted-foreground">mg/L</span>
                </p>
                <p className="mt-1 text-xs text-success">In optimal range</p>
              </div>
              <div className="rounded-2xl bg-secondary p-5">
                <p className="text-xs font-medium text-muted-foreground">Vitamin D</p>
                <p className="mt-2 font-display text-3xl font-semibold text-primary">
                  58 <span className="text-base font-normal text-muted-foreground">ng/mL</span>
                </p>
                <p className="mt-1 text-xs text-success">In optimal range</p>
              </div>
            </div>
            <p className="mt-5 text-center text-xs text-muted-foreground">
              A glimpse of the patient portal — labs, protocol, and progress in one place.
            </p>
          </div>

          {/* Floating trust cards */}
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`pointer-events-none absolute hidden items-center gap-2.5 rounded-2xl border border-white/60 bg-background/85 px-4 py-3 shadow-elevated backdrop-blur-xl md:flex ${card.className}`}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={
                reduce
                  ? {}
                  : { opacity: 1, y: 0, ...floatAnim(i) }
              }
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 + i * 0.09 }}
            >
              <span
                className={`flex size-9 items-center justify-center rounded-xl ${
                  card.accent
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary-soft text-primary"
                }`}
              >
                <card.icon className="size-4.5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-primary">{card.title}</span>
                <span className="block text-xs text-muted-foreground">{card.sub}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
