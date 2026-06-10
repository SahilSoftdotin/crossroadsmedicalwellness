import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBand } from "@/components/marketing/cta-band";
import { faqCategories } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about integrative medicine, our services and programs, billing, HSA/FSA and getting started at Crossroads Medical Wellness.",
};

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--cream-50)]">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">FAQ</span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
              Frequently asked questions
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--muted-foreground)]">
              Everything you need to know about getting started, our approach, treatments and
              logistics. Still have questions? We&apos;re a phone call or text away.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brass-700)]">
              Categories
            </h2>
            <ul className="mt-4 space-y-2">
              {faqCategories.map((cat) => (
                <li key={cat.category}>
                  <a
                    href={`#${cat.category.replace(/[^a-z]/gi, "-").toLowerCase()}`}
                    className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--charcoal-700)] transition-colors hover:bg-[var(--cream-200)] hover:text-[var(--primary)]"
                  >
                    {cat.category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {faqCategories.map((cat) => (
              <div
                key={cat.category}
                id={cat.category.replace(/[^a-z]/gi, "-").toLowerCase()}
                className="scroll-mt-28"
              >
                <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
                  {cat.category}
                </h2>
                <Accordion type="single" collapsible className="mt-5 space-y-4">
                  {cat.items.map((item, i) => (
                    <AccordionItem key={item.question} value={`${cat.category}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Didn't find your answer?" description="Reach out by phone, text or our contact form — we're happy to help." />
    </>
  );
}
