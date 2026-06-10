import type { Metadata } from "next";
import { Activity, FileText } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PortalPageHeader } from "@/components/portal/page-header";
import { LabStatusBadge } from "@/components/portal/status-badge";
import { BiomarkerChart } from "@/components/portal/biomarker-chart";
import { StatCard } from "@/components/portal/stat-card";
import { labPanels, labSummary, type Biomarker } from "@/lib/data/labs";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Lab Results" };

function RangeBar({ b }: { b: Biomarker }) {
  // Position the value marker within the reference range.
  const span = b.refHigh - b.refLow || 1;
  const pct = Math.min(100, Math.max(0, ((b.value - b.refLow) / span) * 100));
  const optLeft =
    typeof b.optimalLow === "number" ? Math.max(0, ((b.optimalLow - b.refLow) / span) * 100) : null;
  const optWidth =
    typeof b.optimalLow === "number" && typeof b.optimalHigh === "number"
      ? Math.min(100, ((b.optimalHigh - b.optimalLow) / span) * 100)
      : null;

  return (
    <div className="mt-3">
      <div className="relative h-2 w-full rounded-full bg-[var(--cream-200)]">
        {optLeft !== null && optWidth !== null ? (
          <div
            className="absolute top-0 h-2 rounded-full bg-[var(--brass-400)]/50"
            style={{ left: `${optLeft}%`, width: `${optWidth}%` }}
            aria-hidden="true"
          />
        ) : null}
        <div
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--surface)] bg-[var(--forest-800)] shadow-[var(--shadow-xs)]"
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="mt-1 flex justify-between text-[0.7rem] text-[var(--charcoal-400)]">
        <span>{b.refLow}</span>
        {typeof b.optimalLow === "number" && typeof b.optimalHigh === "number" ? (
          <span className="text-[var(--brass-700)]">
            optimal {b.optimalLow}–{b.optimalHigh}
          </span>
        ) : (
          <span>reference range</span>
        )}
        <span>{b.refHigh}</span>
      </div>
    </div>
  );
}

export default function LabsPage() {
  const summary = labSummary();

  return (
    <div className="flex flex-col gap-8">
      <PortalPageHeader
        eyebrow="Biomarkers"
        title="Lab Results"
        description={`Your comprehensive panel, grouped by body system. Most recent draw collected ${formatDate(labPanels[0].collectedOn)}.`}
        action={
          <Button variant="outline" size="sm">
            <FileText className="size-4" aria-hidden="true" />
            Download PDF
          </Button>
        }
      />

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Optimal" value={summary.optimal} accent="success" icon={<Activity className="size-5" aria-hidden="true" />} />
        <StatCard label="In range" value={summary.inRange} accent="forest" />
        <StatCard label="Borderline" value={summary.borderline} accent="warning" />
        <StatCard label="Out of range" value={summary.outOfRange} accent="brass" />
      </div>

      {/* Panels */}
      <div className="flex flex-col gap-8">
        {labPanels.map((panel) => (
          <section key={panel.id} aria-labelledby={`panel-${panel.id}`}>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 id={`panel-${panel.id}`} className="font-display text-xl font-semibold text-[var(--foreground)]">
                  {panel.system}
                </h2>
                <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">{panel.description}</p>
              </div>
              <Badge variant="outline" className="shrink-0">
                Collected {formatDate(panel.collectedOn)}
              </Badge>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {panel.biomarkers.map((b) => (
                <Card key={b.id}>
                  <CardHeader className="gap-2 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-base">{b.name}</CardTitle>
                        <CardDescription className="mt-0.5">
                          <span className="font-display text-2xl font-semibold text-[var(--foreground)]">
                            {b.value}
                          </span>{" "}
                          <span className="text-[var(--muted-foreground)]">{b.unit}</span>
                        </CardDescription>
                      </div>
                      <LabStatusBadge status={b.status} />
                    </div>
                    <RangeBar b={b} />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <BiomarkerChart biomarker={b} />
                    {b.note ? (
                      <p className="mt-2 rounded-[var(--radius-sm)] bg-[var(--surface-muted)] px-3 py-2 text-xs text-[var(--muted-foreground)]">
                        {b.note}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="text-xs text-[var(--muted-foreground)]">
        Reference and optimal ranges are illustrative for this demo and should not be used for medical decisions.
      </p>
    </div>
  );
}
