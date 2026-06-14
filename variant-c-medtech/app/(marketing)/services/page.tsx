import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Star } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives";
import { serviceCategories, metabolicTesting } from "@/lib/data/standalone-services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Physician-led longevity, metabolic, hormone, cardiovascular, IV, aesthetic, and sleep/brain services at THRIVE Longevity Center with Dr. Gary Adams in Athens, AL.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Intro */}
      <section className="grid-pattern relative overflow-hidden border-b border-border bg-card">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-soft/50 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="container-page section-y relative !pb-12">
          <SectionHeading
            eyebrow="Our services"
            title="A full menu of care, organized around your goals"
            description="From longevity consults and advanced testing to metabolism, hormones, IV therapy, aesthetics, and sleep & brain health — physician-led by Dr. Gary Adams, with no referrals needed."
          />
        </div>
      </section>

      {/* Metabolic Intelligence Testing (priced) */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground shadow-elevated">
              <div className="grid gap-8 p-8 lg:grid-cols-[1fr_1.1fr] lg:p-12">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                    {metabolicTesting.eyebrow}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                    {metabolicTesting.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80">
                    {metabolicTesting.description}
                  </p>

                  <div className="mt-8">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">Bundles</p>
                    <ul className="mt-3 space-y-2">
                      {metabolicTesting.packages.map((p) => (
                        <li
                          key={p.name}
                          className={
                            "flex items-center justify-between gap-4 rounded-xl px-4 py-2.5 text-sm " +
                            (p.best
                              ? "bg-accent font-semibold text-accent-foreground"
                              : "bg-white/5 text-primary-foreground/90")
                          }
                        >
                          <span className="flex items-center gap-2">
                            {p.best && <Star className="size-3.5" aria-hidden="true" />}
                            {p.name}
                          </span>
                          <span className="shrink-0 font-display font-semibold">{p.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:content-start">
                  {metabolicTesting.tests.map((t) => (
                    <div key={t.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-sm font-semibold">{t.name}</h3>
                        <span className="shrink-0 font-display text-lg font-semibold text-accent">{t.price}</span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-primary-foreground/70">{t.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categorized service menu */}
      <section className="section-y bg-secondary/30 pt-0">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Standalone services"
              title="Explore care by category"
              description="Every service can be booked on its own or built into a Sentinel longevity program. Pricing for à-la-carte testing and aesthetics is shown; consultations are quoted at your visit."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-6 lg:grid-cols-2" stagger={0.06}>
            {serviceCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <StaggerItem key={cat.id} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="font-display text-xl font-semibold text-primary">{cat.name}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cat.blurb}</p>

                    <ul className="mt-5 space-y-1 border-t border-border pt-5">
                      {cat.services.map((svc) => {
                        const inner = (
                          <>
                            <span className="flex items-start gap-2.5">
                              <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                              <span>{svc.name}</span>
                            </span>
                            {svc.price ? (
                              <span className="shrink-0 text-right">
                                <span className="font-display text-sm font-semibold text-primary">{svc.price}</span>
                                {svc.priceNote && (
                                  <span className="block text-xs text-muted-foreground">{svc.priceNote}</span>
                                )}
                              </span>
                            ) : svc.href ? (
                              <ArrowUpRight
                                className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover/svc:text-primary"
                                aria-hidden="true"
                              />
                            ) : null}
                          </>
                        );
                        return (
                          <li key={svc.name}>
                            {svc.href ? (
                              <Link
                                href={svc.href}
                                className="group/svc flex items-start justify-between gap-3 rounded-lg px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                              >
                                {inner}
                              </Link>
                            ) : (
                              <div className="flex items-start justify-between gap-3 px-2 py-1.5 text-sm text-foreground">
                                {inner}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Addiction medicine — offered separately by Crossroads */}
          <Reveal className="mt-10">
            <Link
              href="/addiction-medicine"
              className="group flex flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-card p-5 text-sm shadow-card transition-shadow hover:shadow-elevated sm:flex-row sm:items-center"
            >
              <span className="text-muted-foreground">
                Looking for <span className="font-semibold text-foreground">addiction medicine &amp; MAT</span>? It&rsquo;s
                offered separately by <span className="font-semibold text-foreground">Crossroads Medical Wellness</span>.
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-primary">
                View addiction medicine
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
