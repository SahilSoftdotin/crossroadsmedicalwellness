import Link from "next/link";
import { Activity, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { clinic } from "@/lib/data/clinic";

// Brand glyphs (lucide dropped most social marks). 24x24, fill="currentColor".
const socialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  ),
  Instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  ),
};

const explore = [
  { href: "/pricing", label: "Programs & Pricing" },
  { href: "/services", label: "Services" },
  { href: "/programs", label: "Treatment Programs" },
  { href: "/about", label: "About Dr. Adams" },
  { href: "/research", label: "Research & Articles" },
  { href: "/reviews", label: "Patient Reviews" },
];

const getStarted = [
  { href: "/assessment", label: "Take the Health Assessment" },
  { href: "/contact", label: "Request an Appointment" },
  { href: "/faq", label: "FAQ" },
  { href: "/coming-soon", label: "Patient Dashboard" },
  { href: "/addiction-medicine", label: "Addiction Medicine (Crossroads)" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container-page section-y !py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-tight">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Activity className="size-5" aria-hidden="true" />
              </span>
              THRIVE LONGEVITY CENTER
            </Link>
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/75">
              {clinic.positioning}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {clinic.social.map((s) => (
                <span
                  key={s.label}
                  role="img"
                  aria-label={`${s.label} — coming soon`}
                  className="group relative flex size-9 cursor-not-allowed items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-accent hover:text-accent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[18px]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {socialIcons[s.label]}
                  </svg>
                  {/* Hover tooltip */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-accent px-2 py-1 text-[11px] font-semibold text-accent-foreground opacity-0 shadow-card transition-opacity duration-150 group-hover:opacity-100">
                    Coming soon
                  </span>
                </span>
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

        <div className="mt-12 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/60">
          <nav
            aria-label="Legal"
            className="mb-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            <Link href="/privacy" className="transition-colors hover:text-accent">
              Privacy &amp; Notice of Privacy Practices
            </Link>
            <span aria-hidden="true" className="text-primary-foreground/30">
              ·
            </span>
            <Link href="/accessibility" className="transition-colors hover:text-accent">
              Accessibility
            </Link>
          </nav>
          <p className="text-center">
            © {new Date().getFullYear()} THRIVE LONGEVITY CENTER. All rights reserved. Hours and
            availability are illustrative — please call or text to confirm.
          </p>
        </div>
      </div>
    </footer>
  );
}
