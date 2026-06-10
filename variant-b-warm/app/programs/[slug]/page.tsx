import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";
import { DynamicIcon } from "@/components/marketing/dynamic-icon";
import { programs, getProgramBySlug } from "@/lib/data/programs";
import { getServiceBySlug } from "@/lib/data/services";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};
  return {
    title: program.name,
    description: program.summary,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const relatedServices = program.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage to-sage-dark text-white">
        <div
          className="pointer-events-none absolute -top-20 -right-24 h-72 w-72 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <div className="container-wide relative py-16 sm:py-20">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All programs
          </Link>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <DynamicIcon name={program.icon} className="h-7 w-7" />
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                Program
              </p>
              <h1 className="mt-2 text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                {program.name}
              </h1>
              <p className="mt-4 text-balance text-lg font-semibold text-white/90">
                {program.tagline}
              </p>
              <p className="mt-4 text-balance text-base leading-relaxed text-white/80 sm:text-lg">
                {program.summary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-cream text-terracotta-dark shadow-soft-md hover:bg-white"
                >
                  <Link href="/assessment">
                    Start Your Assessment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10"
                >
                  <Link href="/contact">Ask a Question</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal for */}
      <section className="section-py">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Ideal For" title="Is this program right for you?" />
          <ul className="space-y-4">
            {program.idealFor.map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-soft">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-light text-sage-dark">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-brown sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What's included */}
      <section className="section-py bg-cream-soft">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What's Included"
            title="A coordinated, physician-guided plan"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {program.includes.map((item, i) => (
              <div key={item.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <span className="font-display text-3xl font-extrabold text-terracotta-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-brown">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-soft">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section-py">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What to Hope For"
            title="Common outcomes patients experience"
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {program.outcomes.map((outcome) => (
              <div key={outcome} className="flex items-center gap-3 rounded-2xl bg-card px-5 py-4 shadow-soft">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-brown sm:text-base">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="section-py bg-cream-soft">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Related Services"
              title="Services that power this program"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay text-terracotta-dark transition-colors group-hover:bg-terracotta group-hover:text-primary-foreground">
                    <DynamicIcon name={service.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-brown">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown-soft">
                    {service.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        title={`Ready to get started with ${program.name}?`}
        description="Take our free health assessment so we can recommend the best path forward — no obligation."
      />
    </>
  );
}
