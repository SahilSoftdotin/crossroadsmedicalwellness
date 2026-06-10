import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBand } from "@/components/marketing/cta-band";
import { services, getService } from "@/lib/data/services";
import { clinic } from "@/lib/data/clinic";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.summary,
  };
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const tel = clinic.phone.replace(/[^\d]/g, "");

  return (
    <>
      {/* HERO */}
      <section className="border-b border-[var(--border)] bg-[var(--forest-900)] text-[var(--primary-foreground)]">
        <Container className="py-16 md:py-20">
          <Link
            href="/services"
            className="text-sm font-medium text-[var(--brass-400)] hover:text-[var(--brass-200)]"
          >
            ← All services
          </Link>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="grid size-14 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-700)] text-[var(--brass-400)]">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-5xl">
                {service.name}
              </h1>
              <p className="mt-3 text-lg font-medium text-[var(--brass-400)]">{service.tagline}</p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--forest-200)]">
                {service.heroDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="accent" size="lg">
                  <Link href="/assessment">Start Assessment</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[var(--forest-600)] text-[var(--primary-foreground)] hover:bg-[var(--forest-700)]"
                >
                  <a href={`tel:${tel}`}>
                    <Phone className="size-4" /> {clinic.phone}
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-[var(--forest-700)] bg-[var(--forest-800)] p-7">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brass-400)]">
                <Users className="size-4" aria-hidden="true" /> Who it&apos;s for
              </h2>
              <ul className="mt-4 space-y-3">
                {service.whoItsFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--forest-200)]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--brass-400)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT IT IS */}
      <Section className="pb-0">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="eyebrow">What it is</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--foreground)]">
              The approach
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--muted-foreground)]">
              {service.whatItIs}
            </p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-sm)]">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brass-700)]">
              Benefits
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--success)]" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* WHAT TO EXPECT */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The process"
            title="What to expect"
            description="A clear, monitored path from first visit to ongoing optimization."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.whatToExpect.map((step, i) => (
              <li
                key={step.title}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)]"
              >
                <span className="font-display text-2xl font-semibold text-[var(--brass-500)]">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-base font-semibold text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* FAQ */}
      <section className="bg-[var(--cream-50)]">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Questions" title={`${service.shortName} FAQ`} />
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center">
              <Button asChild variant="link">
                <Link href="/services">
                  Explore other services <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
