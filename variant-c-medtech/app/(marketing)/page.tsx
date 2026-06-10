import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TrustBar } from "@/components/marketing/trust-bar";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ServiceCard } from "@/components/marketing/service-card";
import { ProgramCard } from "@/components/marketing/program-card";
import { TestimonialsCarousel } from "@/components/marketing/testimonials-carousel";
import { CtaSection } from "@/components/marketing/cta-section";
import { services } from "@/lib/data/services";
import { programs } from "@/lib/data/programs";
import { testimonials } from "@/lib/data/testimonials";
import { faqCategories } from "@/lib/data/faqs";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Crossroads Medical Wellness | Integrative Care in Athens, AL",
  description:
    "Physician-owned integrative care with Dr. Gary Adams. Bioidentical hormone therapy, medical weight loss, regenerative medicine, aesthetics, and addiction therapy in Athens, AL.",
};

const homeFaqs = faqCategories[0].items.slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="grid-pattern relative overflow-hidden bg-card">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/60 via-transparent to-transparent" />
        <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="animate-fade-up">
            <Badge className="mb-5 bg-accent-soft text-primary">
              <ShieldCheck data-icon="inline-start" className="size-3.5" />
              Physician-owned · Athens, AL
            </Badge>
            <h1 className="text-balance font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Integrative care, measured by your numbers.
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
              Crossroads Medical Wellness pairs Dr. Gary Adams&rsquo; 30+ years of clinical
              experience with lab-driven, root-cause care — hormone optimization, medical
              weight loss, regenerative therapies, and more.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 px-6 text-base" asChild>
                <Link href="/assessment">
                  Start Your Health Assessment
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 text-base" asChild>
                <a href={clinic.phoneHref}>
                  <Phone data-icon="inline-start" />
                  {clinic.phone}
                </a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {["Lab-guided protocols", "BioTE certified", "GLP-1 medical weight loss"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-background p-6 shadow-elevated sm:p-8">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Sample Patient Dashboard
                </p>
                <Badge variant="secondary">Live preview</Badge>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                  <p className="text-xs font-medium text-primary-foreground/70">Total Testosterone</p>
                  <p className="mt-2 font-display text-3xl font-semibold">705 <span className="text-base font-normal text-primary-foreground/60">ng/dL</span></p>
                  <p className="mt-1 text-xs text-accent">↑ 126% since baseline</p>
                </div>
                <div className="rounded-2xl bg-secondary p-5">
                  <p className="text-xs font-medium text-muted-foreground">Body Weight</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-primary">197 <span className="text-base font-normal text-muted-foreground">lbs</span></p>
                  <p className="mt-1 text-xs text-success">↓ 27 lbs since start</p>
                </div>
                <div className="rounded-2xl bg-secondary p-5">
                  <p className="text-xs font-medium text-muted-foreground">hs-CRP</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-primary">0.9 <span className="text-base font-normal text-muted-foreground">mg/L</span></p>
                  <p className="mt-1 text-xs text-success">In optimal range</p>
                </div>
                <div className="rounded-2xl bg-secondary p-5">
                  <p className="text-xs font-medium text-muted-foreground">Vitamin D</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-primary">58 <span className="text-base font-normal text-muted-foreground">ng/mL</span></p>
                  <p className="mt-1 text-xs text-success">In optimal range</p>
                </div>
              </div>
              <p className="mt-5 text-center text-xs text-muted-foreground">
                A glimpse of the patient portal — labs, protocol, and progress in one place.
              </p>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden size-28 rounded-2xl bg-accent/20 blur-2xl sm:block" aria-hidden="true" />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Services overview */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we treat"
            title="Five focused care lines, one integrative team"
            description="Every service starts with comprehensive labs and a real conversation with Dr. Adams — not a one-size-fits-all prescription."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                View all services
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Featured programs */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Featured programs"
            title="Themed programs built around your goals"
            description="Rather than à-la-carte visits, our programs bundle the labs, treatment, and follow-up you need into one coordinated plan."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-y bg-secondary/50">
        <div className="container-page">
          <SectionHeading
            eyebrow="Patient stories"
            title="Real results, in patients' own words"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="Common questions"
            title="Answers before you book"
            description="Have a different question? Visit our full FAQ page or reach out directly — our team is happy to help."
          />
          <div>
            <Accordion className="w-full">
              {homeFaqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-display text-base font-semibold text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-6">
              <Button variant="link" className="px-0 text-primary" asChild>
                <Link href="/faq">
                  View all FAQs
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
