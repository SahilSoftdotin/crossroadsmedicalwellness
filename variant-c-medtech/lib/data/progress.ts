export type WeightPoint = {
  date: string;
  weightLbs: number;
};

export type GoalProgress = {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  direction: "increase" | "decrease";
};

export const weightHistory: WeightPoint[] = [
  { date: "2025-08-14", weightLbs: 224 },
  { date: "2025-09-15", weightLbs: 220 },
  { date: "2025-10-15", weightLbs: 217 },
  { date: "2025-11-10", weightLbs: 213 },
  { date: "2025-12-12", weightLbs: 210 },
  { date: "2026-01-14", weightLbs: 207 },
  { date: "2026-02-12", weightLbs: 204 },
  { date: "2026-03-15", weightLbs: 202 },
  { date: "2026-04-14", weightLbs: 199 },
  { date: "2026-05-14", weightLbs: 197 },
];

export const goals: GoalProgress[] = [
  {
    id: "weight",
    label: "Body Weight",
    current: 197,
    target: 190,
    unit: "lbs",
    direction: "decrease",
  },
  {
    id: "testosterone",
    label: "Total Testosterone",
    current: 705,
    target: 750,
    unit: "ng/dL",
    direction: "increase",
  },
  {
    id: "energy",
    label: "Self-Reported Energy",
    current: 7.5,
    target: 9,
    unit: "/ 10",
    direction: "increase",
  },
  {
    id: "sleep",
    label: "Avg. Sleep Quality",
    current: 7,
    target: 8.5,
    unit: "/ 10",
    direction: "increase",
  },
];
