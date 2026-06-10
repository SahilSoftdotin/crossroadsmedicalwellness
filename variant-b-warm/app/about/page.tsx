import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  GraduationCap,
  HeartHandshake,
  Microscope,
  Stethoscope,
  Users2,
} from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Dr. Gary Adams and learn about Crossroads Medical Wellness's integrative, physician-owned approach to care in Athens, AL.",
};

const credentials = [
  {
    icon: Award,
    title: "30+ Years in Practice",
    description:
      "Decades of clinical experience across primary care, regenerative, and integrative medicine.",
  },
  {
    icon: BadgeCheck,
    title: "BioTE Certified Provider",
    description:
      "Certified in BioTE bioidentical hormone replacement pellet therapy for men and women.",
  },
  {
    icon: Stethoscope,
    title: "Specialties",
    description:
      "Hormone optimization, medical weight loss (GLP-1), and age-management medicine.",
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    description:
      "Doctor of Medicine (MD) with continued advanced training in functional and longevity medicine.",
  },
];

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
          <div className="relative mx-auto w-full max-w-sm animate-fade-in">
            {/* Soft tinted ring behind the portrait */}
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-terracotta-light/40 via-clay/40 to-sage-light/40 blur-md"
              aria-hidden="true"
            />
            {/* Main portrait — DrGari1 */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-2 shadow-soft-lg sm:rounded-[2.5rem] sm:p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
                <Image
                  src="/DrGari1.png"
                  alt="Dr. Gary Adams, MD, wearing a white coat and holding a clipboard"
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Secondary headshot accent — DrGari2, overlapping */}
            <div className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-3xl bg-card p-3 pr-5 shadow-soft-lg sm:-right-8 sm:p-3.5 sm:pr-6">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-2 ring-sage-light sm:h-16 sm:w-16">
                <Image
                  src="/DrGari2.png"
                  alt="Dr. Gary Adams, MD, smiling headshot"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-display text-base font-extrabold leading-tight text-terracotta sm:text-lg">
                  30+ Years
                </p>
                <p className="text-xs font-semibold leading-tight text-brown-soft">
                  Clinical Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((credential) => (
              <div
                key={credential.title}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay text-terracotta-dark">
                  <credential.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-brown">
                  {credential.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-soft">
                  {credential.description}
                </p>
              </div>
            ))}
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
            BioTE Certified &middot; Physician-Owner, Crossroads Medical
            Wellness &middot; Athens, AL
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
