import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/lib/data/programs";
import { DynamicIcon } from "@/components/marketing/dynamic-icon";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="flex items-center justify-between bg-gradient-to-br from-sage to-sage-dark px-6 py-8 text-white sm:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
            Program
          </p>
          <h3 className="mt-2 font-display text-2xl font-extrabold">
            {program.name}
          </h3>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
          <DynamicIcon name={program.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="font-semibold text-terracotta-dark">{program.tagline}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brown-soft">
          {program.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-dark">
          Explore program
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
