import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/marketing/social-icons";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ContactForm } from "@/components/marketing/contact-form";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Crossroads Medical Wellness in Athens, AL. Call, text, email, or send us a message — we'll follow up to schedule your visit.",
};

export default function ContactPage() {
  return (
    <section className="section-py">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Contact Us"
          title="We'd love to hear from you"
          description={clinic.bookingNote}
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Info column */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-lg font-bold text-brown">
                Get in touch
              </h3>
              <ul className="mt-5 space-y-4 text-sm text-brown-soft">
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-clay text-terracotta-dark">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brown">Address</p>
                    <p>{clinic.address.full}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-clay text-terracotta-dark">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brown">Phone</p>
                    <a href={clinic.phoneHref} className="hover:text-terracotta">
                      {clinic.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-clay text-terracotta-dark">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brown">Text</p>
                    <a href={clinic.textHref} className="hover:text-terracotta">
                      {clinic.text}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-clay text-terracotta-dark">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brown">Email</p>
                    <a
                      href={`mailto:${clinic.email}`}
                      className="break-all hover:text-terracotta"
                    >
                      {clinic.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
                <Clock className="h-5 w-5 text-terracotta" />
                Hours
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {clinic.hours.map((h) => (
                  <li
                    key={h.days}
                    className="flex items-center justify-between rounded-xl bg-cream-soft px-4 py-2.5"
                  >
                    <span className="font-semibold text-brown">{h.days}</span>
                    <span className="text-brown-soft">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-brown-soft">{clinic.hoursNote}</p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-lg font-bold text-brown">
                Follow along
              </h3>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={clinic.social.facebook}
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-clay text-terracotta-dark transition-colors hover:bg-terracotta hover:text-primary-foreground"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={clinic.social.instagram}
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-clay text-terracotta-dark transition-colors hover:bg-terracotta hover:text-primary-foreground"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                title="Map showing Crossroads Medical Wellness location in Athens, AL"
                src={clinic.mapEmbedSrc}
                className="h-64 w-full grayscale-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form column */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
