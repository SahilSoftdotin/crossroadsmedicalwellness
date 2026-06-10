import type { Metadata } from "next";
import {
  Pill,
  Leaf,
  Stethoscope,
  Clock,
  RefreshCw,
  Info,
  PauseCircle,
} from "lucide-react";
import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { protocolItems, protocolNotes, type ProtocolItem } from "@/lib/data/protocol";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Your Protocol",
  description: "Your current medications, supplements, and therapies.",
};

const TYPE_CONFIG: Record<
  ProtocolItem["type"],
  { icon: typeof Pill; badgeClass: string }
> = {
  Medication: { icon: Pill, badgeClass: "bg-terracotta-light/40 text-terracotta-dark" },
  Supplement: { icon: Leaf, badgeClass: "bg-sage-light text-sage-dark" },
  Therapy: { icon: Stethoscope, badgeClass: "bg-clay text-brown" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function daysUntil(dateStr: string) {
  const target = new Date(dateStr + "T00:00:00").getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((target - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

function adherenceColor(adherence: number) {
  if (adherence >= 90) return "text-sage-dark";
  if (adherence >= 75) return "text-gold";
  return "text-terracotta-dark";
}

function ProtocolCard({ item }: { item: ProtocolItem }) {
  const config = TYPE_CONFIG[item.type];
  const Icon = config.icon;
  const days = daysUntil(item.refillDate);
  const refillSoon = days <= 7 && days >= 0;

  return (
    <div
      className={cn(
        "rounded-3xl border bg-card p-5 shadow-soft sm:p-6",
        item.status === "paused" ? "border-border opacity-70" : "border-border"
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
              config.badgeClass
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-base font-bold text-brown sm:text-lg">
              {item.name}
            </h3>
            <p className="mt-0.5 text-sm font-semibold text-terracotta-dark">
              {item.dosage}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <Badge className={cn("px-3 py-1", config.badgeClass)}>
            {item.type}
          </Badge>
          {item.status === "paused" && (
            <Badge className="gap-1 bg-muted px-3 py-1 text-muted-foreground">
              <PauseCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Paused
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-2 rounded-2xl bg-cream-soft p-3 text-sm text-brown">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark" aria-hidden="true" />
          <div>
            <p className="font-semibold">Schedule</p>
            <p className="text-brown-soft">{item.frequency}</p>
          </div>
        </div>
        <div
          className={cn(
            "flex items-start gap-2 rounded-2xl p-3 text-sm",
            refillSoon
              ? "bg-gold/15 text-brown"
              : "bg-cream-soft text-brown"
          )}
        >
          <RefreshCw
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              refillSoon ? "text-gold" : "text-sage-dark"
            )}
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold">
              Next refill / visit
              {refillSoon && (
                <span className="ml-2 text-xs font-bold uppercase tracking-wide text-terracotta-dark">
                  Due soon
                </span>
              )}
            </p>
            <p className="text-brown-soft">{formatDate(item.refillDate)}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-2xl bg-cream-soft p-3 text-sm text-brown-soft">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
        <p>{item.instructions}</p>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold text-brown">30-day adherence</p>
          <p className={cn("font-display font-extrabold", adherenceColor(item.adherence))}>
            {item.adherence}%
          </p>
        </div>
        <Progress value={item.adherence} className="mt-2 h-2" />
      </div>
    </div>
  );
}

export default function PortalProtocolPage() {
  const activeItems = protocolItems.filter((i) => i.status === "active");
  const pausedItems = protocolItems.filter((i) => i.status === "paused");
  const overallAdherence = Math.round(
    activeItems.reduce((sum, i) => sum + i.adherence, 0) / (activeItems.length || 1)
  );

  return (
    <div>
      <PortalPageHeader
        title="Your Protocol"
        description="Medications, supplements, and therapies prescribed by your care team — with dosing, schedule, and adherence."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-brown-soft">
            Active items
          </p>
          <p className="mt-1 font-display text-3xl font-extrabold text-brown">
            {activeItems.length}
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-brown-soft">
            Overall adherence
          </p>
          <p className={cn("mt-1 font-display text-3xl font-extrabold", adherenceColor(overallAdherence))}>
            {overallAdherence}%
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-brown-soft">
            Next refill due
          </p>
          <p className="mt-1 font-display text-lg font-extrabold text-brown">
            {formatDate(
              [...activeItems].sort(
                (a, b) => new Date(a.refillDate).getTime() - new Date(b.refillDate).getTime()
              )[0]?.refillDate ?? ""
            )}
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-terracotta-light/50 bg-terracotta-light/15 p-4 text-sm leading-relaxed text-brown sm:p-5">
        <p className="font-semibold text-terracotta-dark">Care team note</p>
        <p className="mt-1">{protocolNotes}</p>
      </div>

      <div className="space-y-4">
        {activeItems.map((item) => (
          <ProtocolCard key={item.id} item={item} />
        ))}
      </div>

      {pausedItems.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-display text-lg font-bold text-brown">
            Paused
          </h2>
          <div className="space-y-4">
            {pausedItems.map((item) => (
              <ProtocolCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      <p className="mt-8 text-center text-xs text-brown-soft">
        Need a refill or have a question about your protocol?{" "}
        <a href="/portal/messages" className="font-semibold text-terracotta-dark hover:underline">
          Message your care team
        </a>
        .
      </p>
    </div>
  );
}
