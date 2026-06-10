import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  Pill,
  TestTube,
  TrendingDown,
  Activity,
  MessageSquare,
  ArrowRight,
  CircleCheck,
  Clock,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "@/components/portal/stat-card";
import { LabStatusBadge } from "@/components/portal/status-badge";
import { patient } from "@/lib/data/patient";
import { nextAppointment } from "@/lib/data/appointments";
import { protocol } from "@/lib/data/protocol";
import { labPanels, labSummary } from "@/lib/data/labs";
import { progress } from "@/lib/data/progress";
import { messageThread } from "@/lib/data/messages";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function PortalDashboardPage() {
  const summary = labSummary();
  const weightLost = progress.weight.start - progress.weight.current;
  const latestHighlights = labPanels
    .flatMap((p) => p.biomarkers)
    .filter((b) => b.note)
    .slice(0, 3);
  const lastMessage = messageThread.messages[messageThread.messages.length - 1];

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting */}
      <div>
        <p className="eyebrow mb-1.5">{formatDate(new Date(), { weekday: "long", month: "long", day: "numeric" })}</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          {greeting()}, {patient.firstName}.
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--muted-foreground)]">
          Here&apos;s a snapshot of your{" "}
          <span className="font-medium text-[var(--foreground)]">{patient.program}</span>{" "}
          journey. You&apos;re tracking beautifully — keep it up.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Protocol adherence"
          value={`${protocol.overallAdherence}%`}
          sublabel="Last 8 weeks"
          accent="success"
          icon={<Pill className="size-5" aria-hidden="true" />}
        />
        <StatCard
          label="Weight change"
          value={`-${weightLost} ${progress.weight.unit}`}
          sublabel={`${progress.weight.current} ${progress.weight.unit} · goal ${progress.weight.goal}`}
          accent="brass"
          icon={<TrendingDown className="size-5" aria-hidden="true" />}
        />
        <StatCard
          label="Biomarkers optimal"
          value={`${summary.optimal}/${summary.total}`}
          sublabel={`${summary.borderline} borderline`}
          accent="forest"
          icon={<TestTube className="size-5" aria-hidden="true" />}
        />
        <StatCard
          label="Energy score"
          value={`${progress.energyScore[progress.energyScore.length - 1].value}/10`}
          sublabel={`Up from ${progress.energyScore[0].value} at baseline`}
          accent="warning"
          icon={<Activity className="size-5" aria-hidden="true" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Next appointment */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Next appointment</CardTitle>
              <CardDescription>Your upcoming visit with the care team</CardDescription>
            </div>
            <CalendarDays className="size-5 text-[var(--brass-600)]" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            {nextAppointment ? (
              <div className="flex flex-col gap-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="grid size-14 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-800)] text-[var(--primary-foreground)]">
                    <span className="text-xs uppercase tracking-wide text-[var(--brass-400)]">
                      {formatDate(nextAppointment.date, { month: "short" })}
                    </span>
                    <span className="font-display text-xl font-semibold leading-none">
                      {formatDate(nextAppointment.date, { day: "numeric" })}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">{nextAppointment.title}</p>
                    <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">
                      {nextAppointment.time} · {nextAppointment.provider}
                    </p>
                    <Badge variant="accent" className="mt-2">
                      {nextAppointment.type}
                    </Badge>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portal/appointments">View details</Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-[var(--muted-foreground)]">No upcoming appointments.</p>
            )}
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {[
              { href: "/portal/messages", label: "Message care team", icon: MessageSquare },
              { href: "/portal/labs", label: "Review latest labs", icon: TestTube },
              { href: "/portal/protocol", label: "Check refills", icon: Pill },
              { href: "/portal/appointments", label: "Request appointment", icon: CalendarDays },
            ].map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-muted)]"
              >
                <Icon className="size-[1.1rem] text-[var(--brass-600)]" aria-hidden="true" />
                <span className="flex-1">{label}</span>
                <ArrowRight className="size-4 text-[var(--charcoal-400)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Protocol summary */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Current protocol</CardTitle>
              <CardDescription>
                Last reviewed {formatDate(protocol.lastReviewed)} by {protocol.reviewedBy}
              </CardDescription>
            </div>
            <Button asChild variant="link" size="sm">
              <Link href="/portal/protocol">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {protocol.items.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--border)] px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-[var(--foreground)]">{item.name}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {item.dose} · {item.schedule}
                  </p>
                </div>
                <Badge variant="outline" className="shrink-0 capitalize">
                  {item.type}
                </Badge>
              </div>
            ))}
            <Separator className="my-1" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Overall adherence</span>
              <span className="font-semibold text-[var(--foreground)]">{protocol.overallAdherence}%</span>
            </div>
            <Progress value={protocol.overallAdherence} indicatorClassName="bg-[var(--success)]" />
          </CardContent>
        </Card>

        {/* Lab highlights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lab highlights</CardTitle>
            <CardDescription>From your {formatDate(labPanels[0].collectedOn)} panel</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {latestHighlights.map((b) => (
              <div key={b.id} className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[var(--foreground)]">{b.name}</span>
                  <LabStatusBadge status={b.status} />
                </div>
                <span className="font-display text-lg font-semibold text-[var(--foreground)]">
                  {b.value}
                  <span className="ml-1 text-xs font-normal text-[var(--muted-foreground)]">{b.unit}</span>
                </span>
              </div>
            ))}
            <Button asChild variant="subtle" size="sm" className="mt-1">
              <Link href="/portal/labs">See all biomarkers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Care team message preview */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-lg">From your care team</CardTitle>
          <Button asChild variant="link" size="sm">
            <Link href="/portal/messages">Open inbox</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 rounded-[var(--radius-md)] bg-[var(--surface-muted)] p-4">
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-medium ${
                lastMessage.author === "care-team"
                  ? "bg-[var(--forest-800)] text-[var(--primary-foreground)]"
                  : "bg-[var(--brass-200)] text-[var(--brass-700)]"
              }`}
              aria-hidden="true"
            >
              {lastMessage.initials}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-[var(--foreground)]">{lastMessage.name}</p>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                  {lastMessage.author === "care-team" ? (
                    <CircleCheck className="size-3.5 text-[var(--success)]" aria-hidden="true" />
                  ) : (
                    <Clock className="size-3.5" aria-hidden="true" />
                  )}
                  {formatDate(lastMessage.timestamp, { month: "short", day: "numeric" })}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-[var(--muted-foreground)]">{lastMessage.body}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
