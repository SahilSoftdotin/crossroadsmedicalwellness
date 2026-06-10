export type Appointment = {
  id: string;
  type: string;
  provider: string;
  date: string; // ISO date
  time: string;
  location: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  notes?: string;
};

export const appointments: Appointment[] = [
  {
    id: "appt-upcoming-1",
    type: "Pellet Insertion Follow-up",
    provider: "Dr. Gary Adams",
    date: "2026-08-12",
    time: "10:30 AM",
    location: "Crossroads Medical Wellness — Athens, AL",
    status: "Upcoming",
    notes: "Bring a list of any new medications or supplements since your last visit.",
  },
  {
    id: "appt-upcoming-2",
    type: "Lab Draw",
    provider: "Hannah Brooks, RN",
    date: "2026-07-29",
    time: "9:00 AM",
    location: "Crossroads Medical Wellness — Athens, AL",
    status: "Upcoming",
    notes: "Fasting required — please don't eat for 8-10 hours prior.",
  },
  {
    id: "appt-past-1",
    type: "Quarterly Check-in",
    provider: "Dr. Gary Adams",
    date: "2026-05-14",
    time: "2:00 PM",
    location: "Crossroads Medical Wellness — Athens, AL",
    status: "Completed",
    notes: "Reviewed lab results — testosterone and metabolic markers trending toward goal range.",
  },
  {
    id: "appt-past-2",
    type: "Lab Draw",
    provider: "Hannah Brooks, RN",
    date: "2026-05-07",
    time: "8:30 AM",
    location: "Crossroads Medical Wellness — Athens, AL",
    status: "Completed",
  },
  {
    id: "appt-past-3",
    type: "Pellet Insertion",
    provider: "Dr. Gary Adams",
    date: "2026-02-12",
    time: "11:00 AM",
    location: "Crossroads Medical Wellness — Athens, AL",
    status: "Completed",
    notes: "Procedure went smoothly. Follow-up scheduled for ~3 months.",
  },
  {
    id: "appt-past-4",
    type: "Initial Consultation",
    provider: "Dr. Gary Adams",
    date: "2025-08-14",
    time: "1:00 PM",
    location: "Crossroads Medical Wellness — Athens, AL",
    status: "Completed",
    notes: "Reviewed health history and goals. Ordered baseline labs.",
  },
];

export function getNextAppointment(): Appointment | undefined {
  return appointments
    .filter((a) => a.status === "Upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
}
