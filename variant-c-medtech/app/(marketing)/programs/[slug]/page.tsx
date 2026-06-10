import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { CtaSection } from "@/components/marketing/cta-section";
import { getIcon } from "@/components/marketing/icon-map";
import { getProgramBySlug, programs } from "@/lib/data/programs";
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

  const Icon = getIcon(program.icon);
  const relatedServices = program.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      {/* Hero */}
      <section className="grid-pattern relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[color-mix(in_oklch,var(--primary),var(--accent)_15%)]" />
        <div className="container-page relative section-y !pb-12">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-primary-foreground/70">
            <Link href="/programs" className="hover:text-accent">Programs</Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span className="text-primary-foreground">{program.name}</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Icon className="size-7" aria-hidden="true" />
              </div>
              <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">{program.name}</h1>
              <p className="mt-3 text-balance text-lg font-medium text-accent">{program.tagline}</p>
              <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-primary-foreground/80">
                {program.summary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90" asChild>
                  <Link href="/assessment">
                    Start Your Assessment
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-primary-foreground/30 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  asChild
                >
                  <Link href="/contact">Ask a Question</Link>
                </Button>
              </div>
            </div>
            <Card className="rounded-2xl border-0 bg-background shadow-elevated">
              <CardContent className="px-6 py-2 text-center">
                <Badge className="bg-accent-soft text-primary">At a glance</Badge>
                <p className="mt-4 font-display text-3xl font-semibold text-primary">{program.heroStat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{program.heroStat.label}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ideal for + Includes */}
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <Users className="size-5 text-accent" aria-hidden="true" />
              <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">Ideal for</h2>
            </div>
            <ul className="mt-5 space-y-3">
              {program.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">What&rsquo;s included</h2>
            <div className="mt-5 space-y-4">
              {program.includes.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-display text-base font-semibold text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-y bg-secondary/40">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">Your timeline</h2>
          <div className="relative mt-10 space-y-8 border-l-2 border-accent/40 pl-8 sm:pl-10">
            {program.timeline.map((step) => (
              <div key={step.phase} className="relative">
                <span className="absolute top-1 -left-[2.55rem] flex size-5 items-center justify-center rounded-full bg-accent ring-4 ring-secondary/40 sm:-left-[3.05rem]" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-widest text-accent uppercase">{step.phase}</p>
                <p className="mt-1 text-base text-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="section-y">
          <div className="container-page">
            <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">Related services</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {relatedServices.map((service) => {
                const ServiceIcon = getIcon(service.icon);
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elevated"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary group-hover:bg-accent group-hover:text-accent-foreground">
                      <ServiceIcon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-primary">{service.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{service.summary}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-y bg-secondary/40">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
            Frequently asked questions
          </h2>
          <Accordion className="mt-6 w-full">
            {program.faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-display text-base font-semibold text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CtaSection
        title={`Ready to start ${program.name}?`}
        description="Take our short health assessment, or reach out directly — our team will follow up to schedule your consultation with Dr. Adams."
      />
    </>
  );
}
