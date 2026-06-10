import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";
import { DynamicIcon } from "@/components/marketing/dynamic-icon";
import { services, getServiceBySlug } from "@/lib/data/services";

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

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -right-32 h-80 w-80 rounded-full bg-sage-light/40 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wide relative py-16 sm:py-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown-soft hover:text-terracotta"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-clay text-terracotta-dark">
                <DynamicIcon name={service.icon} className="h-7 w-7" />
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl font-extrabold tracking-tight text-brown sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-4 text-balance text-lg font-semibold text-terracotta-dark">
                {service.tagline}
              </p>
              <p className="mt-4 text-balance text-base leading-relaxed text-brown-soft sm:text-lg">
                {service.summary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full shadow-soft-md">
                  <Link href="/assessment">
                    Start Your Assessment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-2">
                  <Link href="/contact">Ask a Question</Link>
                </Button>
              </div>
            </div>
            <div className="hidden shrink-0 lg:block">
              <div className="flex h-64 w-64 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-terracotta-light via-clay to-sage-light shadow-soft-lg">
                <DynamicIcon name={service.icon} className="h-24 w-24 text-white drop-shadow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="section-py">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="What It Is" title={`Understanding ${service.shortName}`} />
          <div className="space-y-4">
            {service.whatItIs.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-brown-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section-py bg-cream-soft">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Who It's For" title="Is this right for you?" />
          <ul className="space-y-4">
            {service.whoFor.map((item, i) => (
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

      {/* What to expect */}
      <section className="section-py">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What to Expect"
            title="Your journey, step by step"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.whatToExpect.map((step, i) => (
              <div key={step.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <span className="font-display text-3xl font-extrabold text-terracotta-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-brown">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-soft">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py bg-cream-soft">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Benefits"
            title="What patients commonly experience"
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 rounded-2xl bg-card px-5 py-4 shadow-soft">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta/15 text-terracotta-dark">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-brown sm:text-base">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py">
        <div className="container-wide">
          <SectionHeading
            eyebrow="FAQ"
            title={`Frequently asked questions about ${service.shortName.toLowerCase()}`}
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {service.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border bg-card px-5 shadow-soft"
                >
                  <AccordionTrigger className="text-left font-display text-base font-bold text-brown hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-brown-soft">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <CtaSection
        title={`Ready to learn more about ${service.shortName}?`}
        description="Take our free health assessment or reach out directly — our team is here to answer questions and help you get started."
      />
    </>
  );
}
