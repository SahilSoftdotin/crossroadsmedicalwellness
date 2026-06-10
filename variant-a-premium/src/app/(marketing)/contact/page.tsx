import type { Metadata } from "next";
import { Phone, MessageSquare, Mail, MapPin, Clock } from "lucide-react";
import { Container, Section } from "@/components/ui/section";
import { ContactForm } from "@/components/marketing/contact-form";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Crossroads Medical Wellness in Athens, AL. Call, text, email or send us a message — appointments are arranged by phone, text or contact form.",
};

export default function ContactPage() {
  const tel = clinic.phone.replace(/[^\d]/g, "");
  const text = clinic.text.replace(/[^\d]/g, "");
  const mapQuery = encodeURIComponent(clinic.address.full);

  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--cream-50)]">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Contact</span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
              Let&apos;s start the conversation
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--muted-foreground)]">
              We&apos;d love to hear from you. Reach out by phone, text, email or the form below.
              Appointments are arranged directly — we don&apos;t use real-time online scheduling.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info column */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${tel}`}
                className="group rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-xs)] transition-colors hover:border-[var(--brass-400)]"
              >
                <Phone className="size-5 text-[var(--forest-700)]" aria-hidden="true" />
                <p className="mt-3 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Call</p>
                <p className="mt-1 font-medium text-[var(--foreground)]">{clinic.phone}</p>
              </a>
              <a
                href={`sms:${text}`}
                className="group rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-xs)] transition-colors hover:border-[var(--brass-400)]"
              >
                <MessageSquare className="size-5 text-[var(--forest-700)]" aria-hidden="true" />
                <p className="mt-3 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Text</p>
                <p className="mt-1 font-medium text-[var(--foreground)]">{clinic.text}</p>
              </a>
              <a
                href={`mailto:${clinic.email}`}
                className="group rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-xs)] transition-colors hover:border-[var(--brass-400)] sm:col-span-2"
              >
                <Mail className="size-5 text-[var(--forest-700)]" aria-hidden="true" />
                <p className="mt-3 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Email</p>
                <p className="mt-1 font-medium text-[var(--foreground)] break-all">{clinic.email}</p>
              </a>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)]">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--foreground)]">
                <MapPin className="size-5 text-[var(--forest-700)]" aria-hidden="true" /> Visit us
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{clinic.address.full}</p>
              <h3 className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
                <Clock className="size-4 text-[var(--forest-700)]" aria-hidden="true" /> Hours
                <span className="font-normal text-[var(--muted-foreground)]">(illustrative)</span>
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {clinic.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 tabular-nums">
                    <span className="text-[var(--muted-foreground)]">{h.day}</span>
                    <span className="font-medium text-[var(--foreground)]">{h.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-xs)]">
              <iframe
                title="Map to Crossroads Medical Wellness"
                src={`https://maps.google.com/maps?q=${mapQuery}&z=13&output=embed`}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form column */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-md)] md:p-9">
            <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Fill out the form and we&apos;ll get back to you within one business day.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
