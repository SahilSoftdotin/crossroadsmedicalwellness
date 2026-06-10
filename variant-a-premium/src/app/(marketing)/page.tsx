import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ClipboardCheck,
  Stethoscope,
  Truck,
  HeartPulse,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stars } from "@/components/ui/stars";
import { Section, Container, SectionHeading } from "@/components/ui/section";
import { ServiceCard } from "@/components/marketing/service-card";
import { ProgramStack } from "@/components/marketing/program-stack";
import { TreatmentsTabs } from "@/components/marketing/treatments-tabs";
import { MotionBackground } from "@/components/marketing/motion-background";
import { FeaturedIn } from "@/components/marketing/featured-in";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import { CtaBand } from "@/components/marketing/cta-band";
import { services } from "@/lib/data/services";
import { clinic, trustLogos } from "@/lib/data/clinic";
import { faqTeaser } from "@/lib/data/faqs";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Assessment",
    description:
      "Share your goals and history, then complete comprehensive lab work so we start with data, not guesswork.",
  },
  {
    icon: Stethoscope,
    title: "Physician protocol",
    description:
      "Dr. Adams interprets your results and designs an individualized, root-cause treatment plan.",
  },
  {
    icon: Truck,
    title: "Treatment & delivery",
    description:
      "Begin therapy — in-office or shipped to your door — with clear guidance every step of the way.",
  },
  {
    icon: HeartPulse,
    title: "Ongoing care",
    description:
      "We re-test, fine-tune your protocol and support you through your care team between visits.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, rgba(201,168,106,0.16), transparent 60%), radial-gradient(50% 40% at 0% 30%, rgba(16,49,43,0.06), transparent 60%)",
          }}
        />
        <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="fade-up">
            <Badge variant="accent" className="mb-5">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Physician-owned · 30+ years of care
            </Badge>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Medicine that treats the{" "}
              <span className="text-[var(--forest-700)]">root cause</span>, not just the symptom.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted-foreground)]">
              At Crossroads Medical Wellness, Dr. Gary Adams blends traditional medicine with
              functional, integrative care — so you get answers and a plan built around your labs,
              your symptoms and your goals.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/assessment">
                  Start Your Health Assessment
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              <div className="flex items-center gap-2">
                <Stars rating={clinic.stats.rating} />
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {clinic.stats.rating} · {clinic.stats.reviewCount} reviews
                </span>
              </div>
              <span className="text-sm text-[var(--muted-foreground)]">
                <strong className="font-semibold text-[var(--foreground)]">
                  {clinic.stats.patientsServed}
                </strong>{" "}
                patients served
              </span>
              <span className="text-sm text-[var(--muted-foreground)]">HSA / FSA eligible</span>
            </div>
          </div>

          {/* Hero visual card */}
          <div className="fade-up relative">
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-lg)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow">Your wellness snapshot</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-[var(--foreground)]">
                    Optimized, measured, monitored
                  </p>
                </div>
                <span className="grid size-12 place-items-center rounded-full bg-[var(--forest-100)] text-[var(--forest-800)]">
                  <HeartPulse className="size-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Energy", value: "+38%", tone: "bg-[var(--forest-100)] text-[var(--forest-800)]" },
                  { label: "Inflammation", value: "−67%", tone: "bg-[var(--brass-200)] text-[var(--brass-700)]" },
                  { label: "Testosterone", value: "Optimal", tone: "bg-[var(--forest-100)] text-[var(--forest-800)]" },
                  { label: "Weight", value: "−29 lbs", tone: "bg-[var(--brass-200)] text-[var(--brass-700)]" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--cream-50)] p-4"
                  >
                    <p className="text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
                      {m.label}
                    </p>
                    <p className={`mt-1.5 inline-flex rounded-full px-2.5 py-0.5 text-sm font-semibold ${m.tone}`}>
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--forest-800)] p-4 text-[var(--primary-foreground)]">
                <span className="grid size-10 place-items-center rounded-full bg-[var(--forest-700)] text-sm font-semibold text-[var(--brass-400)]">
                  GA
                </span>
                <div className="text-sm">
                  <p className="font-medium">Dr. Gary Adams, MD</p>
                  <p className="text-[var(--forest-200)]">Reviews every protocol personally</p>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -left-5 -z-10 size-40 rounded-full bg-[var(--brass-500)]/20 blur-2xl"
            />
          </div>
        </Container>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-[var(--border)] bg-[var(--cream-50)]">
        <Container className="flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)]">
            <Star className="size-4 fill-[var(--brass-500)] text-[var(--brass-500)]" aria-hidden="true" />
            Trusted, credentialed, evidence-informed care
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustLogos.map((logo) => (
              <li
                key={logo}
                className="text-sm font-semibold uppercase tracking-wide text-[var(--charcoal-400)]"
              >
                {logo}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* SERVICES */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we treat"
            title="Five focused service lines"
            description="Each service is physician-led and grounded in comprehensive testing — so your plan fits your physiology, not a template."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      {/* TREATMENTS — Medicines / Supplements / Labs */}
      <section className="relative overflow-hidden bg-[var(--cream-50)]">
        <MotionBackground soft />
        <Container className="relative z-10 py-16 md:py-24 lg:py-28">
          <SectionHeading
            eyebrow="Treatments"
            title="Medicines, supplements & labs"
            description="The therapies, supplementation and testing behind every protocol — each one prescribed and dosed to your individual results."
          />
          <TreatmentsTabs />
          <div className="mt-10 text-center">
            <Button asChild variant="link">
              <Link href="/treatments">
                Browse all treatments <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[var(--forest-900)] text-[var(--primary-foreground)]">
        <Container className="py-16 md:py-24 lg:py-28">
          <SectionHeading
            eyebrow="How it works"
            title={<span className="text-[var(--primary-foreground)]">A clear path to feeling better</span>}
            description={
              <span className="text-[var(--forest-200)]">
                Four steps from first conversation to ongoing, optimized care.
              </span>
            }
          />
          <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-700)] text-[var(--brass-400)]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="font-display text-3xl font-semibold text-[var(--forest-700)]">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--forest-200)]">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* FULL-SERVICE APPROACH — motion background */}
      <section className="relative overflow-hidden bg-[var(--forest-900)] text-[var(--primary-foreground)]">
        <MotionBackground />
        <Container className="relative z-10 grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="eyebrow text-[var(--brass-400)]">The Crossroads difference</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] md:text-4xl lg:text-[2.75rem]">
              A full-service approach to your long-term health
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--forest-200)]">
              Testing, treatment, coaching and tracking — connected in one place, so your
              care compounds over time instead of starting over at every visit.
            </p>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                { t: "Labs analysis", d: "70+ biomarkers, clearly explained." },
                { t: "Protocols", d: "Individual plans built on your data." },
                { t: "Coaching", d: "Nutrition, strength and habit support." },
                { t: "Optimizations", d: "Ongoing dose titration as you change." },
                { t: "Patient portal", d: "Your labs, protocol and progress, always on." },
                { t: "Care team", d: "Message Dr. Adams' team between visits." },
              ].map((item) => (
                <li key={item.t} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-2 shrink-0 rounded-full bg-[var(--brass-500)]"
                  />
                  <span>
                    <span className="font-semibold">{item.t}</span>
                    <span className="block text-sm text-[var(--forest-200)]">{item.d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Button asChild variant="accent" size="lg" className="mt-9">
              <Link href="/assessment">
                Start with your assessment <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Visual: connected-care stat panel */}
          <div className="relative rounded-[var(--radius-xl)] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <p className="eyebrow text-[var(--brass-400)]">MyCrossroads · live snapshot</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { label: "Biomarkers tracked", value: "72" },
                { label: "Avg. energy gain", value: "+38%" },
                { label: "Protocol adherence", value: "94%" },
                { label: "Care-team response", value: "< 1 day" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-[var(--radius-md)] border border-white/10 bg-[var(--forest-800)]/60 p-4"
                >
                  <p className="font-display text-2xl font-semibold text-[var(--brass-400)]">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-[var(--forest-200)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-[var(--radius-md)] border border-white/10 bg-[var(--forest-800)]/60 p-4 text-sm text-[var(--forest-200)]">
              Everything connects to one record — so every new result makes your plan smarter.
            </div>
          </div>
        </Container>
      </section>

      {/* PROGRAMS */}
      <Section>
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Programs"
              title="Goal-built programs, not à-la-carte guesswork"
              description="Bundled testing, treatment and ongoing care designed around a specific outcome."
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/programs">
                View all programs <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12">
            <ProgramStack />
          </div>
        </Container>
      </Section>

      {/* PERSONAL CARE — soft motion background */}
      <section className="relative overflow-hidden">
        <MotionBackground soft />
        <Container className="relative z-10 grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          {/* Photo collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-1 row-span-2 min-h-[20rem] overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-md)]">
              <Image
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=700&q=80"
                alt="Woman feeling energized and well"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[9.5rem] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
              <Image
                src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80"
                alt="Smiling man in good health"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[9.5rem] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
              <Image
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
                alt="Active couple enjoying life"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="eyebrow">For real people</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] text-[var(--foreground)] md:text-4xl lg:text-[2.75rem]">
              Personal care for optimal health
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted-foreground)]">
              You're not a lab value or a prescription. Dr. Adams and the Crossroads team
              get to know you — your history, your goals and your life — and build a plan
              that fits all three. Then we stay with you, adjusting as you change.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                { value: clinic.stats.patientsServed, label: "Patients served" },
                { value: "30+ yrs", label: "Physician experience" },
                { value: `${clinic.stats.rating}★`, label: `${clinic.stats.reviewCount} reviews` },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-semibold text-[var(--forest-800)]">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">{s.label}</p>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-9">
              <Link href="/about">
                Meet Dr. Adams <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--cream-50)]">
        <Container className="py-16 md:py-24 lg:py-28">
          <SectionHeading
            eyebrow="Patient stories"
            title="Real results, real people"
            description={`Rated ${clinic.stats.rating} out of 5 across ${clinic.stats.reviewCount} reviews.`}
          />
          <div className="mt-12">
            <TestimonialCarousel />
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="link">
              <Link href="/reviews">
                Read more reviews <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* FEATURED IN */}
      <FeaturedIn />

      {/* FAQ TEASER */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            align="left"
            eyebrow="Questions"
            title="You probably have a few questions"
            description="Here are some of the things patients ask most. Find more in our full FAQ."
            className="lg:sticky lg:top-28 lg:self-start"
          />
          <div className="space-y-4">
            {faqTeaser.map((f) => (
              <div
                key={f.question}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)]"
              >
                <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">
                  {f.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {f.answer}
                </p>
              </div>
            ))}
            <Button asChild variant="outline">
              <Link href="/faq">
                See all FAQs <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
