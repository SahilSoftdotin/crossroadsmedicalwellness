import type { Metadata } from "next";
import { Award, HeartHandshake, Microscope, Users2 } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Dr. Gary Adams and learn about Crossroads Medical Wellness's integrative, physician-owned approach to care in Athens, AL.",
};

const values = [
  {
    icon: Microscope,
    title: "Root-Cause Focused",
    description:
      "We dig into labs and history to understand why you feel the way you do — not just treat the symptom in front of us.",
  },
  {
    icon: HeartHandshake,
    title: "Whole-Person Care",
    description:
      "Hormones, metabolism, sleep, stress, and nutrition are all connected. Your plan considers the full picture.",
  },
  {
    icon: Award,
    title: "Physician-Led, Always",
    description:
      "Every plan is reviewed and guided by Dr. Adams — combining decades of clinical judgment with current evidence.",
  },
  {
    icon: Users2,
    title: "Independent & Patient-First",
    description:
      "As a physician-owned practice, our priorities are set by what's best for our patients — not a corporate parent.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-terracotta-light/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wide relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full bg-clay px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-terracotta-dark">
              About Crossroads
            </p>
            <h1 className="mt-5 text-balance font-display text-4xl font-extrabold tracking-tight text-brown sm:text-5xl">
              Meet Dr. Gary Adams
            </h1>
            <p className="mt-6 text-balance text-lg leading-relaxed text-brown-soft">
              With more than 30 years of clinical experience, Dr. Adams founded
              Crossroads Medical Wellness to give patients in Athens, Alabama a
              different kind of medical experience — one where physicians take
              the time to understand the whole person, and where conventional
              medicine and functional, root-cause approaches work together
              instead of in separate silos.
            </p>
            <p className="mt-4 text-balance text-lg leading-relaxed text-brown-soft">
              As a physician-owned practice, Crossroads operates independently —
              which means decisions about your care are driven by what's best
              for you, not corporate policy.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex h-72 w-72 items-center justify-center rounded-[3rem] bg-gradient-to-br from-terracotta-light via-clay to-sage-light shadow-soft-lg sm:h-80 sm:w-80">
              <div className="flex h-56 w-56 flex-col items-center justify-center rounded-[2.5rem] bg-card text-center shadow-soft sm:h-64 sm:w-64">
                <p className="font-display text-5xl font-extrabold text-terracotta">
                  30+
                </p>
                <p className="mt-2 px-6 text-sm font-semibold text-brown-soft">
                  years of clinical experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-py bg-cream-soft">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Philosophy"
            title="Integrative care, in practice"
            description="“Integrative” isn't a buzzword for us — it's how Dr. Adams approaches every patient conversation."
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-5 text-base leading-relaxed text-brown-soft sm:text-lg">
            <p>
              Conventional medicine is excellent at diagnosing and treating
              acute problems. But many of the things patients come to us
              for — fatigue, weight that won't budge, hormonal symptoms,
              recovery that takes longer than it used to — don't always have
              a single, obvious cause.
            </p>
            <p>
              Our approach starts with listening, followed by comprehensive
              lab work when appropriate. From there, Dr. Adams builds a plan
              that may include bioidentical hormone therapy, GLP-1 medications
              for weight management, regenerative therapies, or a combination —
              always grounded in your labs, your history, and your goals.
            </p>
            <p>
              And because we're an independent, physician-owned practice, your
              plan can evolve over time. As your labs change and your goals
              shift, so does your care — with Dr. Adams and our care team
              involved at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What Guides Us"
            title="The values behind every visit"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-clay text-terracotta-dark">
                  <value.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-brown">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-soft">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section className="border-y border-border bg-clay/40">
        <div className="container-wide py-10 text-center">
          <p className="font-display text-xl font-bold text-brown sm:text-2xl">
            Dr. Gary Adams, MD
          </p>
          <p className="mt-2 text-sm font-semibold text-brown-soft sm:text-base">
            30+ years of clinical experience &middot; Physician-Owner,
            Crossroads Medical Wellness &middot; Athens, AL
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
