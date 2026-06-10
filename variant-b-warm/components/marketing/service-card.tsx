import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/data/services";
import { DynamicIcon } from "@/components/marketing/dynamic-icon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg sm:p-8"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay text-terracotta-dark transition-colors group-hover:bg-terracotta group-hover:text-primary-foreground">
        <DynamicIcon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-brown">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brown-soft">
        {service.summary}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-dark">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
