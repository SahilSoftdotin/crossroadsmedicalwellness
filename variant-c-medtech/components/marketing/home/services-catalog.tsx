"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/components/marketing/icon-map";
import {
  Reveal,
  Stagger,
  StaggerItem,
  motion,
  useReducedMotion,
} from "@/components/motion/motion-primitives";
import { cn } from "@/lib/utils";
import {
  services,
  serviceCategoryOrder,
  serviceCategoryMeta,
  type ServiceCategory,
} from "@/lib/data/services";

const FILTERS: ("All" | ServiceCategory)[] = ["All", ...serviceCategoryOrder];

export function ServicesCatalog() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<"All" | ServiceCategory>("All");

  const visible = services.filter((s) => active === "All" || s.category === active);

  return (
    <div>
      {/* Category tabs */}
      <Reveal>
        <div
          className="flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter services by category"
        >
          {FILTERS.map((f) => {
            const selected = active === f;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(f)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {f === "All" ? "All services" : serviceCategoryMeta[f].label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Stagger
        key={active}
        className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        stagger={0.08}
      >
        {visible.map((service, i) => {
          const Icon = getIcon(service.icon);
          // First card in each filtered view spans wider for bento rhythm.
          const featuredLayout = i === 0 && visible.length > 2;
          return (
            <StaggerItem
              key={service.slug}
              className={cn(featuredLayout && "md:col-span-2 lg:col-span-1")}
            >
              <motion.div
                whileHover={reduce ? undefined : { y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="group h-full"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="flex h-full flex-col overflow-hidden rounded-[28px] bg-card shadow-card ring-1 ring-border transition-shadow duration-300 hover:shadow-elevated focus-visible:outline-none"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/5 to-transparent" />
                    <span className="absolute left-5 top-5 flex size-11 items-center justify-center rounded-2xl bg-background/85 text-primary shadow-card backdrop-blur-md">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="absolute bottom-4 left-5 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                      {serviceCategoryMeta[service.category].label}
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
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
