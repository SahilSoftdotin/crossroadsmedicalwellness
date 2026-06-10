"use client";

import { useEffect, useRef } from "react";
import { ClipboardList, Stethoscope, FileHeart, LineChart } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/motion/motion-primitives";

const steps = [
  {
    icon: ClipboardList,
    title: "Book / Assessment",
    description:
      "Take the short online assessment or reach out directly. It takes about five minutes and helps us understand your goals before you arrive.",
  },
  {
    icon: Stethoscope,
    title: "Consultation with Dr. Adams",
    description:
      "Comprehensive labs plus a real conversation about your symptoms, history, and goals — the foundation of your plan.",
  },
  {
    icon: FileHeart,
    title: "Personalized protocol",
    description:
      "Dr. Adams designs a lab-guided, root-cause plan — hormones, weight, regenerative care, and more, coordinated under one roof.",
  },
  {
    icon: LineChart,
    title: "Ongoing optimization",
    description:
      "Track progress in the patient portal with regular labs and check-ins, refining your plan as your body responds.",
  },
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Progress line draw
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
                end: "bottom 75%",
                scrub: 0.6,
              },
            }
          );
        }

        // Step reveals
        itemsRef.current.forEach((el) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 82%" },
            }
          );
        });
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="section-y" ref={sectionRef}>
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="A clear path from first hello to ongoing care"
            description="Every plan starts with data, not guesswork — and stays personalized as your body responds."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <ol className="relative mx-auto mt-16 max-w-3xl">
          {/* Track + animated progress line */}
          <div
            className="absolute left-6 top-2 bottom-2 w-px bg-border sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          >
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top bg-accent"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {steps.map((step, i) => (
            <li
              key={step.title}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="relative mb-12 pl-16 last:mb-0 sm:mb-16 sm:w-1/2 sm:pl-0 sm:[&:nth-child(odd)]:pr-12 sm:[&:nth-child(odd)]:text-right sm:[&:nth-child(even)]:ml-auto sm:[&:nth-child(even)]:pl-12"
            >
              <span
                className="absolute left-6 top-1 flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-accent text-[0.7rem] font-bold text-accent-foreground shadow-glow sm:left-1/2"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="rounded-[24px] border border-white/60 bg-background/70 p-6 shadow-card backdrop-blur-xl">
                <span className="mb-3 inline-flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary sm:[ol_li:nth-child(odd)_&]:ml-auto">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
