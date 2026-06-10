"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinic } from "@/lib/data/clinic";
import { MagneticButton } from "@/components/motion/magnetic";

export function CtaSection({
  title = "Ready to find out what your numbers say about you?",
  description = "Take our short health assessment or reach out directly — our team will follow up to schedule your consultation with Dr. Adams.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="grid-pattern relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[color-mix(in_oklch,var(--primary),var(--accent)_18%)]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-semibold text-primary-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base text-primary-foreground/80 sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton className="w-full sm:w-auto">
                <Button size="lg" className="btn-sheen h-12 w-full bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90 sm:w-auto" asChild>
                  <Link href="/assessment">
                    Start Your Assessment
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full border-primary-foreground/30 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                  asChild
                >
                  <a href={clinic.phoneHref}>
                    <Phone data-icon="inline-start" />
                    Call {clinic.phone}
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
