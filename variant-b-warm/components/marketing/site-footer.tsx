import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  TikTokIcon,
} from "@/components/marketing/social-icons";
import { clinic } from "@/lib/data/clinic";
import { services } from "@/lib/data/services";
import { programs } from "@/lib/data/programs";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-clay/40">
      <div className="container-wide grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-extrabold text-brown"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            Crossroads Medical Wellness
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-brown-soft">
            {clinic.positioning}
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={clinic.social.facebook}
              aria-label="Crossroads Medical Wellness on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-brown shadow-soft transition-colors hover:text-terracotta"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={clinic.social.instagram}
              aria-label="Crossroads Medical Wellness on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-brown shadow-soft transition-colors hover:text-terracotta"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={clinic.social.twitter}
              aria-label="Crossroads Medical Wellness on X"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-brown shadow-soft transition-colors hover:text-terracotta"
            >
              <XIcon className="h-4 w-4" />
            </a>
            <a
              href={clinic.social.tiktok}
              aria-label="Crossroads Medical Wellness on TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-brown shadow-soft transition-colors hover:text-terracotta"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-sage-dark">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-brown-soft transition-colors hover:text-terracotta"
                >
                  {service.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-sage-dark">
            Programs
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {programs.map((program) => (
              <li key={program.slug}>
                <Link
                  href={`/programs/${program.slug}`}
                  className="text-brown-soft transition-colors hover:text-terracotta"
                >
                  {program.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/portal/login"
                className="font-semibold text-terracotta-dark transition-colors hover:text-terracotta"
              >
                Patient Portal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-sage-dark">
            Visit Us
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-brown-soft">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              <span>{clinic.address.full}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-terracotta" />
              <a href={clinic.phoneHref} className="hover:text-terracotta">
                {clinic.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 shrink-0 text-terracotta" />
              <a href={clinic.textHref} className="hover:text-terracotta">
                Text {clinic.text}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-terracotta" />
              <a
                href={`mailto:${clinic.email}`}
                className="hover:text-terracotta"
              >
                {clinic.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-6 text-xs text-brown-soft sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Crossroads Medical Wellness. All
            rights reserved.
          </p>
          <p className="text-center sm:text-right">
            This site is for informational purposes and does not constitute
            medical advice. Prototype demo — patient portal uses sample data
            only.
          </p>
        </div>
      </div>
    </footer>
  );
}
