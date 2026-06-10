import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, ClipboardList, Pill, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { protocolItems, protocolSummary, type ProtocolItem } from "@/lib/data/protocol";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Protocol",
};

const refillConfig: Record<ProtocolItem["refillStatus"], { label: string; className: string; icon: typeof CheckCircle2 }> = {
  "On track": { label: "On track", className: "bg-success/15 text-success", icon: CheckCircle2 },
  "Refill due soon": { label: "Refill due soon", className: "bg-warning/20 text-warning-foreground", icon: RefreshCw },
  "Refill needed": { label: "Refill needed", className: "bg-destructive/10 text-destructive", icon: AlertTriangle },
};

const typeConfig: Record<ProtocolItem["type"], string> = {
  "Pellet Therapy": "bg-primary-soft text-primary",
  Supplement: "bg-accent-soft text-primary",
  Medication: "bg-primary-soft text-primary",
  Lifestyle: "bg-secondary text-secondary-foreground",
};

export default function PortalProtocolPage() {
  const refillsDue = protocolItems.filter((item) => item.refillStatus !== "On track");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-primary">Your Protocol</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Current medications, supplements, and lifestyle plan from {protocolSummary.physician}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border">
          <CardContent className="px-5 py-4">
            <p className="text-xs font-medium text-muted-foreground">Program</p>
            <p className="mt-1 font-display text-lg font-semibold text-primary">{protocolSummary.programName}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Started {formatDate(protocolSummary.startDate, { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border">
          <CardContent className="px-5 py-4">
            <p className="text-xs font-medium text-muted-foreground">Overall Adherence</p>
            <p className="mt-1 font-display text-2xl font-semibold text-primary">{protocolSummary.overallAdherence}%</p>
            <Progress value={protocolSummary.overallAdherence} className="mt-2">
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border">
          <CardContent className="px-5 py-4">
            <p className="text-xs font-medium text-muted-foreground">Next Protocol Review</p>
            <p className="mt-1 font-display text-lg font-semibold text-primary">
              {formatDate(protocolSummary.nextReview, { month: "long", day: "numeric", year: "numeric" })}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">with {protocolSummary.physician}</p>
          </CardContent>
        </Card>
      </div>

      {refillsDue.length > 0 && (
        <Card className="rounded-2xl border-0 bg-warning/10 shadow-card ring-1 ring-border">
          <CardContent className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning-foreground" aria-hidden="true" />
              <div>
                <p className="font-display text-sm font-semibold text-foreground">
                  {refillsDue.length} item{refillsDue.length > 1 ? "s" : ""} need attention
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {refillsDue.map((i) => i.name).join(", ")}
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="shrink-0">
              <RefreshCw data-icon="inline-start" />
              Request refill
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {protocolItems.map((item) => {
          const refill = refillConfig[item.refillStatus];
          return (
            <Card key={item.id} className="rounded-2xl border-0 shadow-card ring-1 ring-border">
              <CardHeader className="flex-row items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Pill className="size-4 text-accent" aria-hidden="true" />
                    <CardTitle className="text-primary">{item.name}</CardTitle>
                  </div>
                  <Badge className={cn("mt-2", typeConfig[item.type])}>{item.type}</Badge>
                </div>
                <Badge className={refill.className}>
                  <refill.icon data-icon="inline-start" className="size-3.5" />
                  {refill.label}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Dosage</dt>
                    <dd className="mt-0.5 text-foreground">{item.dosage}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Schedule</dt>
                    <dd className="mt-0.5 text-foreground">{item.schedule}</dd>
                  </div>
                </dl>
                <p className="rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
                  {item.instructions}
                </p>
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">Adherence</span>
                    <span className="text-muted-foreground">{item.adherence}%</span>
                  </div>
                  <Progress value={item.adherence} className="mt-1.5">
                    <ProgressTrack>
                      <ProgressIndicator />
                    </ProgressTrack>
                  </Progress>
                </div>
                {item.nextRefillDate && (
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ClipboardList className="size-3.5" aria-hidden="true" />
                    Next refill / visit: {formatDate(item.nextRefillDate, { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
