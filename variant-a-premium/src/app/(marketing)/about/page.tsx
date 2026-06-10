import type { Metadata } from "next";
import {
  Award,
  Microscope,
  HeartHandshake,
  Compass,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { CtaBand } from "@/components/marketing/cta-band";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "About Dr. Gary Adams",
  description:
    "Meet Dr. Gary Adams, MD — 30+ years of experience leading Crossroads Medical Wellness, a physician-owned integrative practice in Athens, AL focused on root-cause care.",
};

const values = [
  {
    icon: Microscope,
    title: "Evidence-informed",
    body: "Every plan is grounded in comprehensive testing and physician judgment — real medicine, not trends.",
  },
  {
    icon: Compass,
    title: "Root-cause first",
    body: "We ask why a symptom exists before treating it, addressing the systems that drive how you feel.",
  },
  {
    icon: HeartHandshake,
    title: "Whole-person care",
    body: "Hormones, metabolism, nutrition, sleep and mental health are treated as one connected system.",
  },
  {
    icon: Award,
    title: "Physician-owned",
    body: "Independent and physician-led, so your care is guided by judgment — never a corporate script.",
  },
];

const credentials = [
  { icon: GraduationCap, label: "Doctor of Medicine (MD)" },
  { icon: Stethoscope, label: "30+ years in clinical practice" },
  { icon: Award, label: "BioTE-certified hormone optimization" },
  { icon: Microscope, label: "Functional & integrative medicine training" },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--cream-50)]">
        <Container className="grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="eyebrow">About the practice</span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
              Care led by a physician who takes the time to listen
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--muted-foreground)]">
              {clinic.positioning} Crossroads Medical Wellness was built on a simple conviction: that
              good medicine starts with understanding the whole person — and the time to do it right.
            </p>
          </div>
          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--forest-800)] p-8 text-[var(--primary-foreground)] shadow-[var(--shadow-lg)]">
            <div className="flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-full bg-[var(--forest-700)] font-display text-2xl font-semibold text-[var(--brass-400)]">
                GA
              </span>
              <div>
                <p className="font-display text-2xl font-semibold">{clinic.provider.name}</p>
                <p className="text-[var(--brass-400)]">{clinic.provider.credentials} · Founder & Physician</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--forest-200)]">
              With more than three decades of experience, Dr. Adams blends the rigor of traditional
              medicine with the curiosity of functional, root-cause care — and reviews every patient
              protocol personally.
            </p>
            <Badge variant="accent" className="mt-6">
              {clinic.stats.yearsExperience} years of experience
            </Badge>
          </div>
        </Container>
      </section>

      {/* BIO */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-5 text-base leading-relaxed text-[var(--muted-foreground)]">
            <span className="eyebrow">Dr. Gary Adams, MD</span>
            <h2 className="font-display text-3xl font-semibold text-[var(--foreground)]">
              Three decades of medicine, one consistent philosophy
            </h2>
            <p>
              Dr. Gary Adams has spent more than thirty years caring for patients — long enough to
              see where conventional medicine excels and where it too often falls short. Time and
              again, he met patients who were told their labs were &ldquo;normal&rdquo; while they
              felt anything but. That gap is what led him to integrative, functional medicine.
            </p>
            <p>
              At Crossroads, Dr. Adams brings the two worlds together. He uses the diagnostic rigor
              and safety of traditional medicine, then layers in the root-cause lens of functional
              care — comprehensive testing, hormone and metabolic optimization, and lifestyle
              medicine — to treat the whole person rather than a single number.
            </p>
            <p>
              Because the practice is physician-owned and independent, there&apos;s no rushing
              patients through a fifteen-minute slot. Dr. Adams reviews every protocol personally,
              explains the reasoning behind it, and adjusts based on follow-up testing and how you
              actually feel.
            </p>
            <p>
              His goal for every patient is simple but ambitious: not just to manage symptoms, but to
              restore energy, clarity and vitality — and to help you protect them for the long run.
            </p>
          </div>

          <aside className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-sm)] lg:sticky lg:top-28 lg:self-start">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brass-700)]">
              Credentials & focus
            </h3>
            <ul className="mt-5 space-y-4">
              {credentials.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                    <span className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-100)] text-[var(--forest-800)]">
                      <Icon className="size-[1.1rem]" aria-hidden="true" />
                    </span>
                    <span className="pt-1.5">{c.label}</span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </Container>
      </Section>

      {/* VALUES */}
      <section className="bg-[var(--cream-50)]">
        <Container className="py-16 md:py-24">
          <SectionHeading
            eyebrow="Our philosophy"
            title="What guides our care"
            description="The principles behind every plan we build at Crossroads."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)]"
                >
                  <span className="grid size-11 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-100)] text-[var(--forest-800)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{v.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBand title="Meet a physician who treats the whole you" />
    </>
  );
}
