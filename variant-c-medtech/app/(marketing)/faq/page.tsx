import type { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";
import { faqCategories } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about THRIVE Longevity Center services, billing, the patient portal, and getting started.",
};

export default function FaqPage() {
  return (
    <>
      <section className="grid-pattern border-b border-border bg-card">
        <div className="container-page section-y !pb-12">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Browse by category, or reach out directly if you can't find what you're looking for."
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-page max-w-3xl space-y-12">
          {faqCategories.map((category) => (
            <div key={category.category}>
              <h2 className="font-display text-xl font-semibold text-primary sm:text-2xl">
                {category.category}
              </h2>
              <Accordion className="mt-4 w-full">
                {category.items.map((item, i) => (
                  <AccordionItem key={item.question} value={`${category.category}-${i}`}>
                    <AccordionTrigger className="text-left font-display text-base font-semibold text-primary">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <CtaSection
        title="Still have questions?"
        description="Our team is happy to help — call, text, or send us a message and we'll get back to you."
      />
    </>
  );
}
