export type Goal = {
  id: string;
  label: string;
  current: number;
  target: number;
  start: number;
  unit: string;
  direction: "down" | "up";
};

export const progress = {
  weight: {
    unit: "lbs",
    start: 228,
    current: 199,
    goal: 190,
    series: [
      { date: "Sep", value: 228 },
      { date: "Oct", value: 223 },
      { date: "Nov", value: 218 },
      { date: "Dec", value: 214 },
      { date: "Jan", value: 211 },
      { date: "Feb", value: 207 },
      { date: "Mar", value: 204 },
      { date: "Apr", value: 201 },
      { date: "May", value: 199 },
    ],
  },
  bodyComposition: [
    { date: "Sep", bodyFat: 31, leanMass: 152 },
    { date: "Dec", bodyFat: 27, leanMass: 153 },
    { date: "Mar", bodyFat: 24, leanMass: 154 },
    { date: "May", bodyFat: 22, leanMass: 154 },
  ],
  energyScore: [
    { date: "Sep", value: 4 },
    { date: "Oct", value: 5 },
    { date: "Nov", value: 6 },
    { date: "Dec", value: 6 },
    { date: "Jan", value: 7 },
    { date: "Feb", value: 8 },
    { date: "Mar", value: 8 },
    { date: "Apr", value: 9 },
    { date: "May", value: 9 },
  ],
  goals: [
    {
      id: "g1",
      label: "Body weight",
      current: 199,
      target: 190,
      start: 228,
      unit: "lbs",
      direction: "down",
    },
    {
      id: "g2",
      label: "Body fat",
      current: 22,
      target: 18,
      start: 31,
      unit: "%",
      direction: "down",
    },
    {
      id: "g3",
      label: "A1c",
      current: 5.4,
      target: 5.2,
      start: 5.9,
      unit: "%",
      direction: "down",
    },
    {
      id: "g4",
      label: "Daily energy (self-rated)",
      current: 9,
      target: 9,
      start: 4,
      unit: "/10",
      direction: "up",
    },
  ] as Goal[],
};

export function goalProgressPercent(g: Goal): number {
  const totalNeeded = Math.abs(g.target - g.start);
  if (totalNeeded === 0) return 100;
  const achieved = Math.abs(g.current - g.start);
  return Math.min(100, Math.round((achieved / totalNeeded) * 100));
}
