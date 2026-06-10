import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getIcon } from "@/components/marketing/icon-map";
import type { Program } from "@/lib/data/programs";

export function ProgramCard({ program }: { program: Program }) {
  const Icon = getIcon(program.icon);

  return (
    <Card className="group h-full overflow-hidden rounded-2xl border-0 shadow-card ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-elevated">
      <div className="grid-pattern relative flex h-32 items-end bg-primary p-6">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
        <div className="relative flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <Badge className="bg-accent text-accent-foreground">{program.heroStat.value}</Badge>
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col gap-3 px-6 py-2">
        <div>
          <h3 className="font-display text-lg font-semibold text-primary">{program.name}</h3>
          <p className="mt-1 text-sm font-medium text-accent">{program.tagline}</p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{program.summary}</p>
        <Link
          href={`/programs/${program.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-accent"
        >
          View program
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}
