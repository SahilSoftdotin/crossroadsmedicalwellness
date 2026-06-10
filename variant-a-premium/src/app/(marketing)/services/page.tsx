import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ServiceCard } from "@/components/marketing/service-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Physician-led integrative services at Crossroads Medical Wellness: bioidentical hormone therapy, medical weight loss, aesthetics, regenerative and anti-aging therapies, and addiction therapy.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--cream-50)]">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Our services</span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
              Five focused service lines, one integrative philosophy
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--muted-foreground)]">
              Every service at Crossroads is physician-led and built on comprehensive testing. We
              treat the root cause — combining traditional medicine with functional, integrative
              care tailored to your physiology.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Explore"
            title="What we offer"
            description="Choose a service to learn what it is, who it's for, and what to expect."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
