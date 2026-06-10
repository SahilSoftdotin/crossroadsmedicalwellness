"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, GraduationCap, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, motion, useReducedMotion } from "@/components/motion/motion-primitives";
import { useScroll, useTransform } from "framer-motion";
import { clinic } from "@/lib/data/clinic";

const credentials = [
  { icon: Award, title: "30+ years", sub: "Clinical experience" },
  { icon: GraduationCap, title: "MD", sub: "Physician-led care" },
  { icon: HeartPulse, title: "Integrative", sub: "Root-cause approach" },
];

export function MeetTheDoctor() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  return (
    <section className="section-y overflow-hidden">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Portrait */}
        <div className="relative" ref={ref}>
          <motion.div
            style={{ y }}
            className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[32px] shadow-elevated ring-1 ring-border"
          >
            <Image
              src="/DrGari1.png"
              alt={`Dr. Gary Adams, MD, ${clinic.provider.credentials} physician at ${clinic.name}, in white coat with clipboard`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />

            {/* Secondary headshot accent */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={reduce ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="absolute right-4 top-4 size-16 overflow-hidden rounded-2xl border-2 border-white/80 shadow-card ring-1 ring-border sm:size-20"
            >
              <Image
                src="/DrGari2.png"
                alt="Dr. Gary Adams, MD, smiling headshot"
                fill
                sizes="80px"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Floating credential cards */}
          <div className="mt-6 grid grid-cols-3 gap-3 sm:absolute sm:-bottom-7 sm:left-1/2 sm:mt-0 sm:w-[110%] sm:-translate-x-1/2 sm:grid-cols-3">
            {credentials.map((c, i) => (
              <motion.div
                key={c.title}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.1 }}
                className="flex flex-col items-center gap-1 rounded-2xl border border-white/60 bg-background/85 px-3 py-4 text-center shadow-card backdrop-blur-xl"
              >
                <c.icon className="size-5 text-accent" aria-hidden="true" />
                <span className="font-display text-base font-semibold text-primary">{c.title}</span>
                <span className="text-[0.7rem] leading-tight text-muted-foreground">{c.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <Reveal delay={0.1}>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Meet your physician
          </p>
          <h2 className="text-balance font-display text-3xl font-semibold text-primary sm:text-4xl">
            {clinic.provider.name}, {clinic.provider.credentials}
          </h2>
          <p className="mt-5 text-balance text-lg leading-relaxed text-muted-foreground">
            {clinic.provider.bio}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            At Crossroads Medical Wellness, Dr. Adams personally guides every plan — reviewing your
            labs, listening to your goals, and building complete integrative care around you, all
            under one roof.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-7 text-base" asChild>
              <Link href="/about">
                More about Dr. Adams
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-7 text-base" asChild>
              <Link href="/assessment">Start your assessment</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
