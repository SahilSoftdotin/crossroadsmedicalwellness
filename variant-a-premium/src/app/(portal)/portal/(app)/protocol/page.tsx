import type { Metadata } from "next";
import { Pill, Syringe, Sparkles, CircleCheck, RefreshCw } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PortalPageHeader } from "@/components/portal/page-header";
import { StatCard } from "@/components/portal/stat-card";
import { AdherenceChart } from "@/components/portal/adherence-chart";
import { protocol, type ProtocolItem } from "@/lib/data/protocol";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "My Protocol" };

const typeIcon: Record<ProtocolItem["type"], typeof Pill> = {
  medication: Syringe,
  hormone: Sparkles,
  supplement: Pill,
};

const typeBadge: Record<ProtocolItem["type"], "default" | "accent" | "outline"> = {
  medication: "default",
  hormone: "accent",
  supplement: "outline",
};

function refillStatus(item: ProtocolItem) {
  if (item.refillsRemaining === 0) return { label: "Provider-administered", variant: "outline" as const };
  if (item.refillsRemaining <= 1) return { label: `${item.refillsRemaining} refill left`, variant: "warning" as const };
  return { label: `${item.refillsRemaining} refills left`, variant: "success" as const };
}

export default function ProtocolPage() {
  return (
    <div className="flex flex-col gap-8">
      <PortalPageHeader
        eyebrow="Treatment plan"
        title="My Protocol"
        description={`${protocol.name} · started ${formatDate(protocol.startedOn)}. Designed and reviewed by ${protocol.reviewedBy}.`}
        action={
          <Button variant="outline" size="sm">
            <RefreshCw className="size-4" aria-hidden="true" />
            Request refill
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Active items"
          value={protocol.items.length}
          accent="forest"
          icon={<Pill className="size-5" aria-hidden="true" />}
        />
        <StatCard
          label="Overall adherence"
          value={`${protocol.overallAdherence}%`}
          sublabel="Last 8 weeks"
          accent="success"
          icon={<CircleCheck className="size-5" aria-hidden="true" />}
        />
        <StatCard
          label="Last reviewed"
          value={formatDate(protocol.lastReviewed, { month: "short", day: "numeric" })}
          sublabel={protocol.reviewedBy}
          accent="brass"
          icon={<Sparkles className="size-5" aria-hidden="true" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Items */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {protocol.items.map((item) => {
            const Icon = typeIcon[item.type];
            const refill = refillStatus(item);
            return (
              <Card key={item.id}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-100)] text-[var(--forest-700)]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-[var(--foreground)]">{item.name}</h3>
                        <Badge variant={typeBadge[item.type]} className="capitalize">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">{item.purpose}</p>

                      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
                        <div>
                          <dt className="text-xs text-[var(--charcoal-400)]">Dose</dt>
                          <dd className="font-medium text-[var(--foreground)]">{item.dose}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-[var(--charcoal-400)]">Schedule</dt>
                          <dd className="font-medium text-[var(--foreground)]">{item.schedule}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-[var(--charcoal-400)]">Next refill</dt>
                          <dd className="font-medium text-[var(--foreground)]">
                            {formatDate(item.nextRefill, { month: "short", day: "numeric" })}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-[var(--charcoal-400)]">Refills</dt>
                          <dd>
                            <Badge variant={refill.variant}>{refill.label}</Badge>
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-[var(--muted-foreground)]">Adherence</span>
                          <span className="font-medium text-[var(--foreground)]">{item.adherence}%</span>
                        </div>
                        <Progress
                          value={item.adherence}
                          indicatorClassName={item.adherence >= 90 ? "bg-[var(--success)]" : "bg-[var(--warning)]"}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Adherence trend */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Adherence trend</CardTitle>
              <CardDescription>Weekly average across all items</CardDescription>
            </CardHeader>
            <CardContent>
              <AdherenceChart data={protocol.adherenceTrend} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notes from your provider</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-[var(--muted-foreground)]">
              <p>
                Your protocol is working well. We&apos;ll reassess hormone dosing and GLP-1 titration at your
                next quarterly review and adjust based on your latest labs.
              </p>
              <Separator className="my-4" />
              <p className="text-xs">
                This is illustrative demo data — not medical advice. Always follow your physician&apos;s
                guidance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
