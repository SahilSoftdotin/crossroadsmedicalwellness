export type Appointment = {
  id: string;
  type: string;
  provider: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: "In-Office" | "Phone Follow-up" | "Telehealth";
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
};

export const appointments: Appointment[] = [
  {
    id: "appt-1",
    type: "Hormone Optimization Follow-up",
    provider: "Dr. Gary Adams",
    date: "2026-06-24",
    time: "10:30 AM",
    location: "In-Office",
    status: "upcoming",
    notes: "Bring current supplement bottles for review.",
  },
  {
    id: "appt-2",
    type: "Lab Draw — Quarterly Panel",
    provider: "Crossroads Lab Team",
    date: "2026-06-24",
    time: "10:00 AM",
    location: "In-Office",
    status: "upcoming",
  },
  {
    id: "appt-3",
    type: "Weight Loss Check-in",
    provider: "Mia Chen, RN",
    date: "2026-05-20",
    time: "2:00 PM",
    location: "Phone Follow-up",
    status: "completed",
    notes: "Reviewed semaglutide titration; no side effects reported.",
  },
  {
    id: "appt-4",
    type: "BioTE Pellet Insertion",
    provider: "Dr. Gary Adams",
    date: "2026-03-04",
    time: "9:15 AM",
    location: "In-Office",
    status: "completed",
  },
  {
    id: "appt-5",
    type: "Initial Consultation",
    provider: "Dr. Gary Adams",
    date: "2025-09-15",
    time: "11:00 AM",
    location: "In-Office",
    status: "completed",
    notes: "Comprehensive intake and baseline labs ordered.",
  },
];
