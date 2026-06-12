import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { CtaSection } from "@/components/marketing/cta-section";
import { getIcon } from "@/components/marketing/icon-map";
import { getServiceBySlug, services } from "@/lib/data/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = getIcon(service.icon);

  return (
    <>
      {/* Hero — with a service-specific background image */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        {/* Image representing this service */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <Image
            src={service.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Readability scrim: solid card on the left (text) fading to clear over the image (right) */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(100deg, var(--card) 0%, var(--card) 34%, color-mix(in srgb, var(--card) 70%, transparent) 52%, color-mix(in srgb, var(--card) 18%, transparent) 74%, transparent 100%)",
          }}
        />
        {/* Top fade keeps the navbar legible across the full width */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[var(--card)] to-transparent"
          aria-hidden="true"
        />

        <div className="container-page section-y relative z-[2] !pb-12">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/services" className="hover:text-primary">Services</Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span className="text-foreground">{service.shortName}</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-elevated">
                <Icon className="size-7" aria-hidden="true" />
              </div>
              <h1 className="text-balance font-display text-4xl font-semibold text-primary sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-4 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
                {service.summary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 px-6 text-base" asChild>
                  <Link href="/assessment">
                    Start Your Assessment
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 bg-card/70 px-6 text-base backdrop-blur-sm" asChild>
                  <Link href="/contact">Ask a Question</Link>
                </Button>
              </div>
            </div>
            <Card className="rounded-2xl border-0 bg-card/70 shadow-elevated ring-1 ring-border backdrop-blur-xl">
              <CardContent className="px-6 py-2 text-center">
                <Badge className="bg-accent-soft text-primary">At a glance</Badge>
                <p className="mt-4 font-display text-4xl font-semibold text-primary">{service.heroStat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{service.heroStat.label}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">What it is</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{service.whatItIs}</p>

            <h2 className="mt-12 font-display text-2xl font-semibold text-primary sm:text-3xl">Who it&rsquo;s for</h2>
            <ul className="mt-4 space-y-3">
              {service.whoItsFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-secondary/60 p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-primary">Key benefits</h3>
            <ul className="mt-4 space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="section-y bg-secondary/40">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">What to expect</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.whatToExpect.map((step, index) => (
              <Card key={step.title} className="h-full rounded-2xl border-0 shadow-card ring-1 ring-border">
                <CardContent className="flex h-full flex-col gap-3 px-6 py-2">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="font-display text-base font-semibold text-primary">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
            Frequently asked questions
          </h2>
          <Accordion className="mt-6 w-full">
            {service.faqs.map((faq, i) => (
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
        title={`Curious if ${service.shortName.toLowerCase()} is right for you?`}
        description="Take our short health assessment, or reach out directly — our team will follow up to schedule your consultation with Dr. Adams."
      />
    </>
  );
}
