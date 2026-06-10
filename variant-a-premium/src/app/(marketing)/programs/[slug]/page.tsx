import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Sparkles, Clock, BadgeDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ServiceCard } from "@/components/marketing/service-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { programs, getProgram } from "@/lib/data/programs";
import { getService } from "@/lib/data/services";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/programs/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const program = getProgram(slug);
  if (!program) return { title: "Program not found" };
  return { title: program.name, description: program.summary };
}

export default async function ProgramDetailPage(props: PageProps<"/programs/[slug]">) {
  const { slug } = await props.params;
  const program = getProgram(slug);
  if (!program) notFound();

  const Icon = program.icon;
  const related = program.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--forest-900)] text-[var(--primary-foreground)]">
        <Container className="py-16 md:py-20">
          <Link
            href="/programs"
            className="text-sm font-medium text-[var(--brass-400)] hover:text-[var(--brass-200)]"
          >
            ← All programs
          </Link>
          <div className="mt-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="grid size-14 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-700)] text-[var(--brass-400)]">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-[var(--forest-800)] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[var(--brass-400)]">
                {program.audience}
              </span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-5xl">
              {program.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--forest-200)]">
              {program.heroDescription}
            </p>
            <div className="mt-8">
              <Button asChild variant="accent" size="lg">
                <Link href="/assessment">Start Your Assessment</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-[var(--forest-200)]">
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-[var(--brass-400)]" aria-hidden="true" /> {program.duration}
              </span>
              <span className="inline-flex items-center gap-2">
                <BadgeDollarSign className="size-4 text-[var(--brass-400)]" aria-hidden="true" /> {program.priceNote}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-0">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="eyebrow">Overview</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--foreground)]">
              How this program works
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--muted-foreground)]">
              {program.overview}
            </p>
            <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--cream-50)] p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brass-700)]">
                <Sparkles className="size-4" aria-hidden="true" /> Expected outcomes
              </h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {program.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--success)]" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-sm)] lg:sticky lg:top-28 lg:self-start">
            <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
              What&apos;s included
            </h3>
            <ul className="mt-5 space-y-3.5">
              {program.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--forest-100)] text-[var(--forest-800)]">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-7 w-full">
              <Link href="/assessment">Begin with an assessment</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section>
          <Container>
            <SectionHeading
              align="left"
              eyebrow="Included care"
              title="Services in this program"
              description="The treatments and therapies that make up this program."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
