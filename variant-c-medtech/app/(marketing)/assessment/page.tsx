import type { Metadata } from "next";
import { ShieldCheck, Clock, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/marketing/section-heading";
import { AssessmentWizard } from "@/components/marketing/assessment/assessment-wizard";

export const metadata: Metadata = {
  title: "Health Assessment",
  description:
    "Take our short health assessment to help Dr. Adams understand your goals before your consultation at Crossroads Medical Wellness.",
};

const reassurances = [
  {
    icon: Clock,
    title: "Takes about 5 minutes",
    description: "Five short steps — your goals, a few health basics, and how to reach you.",
  },
  {
    icon: ShieldCheck,
    title: "Not a diagnosis",
    description: "This is a starting point for your consultation with Dr. Adams, not medical advice.",
  },
  {
    icon: Lock,
    title: "Never shared or sold",
    description: "Your information is used only to follow up and prepare for your visit.",
  },
];

export default function AssessmentPage() {
  return (
    <>
      <section className="grid-pattern border-b border-border bg-card">
        <div className="container-page section-y !pb-12">
          <Badge className="mb-5 bg-accent-soft text-primary">
            <ShieldCheck data-icon="inline-start" className="size-3.5" />
            Free health assessment
          </Badge>
          <SectionHeading
            title="Let's start with your goals"
            description="Answer a few quick questions about your health goals and history. Our team will review your responses and follow up to schedule your consultation with Dr. Adams."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {reassurances.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <item.icon className="size-4.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-primary">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page max-w-3xl">
          <AssessmentWizard />
        </div>
      </section>
    </>
  );
}
