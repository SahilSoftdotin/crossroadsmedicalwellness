export type Appointment = {
  id: string;
  title: string;
  type: "Consultation" | "Lab Draw" | "Pellet Insertion" | "Follow-up" | "Telehealth";
  date: string; // ISO
  time: string;
  provider: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
};

export const appointments: Appointment[] = [
  {
    id: "a1",
    title: "Quarterly Protocol Review",
    type: "Follow-up",
    date: "2026-06-24",
    time: "10:30 AM",
    provider: "Dr. Gary Adams",
    location: "Crossroads Medical Wellness — Athens, AL",
    status: "upcoming",
    notes: "Review latest labs and adjust protocol as needed.",
  },
  {
    id: "a2",
    title: "Testosterone Pellet Insertion",
    type: "Pellet Insertion",
    date: "2026-07-15",
    time: "2:00 PM",
    provider: "Dr. Gary Adams",
    location: "Crossroads Medical Wellness — Athens, AL",
    status: "upcoming",
  },
  {
    id: "a3",
    title: "Comprehensive Lab Draw",
    type: "Lab Draw",
    date: "2026-05-20",
    time: "8:15 AM",
    provider: "Morgan Reece, RN",
    location: "Crossroads Medical Wellness — Athens, AL",
    status: "completed",
    notes: "Hormones, metabolic, lipids and micronutrients collected.",
  },
  {
    id: "a4",
    title: "Telehealth Check-in",
    type: "Telehealth",
    date: "2026-04-02",
    time: "11:00 AM",
    provider: "Dr. Gary Adams",
    location: "Video visit",
    status: "completed",
    notes: "Discussed GLP-1 dose titration and side-effect management.",
  },
  {
    id: "a5",
    title: "Initial Consultation",
    type: "Consultation",
    date: "2025-09-05",
    time: "9:30 AM",
    provider: "Dr. Gary Adams",
    location: "Crossroads Medical Wellness — Athens, AL",
    status: "completed",
    notes: "Established care; designed Longevity & Anti-Aging protocol.",
  },
];

export const upcomingAppointments = appointments
  .filter((a) => a.status === "upcoming")
  .sort((a, b) => +new Date(a.date) - +new Date(b.date));

export const pastAppointments = appointments
  .filter((a) => a.status !== "upcoming")
  .sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const nextAppointment = upcomingAppointments[0];
