"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceArea,
} from "recharts";
import { CheckCircle2, AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";
import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { Badge } from "@/components/ui/badge";
import {
  labPanels,
  getBiomarkerStatus,
  labsLastUpdated,
  type Biomarker,
} from "@/lib/data/labs";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  ReturnType<typeof getBiomarkerStatus>,
  { label: string; badgeClass: string; icon: typeof CheckCircle2 }
> = {
  "in-range": {
    label: "Optimal",
    badgeClass: "bg-sage-light text-sage-dark",
    icon: CheckCircle2,
  },
  watch: {
    label: "Watch",
    badgeClass: "bg-gold/20 text-brown",
    icon: AlertTriangle,
  },
  low: {
    label: "Below Range",
    badgeClass: "bg-terracotta-light/40 text-terracotta-dark",
    icon: ArrowDown,
  },
  high: {
    label: "Above Range",
    badgeClass: "bg-terracotta-light/40 text-terracotta-dark",
    icon: ArrowUp,
  },
};

function formatShortDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
}

function formatFullDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function BiomarkerCard({ biomarker }: { biomarker: Biomarker }) {
  const status = getBiomarkerStatus(biomarker);
  const config = STATUS_CONFIG[status];
  const StatusIcon = config.icon;
  const latest = biomarker.history[biomarker.history.length - 1];
  const previous =
    biomarker.history.length > 1
      ? biomarker.history[biomarker.history.length - 2]
      : undefined;
  const delta = previous ? latest.value - previous.value : undefined;

  const chartData = biomarker.history.map((point) => ({
    date: formatShortDate(point.date),
    fullDate: formatFullDate(point.date),
    value: point.value,
  }));

  const values = biomarker.history.map((p) => p.value);
  const dataMin = Math.min(...values, biomarker.rangeLow);
  const dataMax = Math.max(...values, biomarker.rangeHigh);
  const padding = (dataMax - dataMin) * 0.15 || 1;
  const yMin = Math.max(0, dataMin - padding);
  const yMax = dataMax + padding;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-bold text-brown">
            {biomarker.name}
          </h3>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-brown-soft sm:text-sm">
            {biomarker.description}
          </p>
        </div>
        <Badge className={cn("shrink-0 gap-1.5 px-3 py-1", config.badgeClass)}>
          <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {config.label}
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-2">
        <div>
          <p className="font-display text-3xl font-extrabold text-brown">
            {latest.value}
            <span className="ml-1 text-sm font-semibold text-brown-soft">
              {biomarker.unit}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-brown-soft">
            As of {formatFullDate(latest.date)}
          </p>
        </div>
        {delta !== undefined && delta !== 0 && (
          <p
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              delta > 0 ? "text-sage-dark" : "text-terracotta-dark"
            )}
          >
            {delta > 0 ? (
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {Math.abs(delta).toLocaleString(undefined, {
              maximumFractionDigits: 1,
            })}{" "}
            {biomarker.unit} since last check
          </p>
        )}
        <p className="text-xs text-brown-soft">
          Reference range:{" "}
          <span className="font-semibold text-brown">
            {biomarker.rangeLow}–{biomarker.rangeHigh} {biomarker.unit}
          </span>
          {biomarker.optimalLow !== undefined &&
            biomarker.optimalHigh !== undefined && (
              <>
                {" "}
                &middot; Optimal:{" "}
                <span className="font-semibold text-sage-dark">
                  {biomarker.optimalLow}–{biomarker.optimalHigh}{" "}
                  {biomarker.unit}
                </span>
              </>
            )}
        </p>
      </div>

      <div className="mt-4 h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
          >
            {biomarker.optimalLow !== undefined &&
              biomarker.optimalHigh !== undefined && (
                <ReferenceArea
                  y1={biomarker.optimalLow}
                  y2={biomarker.optimalHigh}
                  fill="var(--color-sage-light)"
                  fillOpacity={0.35}
                  ifOverflow="extendDomain"
                />
              )}
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--color-brown-soft)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-border)" }}
            />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fontSize: 11, fill: "var(--color-brown-soft)" }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "0.75rem",
                border: "1px solid var(--color-border)",
                background: "var(--color-card)",
                fontSize: "0.8rem",
              }}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullDate ?? ""
              }
              formatter={(value) => [
                `${value} ${biomarker.unit}`,
                biomarker.name,
              ]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-terracotta)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "var(--color-terracotta)" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function PortalLabsPage() {
  const [activeSystem, setActiveSystem] = useState<string>("all");

  const systems = ["all", ...labPanels.map((p) => p.system)];
  const visiblePanels =
    activeSystem === "all"
      ? labPanels
      : labPanels.filter((p) => p.system === activeSystem);

  return (
    <div>
      <PortalPageHeader
        title="Labs &amp; Biomarkers"
        description={`Your most recent results, grouped by body system. Last updated ${formatFullDate(
          labsLastUpdated
        )}.`}
      />

      <div
        className="mb-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter labs by body system"
      >
        {systems.map((system) => (
          <button
            key={system}
            type="button"
            onClick={() => setActiveSystem(system)}
            aria-pressed={activeSystem === system}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
              activeSystem === system
                ? "border-terracotta bg-terracotta text-primary-foreground shadow-soft"
                : "border-border bg-card text-brown-soft hover:border-terracotta-light hover:text-terracotta-dark"
            )}
          >
            {system === "all" ? "All Systems" : system}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {visiblePanels.map((panel) => (
          <section key={panel.id} aria-labelledby={`${panel.id}-heading`}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2
                  id={`${panel.id}-heading`}
                  className="font-display text-xl font-extrabold text-brown"
                >
                  {panel.name}
                </h2>
                <p className="text-xs font-semibold uppercase tracking-wider text-terracotta-dark">
                  {panel.system}
                </p>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {panel.biomarkers.map((b) => (
                <BiomarkerCard key={b.id} biomarker={b} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-cream-soft p-4 text-xs leading-relaxed text-brown-soft sm:text-sm">
        <strong className="text-brown">A note on ranges:</strong> Standard
        reference ranges reflect population averages. Dr. Adams and your care
        team may target tighter &ldquo;optimal&rdquo; ranges (shown shaded on
        each chart) based on your individual goals and symptoms. Always
        discuss results with your care team before making changes to your
        protocol.
      </div>
    </div>
  );
}
