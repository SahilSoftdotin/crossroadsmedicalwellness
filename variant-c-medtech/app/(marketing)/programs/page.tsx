import type { Metadata } from "next";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ProgramCard } from "@/components/marketing/program-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Themed care programs from THRIVE Longevity Center: Men's Hormone Health, Women's Health, Medical Weight Loss, and Longevity & Anti-Aging.",
};

export default function ProgramsPage() {
  return (
    <>
      <section className="grid-pattern border-b border-border bg-card">
        <div className="container-page section-y !pb-12">
          <SectionHeading
            eyebrow="Our programs"
            title="Coordinated programs built around your goals"
            description="Rather than booking individual visits, our programs bundle the labs, treatment, and follow-up you need into one plan — designed and overseen by Dr. Adams."
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
