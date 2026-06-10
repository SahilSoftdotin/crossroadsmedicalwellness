import { ClipboardList, Stethoscope, FlaskConical, LineChart } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";

const steps = [
  {
    icon: ClipboardList,
    title: "Take the Assessment",
    description:
      "Tell us about your goals and health basics through our short online assessment — it takes about five minutes.",
  },
  {
    icon: Stethoscope,
    title: "Physician Protocol",
    description:
      "Dr. Adams reviews your information and labs to build a personalized care plan tailored to your goals.",
  },
  {
    icon: FlaskConical,
    title: "Treatment & Delivery",
    description:
      "Begin your protocol — whether that's BioTE pellet therapy, GLP-1 medication, or a coordinated regenerative plan.",
  },
  {
    icon: LineChart,
    title: "Ongoing Care",
    description:
      "Track your progress through the patient portal, with regular labs and check-ins to refine your plan over time.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-y bg-secondary/50">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="A clear path from first conversation to ongoing care"
          description="Every plan starts with data, not guesswork — and stays personalized as your body responds."
          align="center"
          className="mx-auto"
        />
        <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute top-7 right-0 left-0 hidden h-px bg-border lg:block"
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-elevated">
                <step.icon className="size-6" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-semibold tracking-widest text-accent uppercase">
                Step {index + 1}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
