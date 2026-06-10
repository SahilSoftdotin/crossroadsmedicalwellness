import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { programs } from "@/lib/data/programs";

/**
 * Healthspan-style stacked program widgets. Each program is a large card with a
 * person-focused photo. Cards use position: sticky with an increasing top offset,
 * so they gently stack/pin on top of one another as you scroll.
 */
export function ProgramStack() {
  return (
    <div className="space-y-6 md:space-y-8">
      {programs.map((program, i) => {
        const Icon = program.icon;
        const imageLeft = i % 2 === 0;
        return (
          <div
            key={program.slug}
            className="stack-card"
            style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}
          >
            <article className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div
                  className={`relative min-h-[18rem] lg:min-h-[26rem] ${
                    imageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={program.image}
                    alt={program.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[var(--forest-950)]/45 via-transparent to-transparent"
                  />
                  <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[var(--forest-900)]/85 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--brass-400)] backdrop-blur">
                    <Icon className="size-3.5" aria-hidden="true" />
                    {program.audience}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col justify-center gap-5 p-8 md:p-10 lg:p-12 ${
                    imageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <h3 className="font-display text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
                    {program.name}
                  </h3>
                  <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
                    {program.heroDescription}
                  </p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {program.outcomes.slice(0, 4).map((o) => (
                      <li
                        key={o}
                        className="flex items-start gap-2 text-sm text-[var(--foreground)]"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-[var(--success)]"
                          aria-hidden="true"
                        />
                        {o}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-1 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
                    >
                      Explore program
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                    <span className="text-sm text-[var(--muted-foreground)]">
                      {program.duration}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
