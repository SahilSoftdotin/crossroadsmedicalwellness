"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

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
          {photos.map((p, i) => (
            <StaggerItem key={p.src} className={p.className}>
              <motion.button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`View larger image: ${p.alt}`}
                whileHover={reduce ? undefined : { scale: 1.015 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block h-full w-full overflow-hidden rounded-3xl shadow-card ring-1 ring-border focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Lightbox
        photos={photos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(next) => setOpenIndex(next)}
      />
    </section>
  );
}

type LightboxProps = {
  photos: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => setMounted(true), []);

  const open = index !== null;

  // Capture/restore focus + lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog.
    const id = window.requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(id);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  // Keyboard: ESC closes, arrows navigate, Tab is trapped within the dialog.
  React.useEffect(() => {
    if (!open || index === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((index + 1) % photos.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((index - 1 + photos.length) % photos.length);
      } else if (e.key === "Tab") {
        // Focus trap.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, index, photos.length, onClose, onNavigate]);

  if (!mounted || !open || index === null) return null;

  const current = photos[index];

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery viewer"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-primary/40 backdrop-blur-md ${
          reduce ? "" : "motion-safe:animate-[fade-up_0.2s_ease-out]"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-4xl outline-none"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-elevated ring-1 ring-white/20">
          <Image
            key={current.src}
            src={current.src.replace("w=700", "w=1400").replace("w=900", "w=1600")}
            alt={current.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
            priority
          />
        </div>
        <p className="mt-3 text-center text-sm text-white/90">{current.alt}</p>

        {/* Controls */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute -top-3 right-0 flex size-11 items-center justify-center rounded-full bg-background/90 text-primary shadow-elevated backdrop-blur-md transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60 sm:-right-3"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-primary shadow-elevated backdrop-blur-md transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60 sm:-left-5"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate((index + 1) % photos.length)}
          aria-label="Next image"
          className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-primary shadow-elevated backdrop-blur-md transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60 sm:-right-5"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body
  );
}
