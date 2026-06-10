import { Container } from "@/components/ui/section";
import { pressFeatures, pressQuote } from "@/lib/data/clinic";

/**
 * Healthspan-style "Featured In" press band: a centered pull-quote above a
 * scrolling marquee of grayscale outlet wordmarks. Motion pauses on hover and
 * stills for prefers-reduced-motion users.
 */
export function FeaturedIn() {
  // Duplicate the list so the marquee can loop seamlessly (-50% translate).
  const row = [...pressFeatures, ...pressFeatures];

  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <Container className="py-14 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Featured In</span>
          <p className="mt-4 font-display text-xl font-medium leading-snug text-[var(--foreground)] md:text-2xl text-balance">
            &ldquo;{pressQuote.text}&rdquo;
          </p>
        </div>

        <div className="marquee-mask marquee-pause mt-10 overflow-hidden">
          <div className="marquee gap-12 pr-12">
            {row.map((outlet, i) => (
              <span
                key={`${outlet}-${i}`}
                aria-hidden={i >= pressFeatures.length}
                className="shrink-0 whitespace-nowrap font-display text-lg font-semibold uppercase tracking-[0.12em] text-[var(--charcoal-400)] grayscale transition-colors duration-200 hover:text-[var(--forest-700)] md:text-xl"
              >
                {outlet}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
