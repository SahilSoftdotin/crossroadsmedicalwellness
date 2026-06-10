import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FlaskConical,
  MessageSquare,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { LabStatusBadge } from "@/components/portal/status-badge";
import { patient } from "@/lib/data/patient";
import { getNextAppointment } from "@/lib/data/appointments";
import { protocolItems, protocolSummary } from "@/lib/data/protocol";
import { getAllBiomarkers, getBiomarkerStatus, labsLastUpdated } from "@/lib/data/labs";
import { goals, weightHistory } from "@/lib/data/progress";
import { messageThread } from "@/lib/data/messages";
import { formatDate, formatDateTime, goalProgressPercent } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function PortalDashboardPage() {
  const nextAppointment = getNextAppointment();
  const biomarkers = getAllBiomarkers();
  const highlightIds = ["total-testosterone", "vitamin-d", "hba1c", "crp"];
  const highlights = highlightIds
    .map((id) => biomarkers.find((b) => b.id === id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const weight = weightHistory[weightHistory.length - 1];
  const startWeight = weightHistory[0];
  const weightChange = weight.weightLbs - startWeight.weightLbs;

  const refillsDue = protocolItems.filter((item) => item.refillStatus !== "On track");
  const latestMessage = messageThread[messageThread.length - 1];

  return (
    <div className="space-y-8">
      {/* Mobile-only greeting (desktop header already shows this) */}
      <div className="lg:hidden">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {patient.programName}
        </p>
        <h1 className="font-display text-2xl font-semibold text-primary">
          Welcome back, {patient.firstName}
        </h1>
      </div>

      {/* Top row: next appointment + weight + adherence */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border lg:col-span-1">
          <CardHeader className="flex-row items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-primary">
              <CalendarDays className="size-4.5 text-accent" aria-hidden="true" />
              Next Appointment
            </CardTitle>
            {nextAppointment && <Badge variant="secondary">{nextAppointment.status}</Badge>}
          </CardHeader>
          <CardContent>
            {nextAppointment ? (
              <>
                <p className="font-display text-xl font-semibold text-primary">{nextAppointment.type}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(nextAppointment.date, { weekday: "long", month: "long", day: "numeric" })} at{" "}
                  {nextAppointment.time}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">with {nextAppointment.provider}</p>
                {nextAppointment.notes && (
                  <p className="mt-3 rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
                    {nextAppointment.notes}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming appointments scheduled.</p>
            )}
            <Button variant="link" className="mt-2 px-0 text-primary" asChild>
              <Link href="/portal/appointments">
                View all appointments
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingDown className="size-4.5 text-accent" aria-hidden="true" />
              Progress Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Body Weight</p>
              <p className="mt-1 font-display text-3xl font-semibold text-primary">
                {weight.weightLbs} <span className="text-base font-normal text-muted-foreground">lbs</span>
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-success">
                <TrendingDown className="size-3.5" aria-hidden="true" />
                {Math.abs(weightChange)} lbs since {formatDate(startWeight.date, { month: "short", year: "numeric" })}
              </p>
            </div>
            <div className="space-y-3">
              {goals.slice(0, 2).map((goal) => {
                const pct = goalProgressPercent(goal.current, goal.target, goal.direction);
                return (
                  <div key={goal.id}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">{goal.label}</span>
                      <span className="text-muted-foreground">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                    </div>
                    <Progress value={pct} className="mt-1.5">
                      <ProgressTrack>
                        <ProgressIndicator />
                      </ProgressTrack>
                    </Progress>
                  </div>
                );
              })}
            </div>
            <Button variant="link" className="px-0 text-primary" asChild>
              <Link href="/portal/progress">
                View full progress
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <ClipboardList className="size-4.5 text-accent" aria-hidden="true" />
              Protocol Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">{protocolSummary.programName}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Started {formatDate(protocolSummary.startDate, { month: "long", day: "numeric", year: "numeric" })} ·{" "}
                {protocolSummary.physician}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Overall adherence</span>
                <span className="text-muted-foreground">{protocolSummary.overallAdherence}%</span>
              </div>
              <Progress value={protocolSummary.overallAdherence} className="mt-1.5">
                <ProgressTrack>
                  <ProgressIndicator />
                </ProgressTrack>
              </Progress>
            </div>
            {refillsDue.length > 0 && (
              <div className="rounded-lg bg-warning/15 p-3 text-xs text-warning-foreground">
                <span className="font-semibold">{refillsDue.length} item{refillsDue.length > 1 ? "s" : ""}</span>{" "}
                need attention: {refillsDue.map((i) => i.name).join(", ")}
              </div>
            )}
            <Button variant="link" className="px-0 text-primary" asChild>
              <Link href="/portal/protocol">
                View protocol
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Latest labs */}
      <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border">
        <CardHeader className="flex-row items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-primary">
            <FlaskConical className="size-4.5 text-accent" aria-hidden="true" />
            Latest Lab Highlights
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Updated {formatDate(labsLastUpdated, { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((b) => {
              const status = getBiomarkerStatus(b);
              const latest = b.history[b.history.length - 1];
              const previous = b.history[b.history.length - 2];
              const delta = previous ? latest.value - previous.value : 0;
              return (
                <div key={b.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-muted-foreground">{b.name}</p>
                    <LabStatusBadge status={status} />
                  </div>
                  <p className="mt-2 font-display text-2xl font-semibold text-primary">
                    {latest.value} <span className="text-sm font-normal text-muted-foreground">{b.unit}</span>
                  </p>
                  {previous && (
                    <p className={`mt-1 flex items-center gap-1 text-xs ${delta === 0 ? "text-muted-foreground" : delta > 0 ? "text-success" : "text-success"}`}>
                      {delta > 0 ? (
                        <TrendingUp className="size-3.5" aria-hidden="true" />
                      ) : delta < 0 ? (
                        <TrendingDown className="size-3.5" aria-hidden="true" />
                      ) : null}
                      {delta === 0 ? "No change" : `${delta > 0 ? "+" : ""}${delta} since last draw`}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <Button variant="link" className="mt-4 px-0 text-primary" asChild>
            <Link href="/portal/labs">
              View all biomarkers
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Bottom row: messages + quick actions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-primary">
              <MessageSquare className="size-4.5 text-accent" aria-hidden="true" />
              Latest Message
            </CardTitle>
            <Badge variant="secondary">{patient.careTeam[1]?.role}</Badge>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-semibold text-primary">{latestMessage.authorName}</p>
                <p className="text-xs text-muted-foreground">{formatDateTime(latestMessage.date)}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{latestMessage.body}</p>
            </div>
            <Button variant="link" className="mt-3 px-0 text-primary" asChild>
              <Link href="/portal/messages">
                Open messages
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/portal/messages">
                <MessageSquare data-icon="inline-start" />
                Message care team
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/portal/appointments">
                <CalendarDays data-icon="inline-start" />
                View appointments
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/portal/protocol">
                <ClipboardList data-icon="inline-start" />
                Request a refill
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/contact">
                <ArrowRight data-icon="inline-start" />
                Contact the clinic
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
