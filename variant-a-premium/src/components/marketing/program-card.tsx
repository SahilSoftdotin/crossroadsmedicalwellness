import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Program } from "@/lib/data/programs";

export function ProgramCard({ program }: { program: Program }) {
  const Icon = program.icon;
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      <div className="flex items-center gap-4 border-b border-[var(--border)] bg-[var(--forest-800)] p-6 text-[var(--primary-foreground)]">
        <span className="grid size-12 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-700)] text-[var(--brass-400)]">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--brass-400)]">
            {program.audience}
          </p>
          <h3 className="font-display text-xl font-semibold">{program.name}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{program.summary}</p>
        <ul className="mt-5 space-y-2.5">
          {program.outcomes.slice(0, 3).map((o) => (
            <li key={o} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
              <Check className="mt-0.5 size-4 shrink-0 text-[var(--success)]" aria-hidden="true" />
              {o}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)]">
          Explore program
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
