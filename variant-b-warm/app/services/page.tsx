import type { Metadata } from "next";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Crossroads Medical Wellness's integrative service lines: bioidentical hormone therapy, medical weight loss, aesthetics, regenerative medicine, and addiction therapy.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="section-py">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Services"
            title="Five service lines, one integrative philosophy"
            description="Every service at Crossroads begins with understanding you — your history, your goals, and (when relevant) your labs. Explore each service to learn what to expect."
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
      <CtaSection
        title="Not sure which service is right for you?"
        description="Take our free health assessment and we'll help point you in the right direction — no pressure, no obligation."
      />
    </>
  );
}
