import Link from "next/link";
import { Phone, MessageSquare, Mail, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { footerNav } from "@/lib/data/nav";
import { clinic } from "@/lib/data/clinic";

function SocialIcon({ platform }: { platform: string }) {
  const cls = "size-4";
  if (platform === "facebook")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
      </svg>
    );
  if (platform === "instagram")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  // simple glyphs for X and TikTok
  if (platform === "x")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-7.5 8.6L23 22h-6.9l-4.8-6.3L5.8 22H2.7l8-9.2L1.5 2h7l4.3 5.7L18.9 2Zm-2.4 18h1.7L7.6 3.8H5.8L16.5 20Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.4 2.2 1.9 3.9 4 4.3v2.7c-1.4 0-2.8-.4-4-1.1v5.6c0 3.3-2.4 5.5-5.4 5.5A5.3 5.3 0 0 1 6 14.7c0-3 2.6-5.2 5.6-5v2.8c-.3-.1-.6-.1-.9-.1-1.4 0-2.5 1-2.5 2.4 0 1.3 1 2.4 2.4 2.4 1.5 0 2.6-1.1 2.6-2.8V3h3.3Z" />
    </svg>
  );
}

export function Footer() {
  const tel = clinic.phone.replace(/[^\d]/g, "");
  const text = clinic.text.replace(/[^\d]/g, "");
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--forest-900)] text-[var(--primary-foreground)]">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-[var(--forest-200)]">
              {clinic.positioning}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {clinic.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full border border-[var(--forest-700)] text-[var(--brass-400)] transition-colors hover:bg-[var(--forest-800)] hover:text-[var(--brass-200)]"
                >
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerNav).map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brass-400)]">
                {title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.label + l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--forest-200)] transition-colors hover:text-[var(--primary-foreground)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-4 border-t border-[var(--forest-700)] pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <a href={`tel:${tel}`} className="inline-flex items-center gap-2 text-[var(--forest-200)] hover:text-[var(--primary-foreground)]">
            <Phone className="size-4 text-[var(--brass-400)]" aria-hidden="true" /> {clinic.phone}
          </a>
          <a href={`sms:${text}`} className="inline-flex items-center gap-2 text-[var(--forest-200)] hover:text-[var(--primary-foreground)]">
            <MessageSquare className="size-4 text-[var(--brass-400)]" aria-hidden="true" /> Text {clinic.text}
          </a>
          <a href={`mailto:${clinic.email}`} className="inline-flex items-center gap-2 text-[var(--forest-200)] hover:text-[var(--primary-foreground)]">
            <Mail className="size-4 text-[var(--brass-400)]" aria-hidden="true" /> {clinic.email}
          </a>
          <p className="inline-flex items-center gap-2 text-[var(--forest-200)]">
            <MapPin className="size-4 text-[var(--brass-400)]" aria-hidden="true" /> {clinic.address.full}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--forest-700)] pt-6 text-xs text-[var(--forest-400)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Crossroads Medical Wellness. All rights reserved.</p>
          <p className="text-[var(--forest-400)]">
            Demo prototype. Content is illustrative and not medical advice. No real PHI is stored.
          </p>
        </div>
      </div>
    </footer>
  );
}
