import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinic } from "@/lib/data/clinic";

export function CtaBand({
  title = "Ready to feel like yourself again?",
  description = "Take our quick health assessment or reach out directly. Dr. Adams will help you build a plan rooted in your goals and your labs.",
}: {
  title?: string;
  description?: string;
}) {
  const tel = clinic.phone.replace(/[^\d]/g, "");
  const text = clinic.text.replace(/[^\d]/g, "");
  return (
    <section className="container-page py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--forest-800)] px-7 py-12 text-center text-[var(--primary-foreground)] shadow-[var(--shadow-lg)] md:px-16 md:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-[var(--brass-500)]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-[var(--forest-500)]/25 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <span className="eyebrow text-[var(--brass-400)]">Get started</span>
          <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
          <p className="mt-4 text-base text-[var(--forest-200)] md:text-lg">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link href="/assessment">Start Your Assessment</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[var(--forest-600)] bg-transparent text-[var(--primary-foreground)] hover:bg-[var(--forest-700)] hover:border-[var(--forest-500)]"
            >
              <a href={`tel:${tel}`}>
                <Phone className="size-4" /> Call {clinic.phone}
              </a>
            </Button>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--forest-200)]">
            <MessageSquare className="size-4 text-[var(--brass-400)]" aria-hidden="true" />
            Prefer to text? {clinic.text}
          </p>
        </div>
      </div>
    </section>
  );
}
