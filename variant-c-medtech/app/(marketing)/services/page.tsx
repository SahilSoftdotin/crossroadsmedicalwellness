import type { Metadata } from "next";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServicesCatalog } from "@/components/marketing/home/services-catalog";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Complete integrative care under one roof: bioidentical hormone therapy, medical weight loss, aesthetics, regenerative medicine, and addiction therapy with Dr. Gary Adams in Athens, AL.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="grid-pattern relative overflow-hidden border-b border-border bg-card">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-soft/50 via-transparent to-transparent" aria-hidden="true" />
        <div className="container-page section-y relative !pb-12">
          <SectionHeading
            eyebrow="Our services"
            title="Complete integrative care, under one roof"
            description="Five care lines, one physician, no referrals. Each service begins with comprehensive testing and a real conversation with Dr. Adams, so your plan is built around your body — not a generic protocol."
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <ServicesCatalog />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
