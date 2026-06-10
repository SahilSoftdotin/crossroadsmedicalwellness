export type ProtocolItem = {
  id: string;
  name: string;
  type: "medication" | "hormone" | "supplement";
  dose: string;
  schedule: string;
  purpose: string;
  refillsRemaining: number;
  nextRefill: string;
  adherence: number; // percent
};

export const protocol = {
  name: "Longevity & Anti-Aging Protocol",
  startedOn: "2025-09-05",
  lastReviewed: "2026-05-22",
  reviewedBy: "Dr. Gary Adams",
  overallAdherence: 94,
  items: [
    {
      id: "p1",
      name: "Testosterone (BioTE pellet)",
      type: "hormone",
      dose: "Provider-dosed pellet",
      schedule: "Every 4 months (in-office)",
      purpose: "Hormone optimization — energy, body composition, libido",
      refillsRemaining: 0,
      nextRefill: "2026-07-15",
      adherence: 100,
    },
    {
      id: "p2",
      name: "Semaglutide",
      type: "medication",
      dose: "0.5 mg",
      schedule: "Once weekly (subcutaneous)",
      purpose: "Metabolic support and weight management",
      refillsRemaining: 2,
      nextRefill: "2026-06-18",
      adherence: 96,
    },
    {
      id: "p3",
      name: "Vitamin D3 + K2",
      type: "supplement",
      dose: "5,000 IU / 100 mcg",
      schedule: "Once daily with food",
      purpose: "Raise vitamin D into optimal range",
      refillsRemaining: 3,
      nextRefill: "2026-07-02",
      adherence: 88,
    },
    {
      id: "p4",
      name: "Omega-3 (EPA/DHA)",
      type: "supplement",
      dose: "2 g",
      schedule: "Once daily with food",
      purpose: "Reduce inflammation; cardiovascular support",
      refillsRemaining: 1,
      nextRefill: "2026-06-25",
      adherence: 90,
    },
    {
      id: "p5",
      name: "Magnesium Glycinate",
      type: "supplement",
      dose: "400 mg",
      schedule: "Nightly before bed",
      purpose: "Sleep quality and muscle recovery",
      refillsRemaining: 4,
      nextRefill: "2026-07-10",
      adherence: 92,
    },
  ] as ProtocolItem[],
  /** weekly adherence trend for chart */
  adherenceTrend: [
    { week: "Wk 1", value: 86 },
    { week: "Wk 2", value: 90 },
    { week: "Wk 3", value: 88 },
    { week: "Wk 4", value: 93 },
    { week: "Wk 5", value: 95 },
    { week: "Wk 6", value: 92 },
    { week: "Wk 7", value: 96 },
    { week: "Wk 8", value: 94 },
  ],
};
