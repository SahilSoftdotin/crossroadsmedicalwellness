import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives";
import { sentinelTiers } from "@/lib/data/sentinel";

export function ProgramsPricing() {
  return (
    <section className="section-y bg-secondary/30">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Programs & Pricing"
            title="The Sentinel Longevity framework"
            description="Four physician-led evaluation tiers — from an introductory Baseline assessment to comprehensive, executive-level longevity optimization. Each is built around your Sentinel Longevity Score."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch" stagger={0.08}>
          {sentinelTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <StaggerItem key={tier.id} className="h-full">
                <Link
                  href={`/pricing#${tier.id}`}
                  className={
                    "group relative flex h-full flex-col rounded-3xl border bg-card p-6 shadow-card transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 " +
                    (tier.flagship
                      ? "border-accent/60 ring-2 ring-accent/40 lg:-translate-y-2"
                      : "border-border ring-1 ring-border hover:-translate-y-1")
                  }
                >
                  {tier.badge && (
                    <span
                      className={
                        "absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold " +
                        (tier.flagship ? "bg-accent text-accent-foreground" : "bg-accent-soft text-primary")
                      }
                    >
                      {tier.flagship && <Star className="size-3" aria-hidden="true" />}
                      {tier.badge}
                    </span>
                  )}
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-primary">{tier.shortName}</h3>
                  <p className="mt-2 font-display text-3xl font-semibold text-primary">{tier.priceDisplay}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{tier.positioning}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    View details
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-10 flex flex-col items-center gap-3">
          <Button asChild size="lg" className="h-12 px-7 text-base">
            <Link href="/pricing">
              See full Programs &amp; Pricing
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="size-4 text-accent" aria-hidden="true" />
            Diagnostic &amp; strategic programs — treatments are offered separately
          </p>
        </Reveal>
      </div>
    </section>
  );
}
