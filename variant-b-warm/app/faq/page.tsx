import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";
import { faqCategories } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about appointments, hormone therapy, medical weight loss, billing, and the patient portal at Crossroads Medical Wellness.",
};

export default function FaqPage() {
  return (
    <>
      <section className="section-py">
        <div className="container-wide">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Browse by category, or reach out directly if you don't see what you're looking for."
            align="center"
            className="mx-auto"
          />

          <div className="mx-auto mt-12 max-w-3xl space-y-12">
            {faqCategories.map((category) => (
              <div key={category.category}>
                <h2 className="font-display text-xl font-extrabold text-brown sm:text-2xl">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="mt-4 space-y-3">
                  {category.items.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`${category.category}-${i}`}
                      className="rounded-2xl border border-border bg-card px-5 shadow-soft"
                    >
                      <AccordionTrigger className="text-left font-display text-base font-bold text-brown hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-brown-soft">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaSection
        title="Still have questions?"
        description="Our team is happy to help — call, text, or send us a message and we'll get back to you promptly."
      />
    </>
  );
}
