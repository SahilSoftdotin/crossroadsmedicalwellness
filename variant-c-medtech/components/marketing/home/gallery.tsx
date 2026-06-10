"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  Reveal,
  Stagger,
  StaggerItem,
  motion,
  useReducedMotion,
} from "@/components/motion/motion-primitives";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    alt: "Adults in a bright yoga and mobility class, feeling energized",
    className: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=700&q=80",
    alt: "Fresh, colorful nutritious meal",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80",
    alt: "Person lifting weights, building strength",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80",
    alt: "Person meditating peacefully",
    className: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=700&q=80",
    alt: "Hikers on a mountain trail with snow-capped peaks",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=80",
    alt: "A person standing on a sunlit mountain ridge above rolling hills",
    className: "col-span-2 row-span-1",
  },
];

export function Gallery() {
  const reduce = useReducedMotion();

  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Life, optimized"
            title="What feeling well looks like"
            description="Real energy, strength, and clarity — the everyday moments our patients reclaim through complete integrative care."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Stagger
          className="mt-12 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:gap-4 lg:grid-cols-4"
          stagger={0.07}
        >
          {photos.map((p) => (
            <StaggerItem key={p.src} className={p.className}>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.015 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full w-full overflow-hidden rounded-3xl shadow-card ring-1 ring-border"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
