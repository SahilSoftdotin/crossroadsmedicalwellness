"use client";

import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/motion-primitives";

type Metric = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
};

const metrics: Metric[] = [
  { value: 6500, suffix: "+", label: "Patients guided toward measurable change" },
  { value: 30, suffix: "+", label: "Years of clinical experience" },
  { value: 4.9, decimals: 1, suffix: "★", label: "Average patient rating" },
  { value: 100, suffix: "%", label: "Physician-led care" },
];

export function Metrics() {
  return (
    <section className="border-y border-border bg-card">
      <Stagger className="container-page grid grid-cols-2 gap-y-10 gap-x-6 py-14 sm:grid-cols-4 sm:py-16">
        {metrics.map((m) => (
          <StaggerItem key={m.label} className="text-center sm:text-left">
            <p className="font-display text-4xl font-semibold text-primary sm:text-5xl">
              <CountUp
                value={m.value}
                decimals={m.decimals ?? 0}
                suffix={m.suffix}
              />
            </p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">{m.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
