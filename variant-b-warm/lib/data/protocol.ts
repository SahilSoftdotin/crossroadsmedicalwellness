export type ProtocolItem = {
  id: string;
  name: string;
  type: "Medication" | "Supplement" | "Therapy";
  dosage: string;
  frequency: string;
  instructions: string;
  refillDate: string; // YYYY-MM-DD
  adherence: number; // 0-100 percent, last 30 days
  status: "active" | "paused";
};

export const protocolItems: ProtocolItem[] = [
  {
    id: "biote-pellet",
    name: "BioTE Hormone Pellet Therapy",
    type: "Therapy",
    dosage: "Personalized dose (set at insertion)",
    frequency: "Every 4–5 months, in-office",
    instructions:
      "Keep the insertion site dry and covered for 24–48 hours. Avoid strenuous lower-body exercise for 48 hours after insertion.",
    refillDate: "2026-08-15",
    adherence: 100,
    status: "active",
  },
  {
    id: "semaglutide",
    name: "Semaglutide Injection",
    type: "Medication",
    dosage: "0.5 mg",
    frequency: "Once weekly, self-administered",
    instructions:
      "Inject subcutaneously in the abdomen, thigh, or upper arm. Rotate injection sites each week. Take on the same day each week.",
    refillDate: "2026-06-25",
    adherence: 96,
    status: "active",
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3 + K2",
    type: "Supplement",
    dosage: "5,000 IU / 100 mcg",
    frequency: "Once daily, with food",
    instructions: "Take with a meal containing fat for best absorption.",
    refillDate: "2026-07-02",
    adherence: 88,
    status: "active",
  },
  {
    id: "omega-3",
    name: "Omega-3 Fish Oil",
    type: "Supplement",
    dosage: "1,200 mg",
    frequency: "Twice daily, with meals",
    instructions: "Take one capsule with breakfast and one with dinner.",
    refillDate: "2026-06-30",
    adherence: 91,
    status: "active",
  },
  {
    id: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    type: "Supplement",
    dosage: "400 mg",
    frequency: "Once daily, evening",
    instructions: "Take 30–60 minutes before bedtime to support sleep quality.",
    refillDate: "2026-07-10",
    adherence: 84,
    status: "active",
  },
];

export const protocolNotes =
  "Protocol last reviewed by Dr. Adams on May 20, 2026 following your most recent lab panel. Continue current dosing — we'll reassess testosterone and metabolic markers at your next visit.";
