import type { Metadata } from "next";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Crossroads Medical Wellness's integrative care lines: bioidentical hormone therapy, medical weight loss, aesthetics, regenerative medicine, and addiction therapy.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="grid-pattern border-b border-border bg-card">
        <div className="container-page section-y !pb-12">
          <SectionHeading
            eyebrow="Our services"
            title="Five integrative care lines, all rooted in your labs"
            description="Each service begins with comprehensive testing and a real conversation with Dr. Adams, so your plan is built around your body — not a generic protocol."
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
