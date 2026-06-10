import type { Metadata } from "next";
import { MapPin, User, CalendarPlus, CircleCheck, CalendarClock } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PortalPageHeader } from "@/components/portal/page-header";
import {
  upcomingAppointments,
  pastAppointments,
  type Appointment,
} from "@/lib/data/appointments";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Appointments" };

function AppointmentRow({ a }: { a: Appointment }) {
  const upcoming = a.status === "upcoming";
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={
              "grid size-14 shrink-0 place-items-center rounded-[var(--radius-md)] " +
              (upcoming
                ? "bg-[var(--forest-800)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)]")
            }
          >
            <span className={"text-xs uppercase tracking-wide " + (upcoming ? "text-[var(--brass-400)]" : "text-[var(--muted-foreground)]")}>
              {formatDate(a.date, { month: "short" })}
            </span>
            <span className="font-display text-xl font-semibold leading-none">
              {formatDate(a.date, { day: "numeric" })}
            </span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium text-[var(--foreground)]">{a.title}</h3>
              <Badge variant={upcoming ? "accent" : "outline"}>{a.type}</Badge>
            </div>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              {formatDate(a.date, { weekday: "long", month: "long", day: "numeric" })} · {a.time}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--muted-foreground)]">
              <span className="inline-flex items-center gap-1.5">
                <User className="size-3.5" aria-hidden="true" />
                {a.provider}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden="true" />
                {a.location}
              </span>
            </div>
            {a.notes ? (
              <p className="mt-2 rounded-[var(--radius-sm)] bg-[var(--surface-muted)] px-3 py-2 text-xs text-[var(--muted-foreground)]">
                {a.notes}
              </p>
            ) : null}
          </div>
        </div>
        <div className="shrink-0">
          {upcoming ? (
            <Button variant="outline" size="sm">
              Manage
            </Button>
          ) : (
            <Badge variant="success">
              <CircleCheck className="size-3.5" aria-hidden="true" />
              Completed
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PortalPageHeader
        eyebrow="Visits"
        title="Appointments"
        description="Your scheduled and past visits. Booking is handled by phone or text — request a time and the team will confirm."
        action={
          <Button variant="primary" size="sm">
            <CalendarPlus className="size-4" aria-hidden="true" />
            Request appointment
          </Button>
        }
      />

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            <CalendarClock className="mr-1.5 size-4" aria-hidden="true" />
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="flex flex-col gap-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((a) => <AppointmentRow key={a.id} a={a} />)
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-sm text-[var(--muted-foreground)]">
                No upcoming appointments. Request one above.
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="flex flex-col gap-4">
          {pastAppointments.map((a) => (
            <AppointmentRow key={a.id} a={a} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
