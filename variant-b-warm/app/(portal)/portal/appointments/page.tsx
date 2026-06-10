import type { Metadata } from "next";
import {
  CalendarDays,
  MapPin,
  Phone,
  Video,
  CheckCircle2,
  XCircle,
  Clock3,
  Info,
} from "lucide-react";
import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { Badge } from "@/components/ui/badge";
import { appointments, type Appointment } from "@/lib/data/appointments";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Appointments",
  description: "Your upcoming and past appointments at Crossroads Medical Wellness.",
};

const LOCATION_ICONS: Record<Appointment["location"], typeof MapPin> = {
  "In-Office": MapPin,
  "Phone Follow-up": Phone,
  Telehealth: Video,
};

const STATUS_CONFIG: Record<
  Appointment["status"],
  { label: string; badgeClass: string; icon: typeof CheckCircle2 }
> = {
  upcoming: {
    label: "Upcoming",
    badgeClass: "bg-terracotta-light/40 text-terracotta-dark",
    icon: Clock3,
  },
  completed: {
    label: "Completed",
    badgeClass: "bg-sage-light text-sage-dark",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    badgeClass: "bg-muted text-muted-foreground",
    icon: XCircle,
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const LocationIcon = LOCATION_ICONS[appointment.location];
  const status = STATUS_CONFIG[appointment.status];
  const StatusIcon = status.icon;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-cream-soft">
            <CalendarDays className="h-5 w-5 text-terracotta" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-base font-bold text-brown sm:text-lg">
              {appointment.type}
            </h3>
            <p className="mt-0.5 text-sm text-brown-soft">
              {formatDate(appointment.date)} &middot; {appointment.time}
            </p>
            <p className="mt-0.5 text-sm text-brown-soft">
              with {appointment.provider}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <Badge className={cn("gap-1.5 px-3 py-1", status.badgeClass)}>
            <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {status.label}
          </Badge>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-brown-soft">
            <LocationIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {appointment.location}
          </span>
        </div>
      </div>
      {appointment.notes && (
        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-cream-soft p-3 text-sm text-brown-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
          <p>{appointment.notes}</p>
        </div>
      )}
    </div>
  );
}

export default function PortalAppointmentsPage() {
  const upcoming = appointments
    .filter((a) => a.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = appointments
    .filter((a) => a.status !== "upcoming")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <PortalPageHeader
        title="Appointments"
        description="View your upcoming and past visits. To schedule, reschedule, or cancel, call or text our office — appointments aren't booked online."
      />

      <section aria-labelledby="upcoming-heading" className="mb-10">
        <h2 id="upcoming-heading" className="mb-4 font-display text-xl font-extrabold text-brown">
          Upcoming
        </h2>
        {upcoming.length > 0 ? (
          <div className="space-y-4">
            {upcoming.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} />
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-border bg-card p-6 text-sm text-brown-soft shadow-soft">
            You have no upcoming appointments. Call or text us at (256) 434-9301 / (256) 608-4111 to schedule.
          </p>
        )}
      </section>

      <section aria-labelledby="past-heading">
        <h2 id="past-heading" className="mb-4 font-display text-xl font-extrabold text-brown">
          Past Visits
        </h2>
        <div className="space-y-4">
          {past.map((appt) => (
            <AppointmentCard key={appt.id} appointment={appt} />
          ))}
        </div>
      </section>

      <div className="mt-8 rounded-2xl bg-cream-soft p-4 text-center text-sm leading-relaxed text-brown-soft">
        Need to schedule a new appointment?{" "}
        <a href="tel:+12564349301" className="font-semibold text-terracotta-dark hover:underline">
          Call (256) 434-9301
        </a>{" "}
        or{" "}
        <a href="sms:+12566084111" className="font-semibold text-terracotta-dark hover:underline">
          text (256) 608-4111
        </a>
        .
      </div>
    </div>
  );
}
