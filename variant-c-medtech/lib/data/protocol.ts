export type ProtocolItem = {
  id: string;
  name: string;
  type: "Pellet Therapy" | "Supplement" | "Medication" | "Lifestyle";
  dosage: string;
  schedule: string;
  instructions: string;
  refillStatus: "On track" | "Refill due soon" | "Refill needed";
  nextRefillDate?: string;
  adherence: number; // 0-100
};

export const protocolItems: ProtocolItem[] = [
  {
    id: "biote-pellet",
    name: "BioTE Testosterone Pellet",
    type: "Pellet Therapy",
    dosage: "Custom dose, in-office insertion",
    schedule: "Every 3-5 months",
    instructions:
      "Avoid soaking the insertion site (baths, pools, hot tubs) for 3 days after your procedure. Light activity is fine after 24-48 hours; avoid heavy leg workouts for one week.",
    refillStatus: "On track",
    nextRefillDate: "2026-08-12",
    adherence: 100,
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3 + K2",
    type: "Supplement",
    dosage: "5,000 IU / 100 mcg",
    schedule: "Once daily, with breakfast",
    instructions: "Take with a meal containing fat for best absorption.",
    refillStatus: "Refill due soon",
    nextRefillDate: "2026-06-20",
    adherence: 92,
  },
  {
    id: "omega-3",
    name: "Omega-3 Fish Oil",
    type: "Supplement",
    dosage: "1,200 mg EPA/DHA",
    schedule: "Once daily, with dinner",
    instructions: "Supports cardiovascular and inflammatory markers — paired with your lipid panel goals.",
    refillStatus: "On track",
    nextRefillDate: "2026-07-05",
    adherence: 88,
  },
  {
    id: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    type: "Supplement",
    dosage: "400 mg",
    schedule: "Nightly, 30-60 min before bed",
    instructions: "Supports sleep quality and recovery. Take consistently for best results.",
    refillStatus: "Refill needed",
    nextRefillDate: "2026-06-10",
    adherence: 76,
  },
  {
    id: "sleep-routine",
    name: "Sleep Consistency Plan",
    type: "Lifestyle",
    dosage: "7-8 hours nightly",
    schedule: "Daily",
    instructions:
      "Aim for a consistent sleep and wake time, even on weekends. Reduce screen exposure 30-60 minutes before bed.",
    refillStatus: "On track",
    adherence: 81,
  },
  {
    id: "strength-training",
    name: "Strength Training Plan",
    type: "Lifestyle",
    dosage: "3 sessions / week",
    schedule: "Mon / Wed / Fri",
    instructions:
      "Focus on compound lifts to support lean mass while on hormone optimization and to complement metabolic goals.",
    refillStatus: "On track",
    adherence: 85,
  },
];

export const protocolSummary = {
  programName: "Men's Hormone Health — Maintenance",
  startDate: "2025-08-21",
  physician: "Dr. Gary Adams",
  overallAdherence: 87,
  nextReview: "2026-08-15",
};
