import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/components/marketing/icon-map";
import type { Service } from "@/lib/data/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = getIcon(service.icon);

  return (
    <Card className="group h-full rounded-2xl border-0 shadow-card ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-elevated">
      <CardContent className="flex h-full flex-col gap-4 px-6 py-2">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold text-primary">{service.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
        </div>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-accent"
        >
          Learn more
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}
