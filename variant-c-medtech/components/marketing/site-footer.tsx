import Link from "next/link";
import { Activity, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { clinic } from "@/lib/data/clinic";

const explore = [
  { href: "/services", label: "Services" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About Dr. Adams" },
  { href: "/research", label: "Research & Articles" },
  { href: "/reviews", label: "Patient Reviews" },
];

const getStarted = [
  { href: "/assessment", label: "Take the Health Assessment" },
  { href: "/contact", label: "Request an Appointment" },
  { href: "/faq", label: "FAQ" },
  { href: "/portal/login", label: "Patient Portal" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container-page section-y !py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Activity className="size-5" aria-hidden="true" />
              </span>
              Crossroads Medical Wellness
            </Link>
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/75">
              {clinic.positioning}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {clinic.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/80 transition-colors hover:border-accent hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-[11px] font-semibold uppercase">{s.label.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-accent uppercase">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-accent uppercase">Get Started</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              {getStarted.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-accent uppercase">Visit Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{clinic.address.full}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={clinic.phoneHref} className="transition-colors hover:text-accent">
                  {clinic.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="size-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={clinic.textHref} className="transition-colors hover:text-accent">
                  Text: {clinic.text}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={clinic.emailHref} className="transition-colors hover:text-accent break-all">
                  {clinic.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 space-y-1 text-sm text-primary-foreground/70">
              {clinic.hours.map((h) => (
                <p key={h.days}>
                  <span className="font-medium text-primary-foreground/90">{h.days}:</span> {h.time}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Crossroads Medical Wellness. All rights reserved. Hours and
            availability are illustrative — please call or text to confirm.
          </p>
          <p>
            This website is a prototype and does not represent a real online scheduling or telehealth
            system.
          </p>
        </div>
      </div>
    </footer>
  );
}
