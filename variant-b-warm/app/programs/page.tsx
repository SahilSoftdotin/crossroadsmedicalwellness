import type { Metadata } from "next";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ProgramCard } from "@/components/marketing/program-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore Crossroads Medical Wellness's themed programs: Men's Hormone Health, Women's Health, Medical Weight Loss, and Longevity & Anti-Aging.",
};

export default function ProgramsPage() {
  return (
    <>
      <section className="section-py">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Programs"
            title="Coordinated plans for life's biggest health moments"
            description="Rather than piecing together individual visits, our programs bundle the right combination of labs, therapies, and follow-up into one physician-guided plan built around your goals."
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>
      <CtaSection
        title="Find the program that fits your goals"
        description="Take our free health assessment — it takes about 5 minutes and helps us recommend the right starting point for you."
      />
    </>
  );
}
