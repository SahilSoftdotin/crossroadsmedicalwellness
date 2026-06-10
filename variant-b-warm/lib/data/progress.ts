export type WeightPoint = {
  date: string; // YYYY-MM-DD
  weight: number; // lbs
};

export type GoalProgress = {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  unit: string;
  startValue: number;
};

export const weightHistory: WeightPoint[] = [
  { date: "2025-09-15", weight: 224 },
  { date: "2025-10-15", weight: 219 },
  { date: "2025-11-15", weight: 215 },
  { date: "2025-12-15", weight: 211 },
  { date: "2026-01-15", weight: 207 },
  { date: "2026-02-15", weight: 203 },
  { date: "2026-03-15", weight: 199 },
  { date: "2026-04-15", weight: 196 },
  { date: "2026-05-15", weight: 193 },
];

export const goals: GoalProgress[] = [
  {
    id: "weight",
    title: "Weight Goal",
    description: "Reach a healthy target weight with sustainable habits.",
    current: 193,
    target: 180,
    unit: "lbs",
    startValue: 224,
  },
  {
    id: "energy",
    title: "Energy Score",
    description: "Self-reported daily energy level (1–10 scale, monthly average).",
    current: 7.8,
    target: 9,
    unit: "/10",
    startValue: 4.2,
  },
  {
    id: "sleep",
    title: "Sleep Quality",
    description: "Self-reported sleep quality (1–10 scale, monthly average).",
    current: 7.2,
    target: 8.5,
    unit: "/10",
    startValue: 5.0,
  },
];

export const milestones = [
  { date: "2025-09-15", label: "Started program — baseline labs & assessment" },
  { date: "2025-12-10", label: "First lab re-check — testosterone & vitamin D improving" },
  { date: "2026-03-04", label: "BioTE pellet refresh + began semaglutide titration increase" },
  { date: "2026-05-15", label: "31 lbs lost since starting — metabolic markers normalized" },
];
