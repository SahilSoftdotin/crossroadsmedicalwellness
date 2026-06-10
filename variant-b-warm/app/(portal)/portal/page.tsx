import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FlaskConical,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { patient } from "@/lib/data/patient";
import { appointments } from "@/lib/data/appointments";
import { protocolItems } from "@/lib/data/protocol";
import { labPanels, getBiomarkerStatus } from "@/lib/data/labs";
import { goals } from "@/lib/data/progress";
import { messageThreads } from "@/lib/data/messages";

export const metadata: Metadata = {
  title: "Portal Dashboard",
  description: "Your Crossroads Medical Wellness patient portal dashboard.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function PortalDashboardPage() {
  const nextAppointment = appointments.find((a) => a.status === "upcoming");
  const activeProtocol = protocolItems.filter((p) => p.status === "active");
  const allBiomarkers = labPanels.flatMap((p) => p.biomarkers);
  const flaggedBiomarkers = allBiomarkers.filter((b) => {
    const s = getBiomarkerStatus(b);
    return s === "watch" || s === "low" || s === "high";
  });
  const unreadMessages = messageThreads.filter((t) => t.unread).length;

  return (
    <div>
      <PortalPageHeader
        title={`Welcome back, ${patient.firstName}!`}
        description="Here's a snapshot of your care plan and recent progress."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Next appointment */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
              <CalendarDays className="h-5 w-5 text-terracotta" />
              Next Appointment
            </h2>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link href="/portal/appointments">
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          {nextAppointment ? (
            <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-cream-soft p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-base font-bold text-brown">
                  {nextAppointment.type}
                </p>
                <p className="mt-1 text-sm text-brown-soft">
                  with {nextAppointment.provider} &middot;{" "}
                  {nextAppointment.location}
                </p>
                {nextAppointment.notes && (
                  <p className="mt-2 text-xs text-brown-soft">
                    Note: {nextAppointment.notes}
                  </p>
                )}
              </div>
              <div className="rounded-2xl bg-terracotta px-5 py-3 text-center text-primary-foreground">
                <p className="text-xs font-bold uppercase tracking-wider">
                  {formatDate(nextAppointment.date)}
                </p>
                <p className="font-display text-xl font-extrabold">
                  {nextAppointment.time}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-brown-soft">
              No upcoming appointments scheduled.
            </p>
          )}
        </div>

        {/* Quick actions */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold text-brown">
            Quick Actions
          </h2>
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild variant="outline" className="justify-start rounded-2xl">
              <Link href="/portal/labs">
                <FlaskConical className="h-4 w-4" />
                View latest labs
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start rounded-2xl">
              <Link href="/portal/protocol">
                <ClipboardList className="h-4 w-4" />
                Review protocol
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start rounded-2xl">
              <Link href="/portal/messages">
                <MessageSquare className="h-4 w-4" />
                Message care team
                {unreadMessages > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-primary-foreground">
                    {unreadMessages}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {/* Protocol summary */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
              <ClipboardList className="h-5 w-5 text-terracotta" />
              Current Protocol
            </h2>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link href="/portal/protocol">
                View details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {activeProtocol.slice(0, 4).map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-brown">{item.name}</p>
                  <p className="truncate text-xs text-brown-soft">
                    {item.dosage} &middot; {item.frequency}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-sage-light px-3 py-1 text-xs font-bold text-sage-dark">
                  {item.type}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lab highlights */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
              <FlaskConical className="h-5 w-5 text-terracotta" />
              Lab Highlights
            </h2>
          </div>
          <div className="mt-4 space-y-3">
            {flaggedBiomarkers.length === 0 ? (
              <div className="flex items-center gap-2 rounded-2xl bg-sage-light/40 p-3 text-sm text-sage-dark">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                All recent markers are within range.
              </div>
            ) : (
              flaggedBiomarkers.slice(0, 3).map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-2 rounded-2xl bg-cream-soft p-3 text-sm text-brown"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-gold" />
                  <span className="truncate">
                    {b.name}: {b.history[b.history.length - 1].value} {b.unit}
                  </span>
                </div>
              ))
            )}
            <Button asChild variant="ghost" size="sm" className="w-full rounded-full">
              <Link href="/portal/labs">
                View all labs
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Progress snapshot */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
              <TrendingUp className="h-5 w-5 text-terracotta" />
              Progress Snapshot
            </h2>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link href="/portal/progress">
                View progress
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {goals.map((goal) => {
              const totalRange = Math.abs(goal.target - goal.startValue);
              const progressed = Math.abs(goal.current - goal.startValue);
              const pct = totalRange === 0 ? 100 : Math.min(100, Math.round((progressed / totalRange) * 100));
              return (
                <div key={goal.id}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold text-brown">{goal.title}</p>
                    <p className="font-display text-sm font-bold text-terracotta-dark">
                      {goal.current}{goal.unit}
                    </p>
                  </div>
                  <Progress value={pct} className="mt-2 h-2" />
                  <p className="mt-1.5 text-xs text-brown-soft">
                    Goal: {goal.target}{goal.unit}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
