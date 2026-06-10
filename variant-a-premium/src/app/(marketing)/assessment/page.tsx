import type { Metadata } from "next";
import { ShieldCheck, Clock3, Stethoscope } from "lucide-react";
import { Container, Section } from "@/components/ui/section";
import { AssessmentWizard } from "@/components/marketing/assessment-wizard";

export const metadata: Metadata = {
  title: "Health Assessment",
  description:
    "Take the Crossroads Medical Wellness health assessment — a quick, guided intake that helps Dr. Adams understand your goals and recommend the right path. Lead capture only.",
};

const assurances = [
  { icon: Clock3, text: "Takes about 2 minutes" },
  { icon: Stethoscope, text: "Reviewed by Dr. Adams' team" },
  { icon: ShieldCheck, text: "No payment or commitment" },
];

export default function AssessmentPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-center">
          <span className="eyebrow">Health assessment</span>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
            Let&apos;s find the right path for you
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[var(--muted-foreground)]">
            Answer a few quick questions about your goals and health. Dr. Adams&apos; team will use
            your responses to recommend the right next step and reach out to schedule a consultation.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {assurances.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.text} className="inline-flex items-center gap-2 text-[var(--muted-foreground)]">
                  <Icon className="size-4 text-[var(--brass-600)]" aria-hidden="true" /> {a.text}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10">
          <AssessmentWizard />
        </div>
      </Container>
    </Section>
  );
}
