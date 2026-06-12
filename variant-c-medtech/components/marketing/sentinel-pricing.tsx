"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCheck,
  ClipboardList,
  FlaskConical,
  Scan,
  Sparkles,
  Star,
} from "lucide-react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/motion-primitives";
import { sentinelTiers, type SentinelTier } from "@/lib/data/sentinel";

/* ----------------------------- detail helpers ----------------------------- */

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({
  icon,
  title,
  items,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-primary">
        <span className="text-accent">{icon}</span>
        {title}
      </h4>
      <div className="mt-4">
        <CheckList items={items} />
      </div>
      {note && <p className="mt-4 text-xs italic leading-relaxed text-muted-foreground">{note}</p>}
    </div>
  );
}

function LabBlock({ groups }: { groups: { group: string; tests: string[] }[] }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-primary">
        <span className="text-accent">
          <FlaskConical className="size-4" />
        </span>
        Included laboratory testing
      </h4>
      <dl className="mt-4 space-y-3">
        {groups.map((g) => (
          <div key={g.group} className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-3">
            <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {g.group}
            </dt>
            <dd className="text-sm text-foreground">{g.tests.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ------------------------------- price card ------------------------------- */

function PriceCard({
  tier,
  active,
  onView,
}: {
  tier: SentinelTier;
  active: boolean;
  onView: () => void;
}) {
  const Icon = tier.icon;
  const flagship = tier.flagship;

  return (
    <div
      className={[
        "relative flex h-full flex-col rounded-3xl p-6 transition-all duration-300",
        flagship
          ? "bg-gradient-to-b from-primary to-[#0b1a36] text-primary-foreground shadow-elevated ring-2 ring-accent lg:scale-[1.03]"
          : active
            ? "bg-card text-foreground shadow-card ring-2 ring-accent"
            : "bg-card text-foreground shadow-card ring-1 ring-border hover:-translate-y-1",
      ].join(" ")}
    >
      {tier.badge && (
        <span
          className={
            "absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold " +
            (flagship ? "bg-accent text-accent-foreground" : "bg-accent-soft text-primary")
          }
        >
          {flagship && <Star className="size-3" aria-hidden="true" />}
          {tier.badge}
        </span>
      )}

      <div className="flex items-center justify-between">
        <span
          className={
            "flex size-11 items-center justify-center rounded-2xl " +
            (flagship ? "bg-white/15 text-white" : "bg-primary text-primary-foreground")
          }
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-4xl font-semibold tracking-tight">{tier.priceDisplay}</span>
      </div>
      <p className={"mt-1 text-xs " + (flagship ? "text-primary-foreground/70" : "text-muted-foreground")}>
        One-time program fee
      </p>

      <h3 className="mt-4 font-display text-2xl font-semibold">{tier.shortName}</h3>
      <p className={"mt-2 text-sm leading-relaxed " + (flagship ? "text-primary-foreground/80" : "text-muted-foreground")}>
        {tier.positioning}
      </p>

      <ul className="mt-5 flex-1 space-y-2.5 border-t pt-5"
        style={{ borderColor: flagship ? "rgb(255 255 255 / 0.15)" : "var(--border)" }}
      >
        {tier.features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <span
              className={
                "mt-0.5 grid size-5 shrink-0 place-content-center rounded-full " +
                (flagship ? "bg-white/15 text-white" : "bg-accent-soft text-primary")
              }
            >
              <CheckCheck className="size-3" aria-hidden="true" />
            </span>
            <span className={flagship ? "text-primary-foreground/90" : "text-foreground"}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-2">
        <Link
          href={`/assessment?program=${tier.id}`}
          className={
            "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 " +
            (flagship
              ? "bg-white text-primary hover:bg-white/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90")
          }
        >
          Start with {tier.shortName}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={onView}
          aria-pressed={active}
          className={
            "inline-flex h-11 items-center justify-center rounded-xl border px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 " +
            (flagship
              ? "border-white/30 text-white hover:bg-white/10"
              : "border-border text-foreground hover:bg-muted")
          }
        >
          View full details
        </button>
      </div>
    </div>
  );
}

/* ----------------------------- detail panel ------------------------------- */

function DetailPanel({ tier }: { tier: SentinelTier }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <tier.icon className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold text-primary">{tier.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{tier.positioning}</p>
          </div>
        </div>
        <p className="font-display text-3xl font-semibold text-primary sm:text-right">{tier.priceDisplay}</p>
      </div>

      {tier.inheritsNote && (
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-primary">
          <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
          {tier.inheritsNote}
        </p>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Block icon={<ClipboardList className="size-4" />} title="What's included" items={tier.features} />
        {tier.includedLabs && <LabBlock groups={tier.includedLabs} />}
        {tier.additionalLabs && (
          <Block icon={<FlaskConical className="size-4" />} title="Additional labs & testing" items={tier.additionalLabs} />
        )}
        {tier.imaging && (
          <Block icon={<Scan className="size-4" />} title="Imaging options" items={tier.imaging} note={tier.imagingNote} />
        )}
        {tier.includedImaging && (
          <Block icon={<Scan className="size-4" />} title="Included imaging & testing" items={tier.includedImaging} />
        )}
        {tier.patientReceives && (
          <Block icon={<ClipboardList className="size-4" />} title="What you receive" items={tier.patientReceives} />
        )}
        {tier.addOns && (
          <Block icon={<Sparkles className="size-4" />} title={tier.addOns.label} items={tier.addOns.items} />
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="rounded-2xl bg-primary-soft/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Ideal for</p>
          <p className="mt-1 text-sm text-muted-foreground">{tier.idealPatient}</p>
          {tier.note && <p className="mt-2 text-sm font-medium text-accent">{tier.note}</p>}
        </div>
        <Link
          href={`/assessment?program=${tier.id}`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Start with {tier.shortName}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------- main view -------------------------------- */

export function SentinelPricing() {
  const reduce = useReducedMotion();
  const [selectedId, setSelectedId] = React.useState<string>("advanced");
  const panelRef = React.useRef<HTMLDivElement>(null);

  const selectTier = React.useCallback((id: string, scroll = true) => {
    setSelectedId(id);
    if (scroll) {
      window.requestAnimationFrame(() =>
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, []);

  // Deep-link support from the homepage teaser (/pricing#core, etc.).
  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sentinelTiers.some((t) => t.id === hash)) {
      selectTier(hash);
    }
  }, [selectTier]);

  const selected = sentinelTiers.find((t) => t.id === selectedId) ?? sentinelTiers[0];

  return (
    <div>
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
          Sentinel Longevity Framework
        </p>
        <h2 className="text-balance font-display text-3xl font-semibold text-primary sm:text-4xl">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.12}
            staggerFrom="first"
            containerClassName="justify-center"
            transition={{ type: "spring", stiffness: 250, damping: 40 }}
          >
            Programs & Pricing
          </VerticalCutReveal>
        </h2>
        <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          Four physician-led evaluation tiers — a clear progression from an introductory Baseline
          assessment to comprehensive, executive-level longevity optimization. One-time program
          fees; select any tier for full details.
        </p>
      </div>

      {/* Card ladder */}
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch" stagger={0.08}>
        {sentinelTiers.map((tier) => (
          <StaggerItem key={tier.id} className="h-full">
            <PriceCard tier={tier} active={selectedId === tier.id} onView={() => selectTier(tier.id)} />
          </StaggerItem>
        ))}
      </Stagger>

      {/* Selected tier — full details */}
      <div ref={panelRef} className="mt-12 scroll-mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <DetailPanel tier={selected} />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
        Sentinel Baseline is the simplest way to begin; Sentinel Advanced is our flagship,
        most-complete evaluation. Every tier is physician-led and built around your Sentinel
        Longevity Score.
      </p>
    </div>
  );
}
