import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare, Phone, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ContactForm } from "@/components/marketing/contact-form";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact THRIVE Longevity Center in Athens, AL — call, text, or send a message and our team will follow up to schedule your visit.",
};

export default function ContactPage() {
  return (
    <>
      <section className="grid-pattern border-b border-border bg-card">
        <div className="container-page section-y !pb-12">
          <SectionHeading
            eyebrow="Contact"
            title="Let's get you scheduled"
            description="Appointments are arranged by phone, text, or this form — our team will follow up to find a time that works for you."
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border">
              <CardContent className="space-y-5 px-6 py-2">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-primary">Address</p>
                    <p className="mt-1 text-sm text-muted-foreground">{clinic.address.full}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-primary">Call</p>
                    <a href={clinic.phoneHref} className="mt-1 block text-sm text-muted-foreground hover:text-primary">
                      {clinic.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <MessageSquare className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-primary">Text</p>
                    <a href={clinic.textHref} className="mt-1 block text-sm text-muted-foreground hover:text-primary">
                      {clinic.text}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-primary">Email</p>
                    <a href={clinic.emailHref} className="mt-1 block text-sm break-all text-muted-foreground hover:text-primary">
                      {clinic.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Clock className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-primary">Hours</p>
                    <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                      {clinic.hours.map((h) => (
                        <p key={h.days}>
                          {h.days}: {h.time}
                        </p>
                      ))}
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground/80">{clinic.hoursNote}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Map showing THRIVE Longevity Center location in Athens, AL"
                src={clinic.mapEmbedSrc}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border">
            <CardContent className="px-6 py-2 sm:px-8 sm:py-4">
              <h2 className="font-display text-xl font-semibold text-primary">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fields marked with an asterisk (*) are required.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
