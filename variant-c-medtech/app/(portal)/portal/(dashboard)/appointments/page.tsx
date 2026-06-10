import type { Metadata } from "next";
import { CalendarDays, MapPin, Phone, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appointments } from "@/lib/data/appointments";
import { clinic } from "@/lib/data/clinic";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Appointments",
};

const statusStyles: Record<string, string> = {
  Upcoming: "bg-accent-soft text-primary",
  Completed: "bg-success/15 text-success",
  Cancelled: "bg-muted text-muted-foreground",
};

export default function PortalAppointmentsPage() {
  const upcoming = appointments
    .filter((a) => a.status === "Upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = appointments
    .filter((a) => a.status !== "Upcoming")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">Appointments</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Appointments are arranged by phone, text, or our contact form.
          </p>
        </div>
        <Button asChild>
          <a href={clinic.phoneHref}>
            <Phone data-icon="inline-start" />
            Call to schedule
          </a>
        </Button>
      </div>

      <section>
        <h2 className="font-display text-lg font-semibold text-primary">Upcoming</h2>
        {upcoming.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {upcoming.map((appt) => (
              <Card key={appt.id} className="rounded-2xl border-0 shadow-card ring-1 ring-border">
                <CardContent className="space-y-3 px-5 py-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <CalendarDays className="size-4.5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold text-primary">{appt.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(appt.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })} ·{" "}
                          {appt.time}
                        </p>
                      </div>
                    </div>
                    <Badge className={statusStyles[appt.status]}>{appt.status}</Badge>
                  </div>
                  <dl className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="size-3.5 shrink-0" aria-hidden="true" />
                      {appt.provider}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                      {appt.location}
                    </div>
                  </dl>
                  {appt.notes && (
                    <p className="rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
                      {appt.notes}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">No upcoming appointments scheduled.</p>
        )}
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-primary">Past Visits</h2>
        <div className="mt-4 space-y-3">
          {past.map((appt) => (
            <Card key={appt.id} className="rounded-2xl border-0 shadow-card ring-1 ring-border">
              <CardContent className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-xl",
                      appt.status === "Cancelled" ? "bg-muted text-muted-foreground" : "bg-secondary text-foreground"
                    )}
                  >
                    <CalendarDays className="size-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-primary">{appt.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(appt.date, { month: "long", day: "numeric", year: "numeric" })} · {appt.time} ·{" "}
                      {appt.provider}
                    </p>
                    {appt.notes && <p className="mt-1 text-xs text-muted-foreground">{appt.notes}</p>}
                  </div>
                </div>
                <Badge className={statusStyles[appt.status]}>{appt.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
