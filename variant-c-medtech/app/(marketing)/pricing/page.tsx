import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";
import { Reveal } from "@/components/motion/motion-primitives";
import { SentinelPricing } from "@/components/marketing/sentinel-pricing";
import { includedVsOptional, sentinelModel } from "@/lib/data/sentinel";

export const metadata: Metadata = {
  title: "Sentinel Longevity Programs & Pricing",
  description:
    "The Sentinel Longevity framework — four physician-led evaluation tiers from an introductory Baseline assessment to comprehensive Executive optimization.",
};

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* Intro + tier accordion */}
      <section className="grid-pattern border-b border-border bg-card">
        <div className="container-page section-y">
          <SentinelPricing />
        </div>
      </section>

      {/* Included vs Optional */}
      <section className="section-y bg-secondary/40">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Transparency"
              title="What's included vs optional"
              description="A clear line between what every Sentinel program fee covers and what is optional or billed separately."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-accent/30 bg-card p-6 shadow-card sm:p-8">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
                  <Check className="size-5 text-accent" aria-hidden="true" />
                  Included within program fees
                </h3>
                <div className="mt-5">
                  <CheckList items={[...includedVsOptional.included]} />
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
                <h3 className="font-display text-lg font-semibold text-primary">
                  Optional / separately billed
                </h3>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {includedVsOptional.optional.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Business model */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <div className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground sm:p-12">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                The Sentinel model
              </p>
              <p className="mt-5 max-w-3xl text-balance text-xl font-medium leading-relaxed sm:text-2xl">
                {sentinelModel.statement}
              </p>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-primary-foreground/80">
                {sentinelModel.separateNote}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {sentinelModel.separateTreatments.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-primary-foreground/90"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection
        title="Not sure which Sentinel program fits?"
        description="Start with our short assessment or reach out directly — our team will help you choose the right tier and schedule your consultation with Dr. Adams."
      />
    </>
  );
}
