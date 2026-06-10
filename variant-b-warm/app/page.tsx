import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  HeartPulse,
  Stethoscope,
  Users,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { ProgramCard } from "@/components/marketing/program-card";
import { TestimonialsCarousel } from "@/components/marketing/testimonials-carousel";
import { CtaSection } from "@/components/marketing/cta-section";
import { StarRating } from "@/components/marketing/star-rating";
import { services } from "@/lib/data/services";
import { programs } from "@/lib/data/programs";
import { testimonials, aggregateRating } from "@/lib/data/testimonials";
import { faqCategories } from "@/lib/data/faqs";

const howItWorks = [
  {
    step: "01",
    title: "Take the Assessment",
    description:
      "Tell us about your goals and health history through our short online assessment — it takes about 5 minutes.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Get a Physician Protocol",
    description:
      "Dr. Adams reviews your information (and labs, when applicable) to build a plan tailored specifically to you.",
    icon: Stethoscope,
  },
  {
    step: "03",
    title: "Begin Treatment",
    description:
      "Start your personalized treatment — whether that's BioTE pellet therapy, GLP-1 medication, or a combined plan.",
    icon: HeartPulse,
  },
  {
    step: "04",
    title: "Ongoing Care & Monitoring",
    description:
      "Regular follow-ups and lab re-checks keep your plan dialed in as your body responds.",
    icon: CalendarCheck,
  },
];

const trustStats = [
  { label: "Years of clinical experience", value: "30+" },
  { label: "Patients cared for", value: "5,000+" },
  { label: "Average patient rating", value: "4.9/5" },
  { label: "Core service lines", value: "5" },
];

export default function HomePage() {
  const featuredPrograms = programs.slice(0, 4);
  const faqTeaser = faqCategories[0].items.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-32 -right-40 h-96 w-96 rounded-full bg-sage-light/50 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-40 -left-32 h-80 w-80 rounded-full bg-terracotta-light/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wide relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-clay px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-terracotta-dark">
              <ShieldCheck className="h-3.5 w-3.5" />
              Physician-Owned &middot; Athens, AL
            </p>
            <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brown sm:text-5xl lg:text-6xl">
              Feel like yourself again — with care that looks at the whole you.
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-brown-soft">
              Crossroads Medical Wellness blends Dr. Gary Adams&apos; 30+ years
              of medical experience with integrative, root-cause approaches —
              from hormone balance to medical weight loss — in a warm,
              welcoming space.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full shadow-soft-md">
                <Link href="/assessment">
                  Start Your Free Assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <StarRating rating={aggregateRating.value} />
              <p className="text-sm font-semibold text-brown-soft">
                {aggregateRating.value} / 5 from {aggregateRating.count}+
                patient reviews
              </p>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card p-3 shadow-soft-lg">
              <div className="flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[2rem] bg-gradient-to-br from-sage-light via-clay to-terracotta-light p-8 sm:p-10">
                <div className="rounded-3xl bg-white/85 p-5 shadow-soft backdrop-blur sm:p-6">
                  <p className="font-display text-lg font-bold text-brown">
                    &ldquo;The first time a doctor looked at my whole picture
                    — not just one complaint at a time.&rdquo;
                  </p>
                  <p className="mt-3 text-sm font-semibold text-brown-soft">
                    Donald R. &middot; Longevity &amp; Anti-Aging Program
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl bg-card px-5 py-4 shadow-soft-lg sm:flex sm:flex-col">
              <p className="font-display text-3xl font-extrabold text-terracotta">
                30+
              </p>
              <p className="text-xs font-semibold text-brown-soft">
                Years of physician<br />experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-clay/40">
        <div className="container-wide grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-terracotta-dark sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brown-soft sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services overview */}
      <section className="section-py">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Services"
            title="Integrative care across five core service lines"
            description="Every service starts with a conversation and, when appropriate, lab work — so your plan is built around your body, not a generic protocol."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-py bg-cream-soft">
        <div className="container-wide">
          <SectionHeading
            eyebrow="How It Works"
            title="A simple path to a personalized plan"
            description="Inspired by how leading longevity clinics operate — but delivered with the warmth and continuity of a local, physician-owned practice."
            align="center"
            className="mx-auto"
          />
          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, i) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-primary-foreground shadow-soft-md">
                  <item.icon className="h-7 w-7" aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-sage text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-brown">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-soft">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured programs */}
      <section className="section-py">
        <div className="container-wide">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Programs"
              title="Themed programs for life's biggest health moments"
              description="Rather than à-la-carte visits, our programs combine the right services into one coordinated, physician-guided plan."
            />
            <Button asChild variant="outline" className="rounded-full self-start sm:self-auto">
              <Link href="/programs">
                View all programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-py bg-cream-soft">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Patient Stories"
            title="Real stories from real patients"
            align="center"
            className="mx-auto"
          />
          <div className="mt-6 flex items-center justify-center gap-2">
            <Star className="h-5 w-5 fill-gold text-gold" aria-hidden="true" />
            <p className="font-display text-xl font-extrabold text-brown">
              {aggregateRating.value} out of 5
            </p>
            <p className="text-sm font-semibold text-brown-soft">
              ({aggregateRating.count}+ reviews)
            </p>
          </div>
          <div className="mt-10">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/reviews">Read more reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="section-py">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="Common Questions"
            title="Answers before you even ask"
            description="Have a question that's not listed? Reach out — our team is happy to help before you book your first visit."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {faqTeaser.map((faq) => (
              <div
                key={faq.question}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="font-display text-base font-bold text-brown">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-soft">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/faq">
                View all FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust signals strip */}
      <section className="border-y border-border bg-clay/40">
        <div className="container-wide flex flex-col items-center justify-center gap-6 py-10 text-center sm:flex-row sm:gap-12">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-sage-dark" aria-hidden="true" />
            <p className="text-sm font-semibold text-brown">
              Physician-led, patient-first care
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-sage-dark" aria-hidden="true" />
            <p className="text-sm font-semibold text-brown">
              Independently, physician-owned practice
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-sage-dark" aria-hidden="true" />
            <p className="text-sm font-semibold text-brown">
              HSA / FSA eligible for many services
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
