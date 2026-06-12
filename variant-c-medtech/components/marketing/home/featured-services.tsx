"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/marketing/section-heading";
import { getIcon } from "@/components/marketing/icon-map";
import { Reveal, Stagger, StaggerItem, motion, useReducedMotion } from "@/components/motion/motion-primitives";
import { featuredServices } from "@/lib/data/services";

export function FeaturedServices() {
  const reduce = useReducedMotion();

  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="What we treat"
            title="Care lines built around your goals"
            description="Every service starts with comprehensive labs and a real conversation with Dr. Adams — never a one-size-fits-all prescription."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {featuredServices.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <StaggerItem key={service.slug} className="h-full">
                <motion.div
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group h-full"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-[28px] bg-card shadow-card ring-1 ring-border transition-shadow duration-300 hover:shadow-elevated focus-visible:outline-none"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/5 to-transparent" />
                      <span className="absolute left-5 top-5 flex size-11 items-center justify-center rounded-2xl bg-background/95 text-primary shadow-card">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="absolute bottom-4 left-5 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-primary">
                        {service.heroStat.value} · {service.heroStat.label}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <h3 className="font-display text-xl font-semibold text-primary">
                        {service.name}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {service.summary}
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-[color-mix(in_oklch,var(--accent),black_42%)]">
                        Learn more
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-12 text-center" delay={0.1}>
          <Button size="lg" className="h-12 px-7 text-base" asChild>
            <Link href="/services">
              View more services
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
