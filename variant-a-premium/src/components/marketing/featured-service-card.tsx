import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/data/services";

/**
 * Premium, interactive featured-service card: photo with hover zoom + sheen,
 * glass icon chip, short description, and a "Learn more" CTA. Designed to sit
 * inside a <Reveal> for scroll-in animation.
 */
export function FeaturedServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2 hover:border-[var(--brass-400)] hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--forest-950)]/70 via-[var(--forest-950)]/15 to-transparent"
        />
        {/* sheen sweep */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        {/* glass icon chip */}
        <span className="absolute bottom-4 left-5 grid size-12 place-items-center rounded-[var(--radius-md)] border border-white/30 bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
          <Icon className="size-6" aria-hidden="true" />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
          {service.shortName}
        </h3>
        <p className="mt-1 text-sm font-medium text-[var(--brass-700)]">{service.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {service.summary}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)]">
          Learn more
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
