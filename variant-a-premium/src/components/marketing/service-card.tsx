import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/data/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--brass-400)] hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      <span className="grid size-12 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-100)] text-[var(--forest-800)] transition-colors group-hover:bg-[var(--forest-800)] group-hover:text-[var(--brass-400)]">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-[var(--foreground)]">{service.shortName}</h3>
      <p className="mt-1 text-sm font-medium text-[var(--brass-700)]">{service.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
        {service.summary}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)]">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
