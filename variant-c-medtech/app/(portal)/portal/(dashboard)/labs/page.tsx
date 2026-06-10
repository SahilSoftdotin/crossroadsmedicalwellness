import type { Metadata } from "next";
import { FlaskConical, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BiomarkerChart } from "@/components/portal/biomarker-chart";
import { LabStatusBadge } from "@/components/portal/status-badge";
import { labPanels, getBiomarkerStatus, labsLastUpdated } from "@/lib/data/labs";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Labs & Biomarkers",
};

export default function PortalLabsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">Labs &amp; Biomarkers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Last updated {formatDate(labsLastUpdated, { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
          <span className="size-2.5 rounded-full bg-success" aria-hidden="true" />
          Optimal range
          <span className="size-2.5 rounded-full bg-warning" aria-hidden="true" />
          Borderline
          <span className="size-2.5 rounded-full bg-destructive" aria-hidden="true" />
          Out of range
        </div>
      </div>

      <Card className="rounded-2xl border-0 bg-primary-soft shadow-card ring-1 ring-border">
        <CardContent className="flex items-start gap-3 px-5 py-4">
          <Info className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-primary">
            Reference ranges are general lab ranges. The shaded band on each chart shows your
            optimal target range as set by Dr. Adams, which may be narrower than the standard
            lab range.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue={labPanels[0].id}>
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-secondary p-1.5 sm:w-fit">
          {labPanels.map((panel) => (
            <TabsTrigger key={panel.id} value={panel.id} className="px-3 py-1.5">
              {panel.system}
            </TabsTrigger>
          ))}
        </TabsList>

        {labPanels.map((panel) => (
          <TabsContent key={panel.id} value={panel.id} className="mt-6 space-y-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-primary">{panel.system}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{panel.description}</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {panel.biomarkers.map((biomarker) => {
                const status = getBiomarkerStatus(biomarker);
                const latest = biomarker.history[biomarker.history.length - 1];
                return (
                  <Card key={biomarker.id} className="rounded-2xl border-0 shadow-card ring-1 ring-border">
                    <CardHeader className="flex-row items-start justify-between gap-2">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-primary">
                          <FlaskConical className="size-4 text-accent" aria-hidden="true" />
                          {biomarker.name}
                        </CardTitle>
                        <p className="mt-1 text-xs text-muted-foreground">{biomarker.description}</p>
                      </div>
                      <LabStatusBadge status={status} />
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <p className="font-display text-2xl font-semibold text-primary">
                          {latest.value} <span className="text-sm font-normal text-muted-foreground">{biomarker.unit}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Range: {biomarker.rangeLow}–{biomarker.rangeHigh} {biomarker.unit}
                          {biomarker.optimalLow !== undefined || biomarker.optimalHigh !== undefined ? (
                            <>
                              {" "}· Optimal: {biomarker.optimalLow ?? biomarker.rangeLow}–{biomarker.optimalHigh ?? biomarker.rangeHigh}{" "}
                              {biomarker.unit}
                            </>
                          ) : null}
                        </p>
                      </div>
                      <BiomarkerChart biomarker={biomarker} />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
