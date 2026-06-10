import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { Stars } from "@/components/ui/stars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CtaBand } from "@/components/marketing/cta-band";
import { testimonials } from "@/lib/data/testimonials";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description:
    "Read what patients say about Crossroads Medical Wellness — rated 4.9 out of 5 across hundreds of reviews for hormone therapy, weight loss, longevity and more.",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--cream-50)]">
        <Container className="py-16 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <span className="eyebrow">Patient reviews</span>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
                Trusted by patients across North Alabama
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-[var(--muted-foreground)]">
                We&apos;re honored by the trust our patients place in us. Here&apos;s what they have
                to say about their experience at Crossroads.
              </p>
            </div>
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-md)]">
              <p className="font-display text-5xl font-semibold text-[var(--forest-800)]">
                {clinic.stats.rating}
              </p>
              <Stars rating={clinic.stats.rating} className="mt-2 justify-center" size={20} />
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Based on {clinic.stats.reviewCount} reviews
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--brass-700)]">
                {clinic.stats.patientsServed} patients served
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]"
              >
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-[var(--foreground)] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5">
                  <Avatar>
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{t.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {t.service} · {t.location}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-[var(--muted-foreground)]">
            Reviews are illustrative for this prototype and represent the kind of feedback patients share.
          </p>
        </Container>
      </Section>

      <CtaBand title="Become our next success story" />
    </>
  );
}
