import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinic } from "@/lib/data/clinic";

export function CtaSection({
  title = "Ready to feel like yourself again?",
  description = "Take our free, 5-minute health assessment and our care team will follow up with personalized next steps — no obligation.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-py">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-terracotta to-terracotta-dark px-6 py-16 text-center shadow-soft-lg sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-cream text-terracotta-dark shadow-soft-md hover:bg-white"
              >
                <Link href="/assessment">
                  Start Your Free Assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-white/10"
              >
                <a href={clinic.phoneHref}>
                  <Phone className="h-4 w-4" />
                  Call {clinic.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
