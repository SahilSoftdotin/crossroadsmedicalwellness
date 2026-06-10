import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ProgramCard } from "@/components/marketing/program-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Goal-built integrative programs: Men's Hormone Health, Women's Health, Medical Weight Loss, and Longevity & Anti-Aging — bundled testing, treatment and ongoing care.",
};

export default function ProgramsPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--cream-50)]">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Programs</span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
              Structured programs built around your goal
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--muted-foreground)]">
              Programs bundle comprehensive testing, physician-designed treatment and ongoing care
              into a single, outcome-focused path — so nothing is left to guesswork.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Choose your path"
            title="Four flagship programs"
            description="Each is physician-led, lab-driven and tailored to you."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
