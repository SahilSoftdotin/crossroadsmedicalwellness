export type LabStatus = "optimal" | "in-range" | "borderline" | "out-of-range";

export type Biomarker = {
  id: string;
  name: string;
  unit: string;
  value: number;
  refLow: number;
  refHigh: number;
  optimalLow?: number;
  optimalHigh?: number;
  status: LabStatus;
  /** chronological history for trend chart */
  history: { date: string; value: number }[];
  note?: string;
};

export type LabPanel = {
  id: string;
  system: string;
  description: string;
  collectedOn: string;
  biomarkers: Biomarker[];
};

export const labPanels: LabPanel[] = [
  {
    id: "hormones",
    system: "Hormones",
    description: "Sex hormones and thyroid markers central to energy, mood and metabolism.",
    collectedOn: "2026-05-20",
    biomarkers: [
      {
        id: "total-t",
        name: "Total Testosterone",
        unit: "ng/dL",
        value: 612,
        refLow: 264,
        refHigh: 916,
        optimalLow: 500,
        optimalHigh: 800,
        status: "optimal",
        history: [
          { date: "2025-09", value: 318 },
          { date: "2025-12", value: 470 },
          { date: "2026-03", value: 560 },
          { date: "2026-05", value: 612 },
        ],
        note: "Up from baseline; now in optimal range on current protocol.",
      },
      {
        id: "free-t",
        name: "Free Testosterone",
        unit: "pg/mL",
        value: 14.2,
        refLow: 8.7,
        refHigh: 25.1,
        optimalLow: 12,
        optimalHigh: 20,
        status: "optimal",
        history: [
          { date: "2025-09", value: 6.4 },
          { date: "2025-12", value: 9.8 },
          { date: "2026-03", value: 12.6 },
          { date: "2026-05", value: 14.2 },
        ],
      },
      {
        id: "tsh",
        name: "TSH",
        unit: "mIU/L",
        value: 2.1,
        refLow: 0.45,
        refHigh: 4.5,
        optimalLow: 0.5,
        optimalHigh: 2.5,
        status: "optimal",
        history: [
          { date: "2025-09", value: 3.6 },
          { date: "2025-12", value: 2.9 },
          { date: "2026-03", value: 2.3 },
          { date: "2026-05", value: 2.1 },
        ],
      },
      {
        id: "free-t4",
        name: "Free T4",
        unit: "ng/dL",
        value: 1.2,
        refLow: 0.82,
        refHigh: 1.77,
        status: "in-range",
        history: [
          { date: "2025-09", value: 0.95 },
          { date: "2025-12", value: 1.05 },
          { date: "2026-03", value: 1.15 },
          { date: "2026-05", value: 1.2 },
        ],
      },
    ],
  },
  {
    id: "metabolic",
    system: "Metabolic",
    description: "Blood sugar, insulin sensitivity and body-fuel markers.",
    collectedOn: "2026-05-20",
    biomarkers: [
      {
        id: "hba1c",
        name: "Hemoglobin A1c",
        unit: "%",
        value: 5.4,
        refLow: 4.0,
        refHigh: 5.6,
        optimalLow: 4.5,
        optimalHigh: 5.3,
        status: "borderline",
        history: [
          { date: "2025-09", value: 5.9 },
          { date: "2025-12", value: 5.7 },
          { date: "2026-03", value: 5.5 },
          { date: "2026-05", value: 5.4 },
        ],
        note: "Trending down nicely; just above optimal.",
      },
      {
        id: "fasting-glucose",
        name: "Fasting Glucose",
        unit: "mg/dL",
        value: 92,
        refLow: 70,
        refHigh: 99,
        optimalLow: 75,
        optimalHigh: 90,
        status: "in-range",
        history: [
          { date: "2025-09", value: 104 },
          { date: "2025-12", value: 98 },
          { date: "2026-03", value: 94 },
          { date: "2026-05", value: 92 },
        ],
      },
      {
        id: "fasting-insulin",
        name: "Fasting Insulin",
        unit: "µIU/mL",
        value: 7.1,
        refLow: 2.6,
        refHigh: 24.9,
        optimalLow: 2,
        optimalHigh: 6,
        status: "borderline",
        history: [
          { date: "2025-09", value: 14.2 },
          { date: "2025-12", value: 11.0 },
          { date: "2026-03", value: 8.4 },
          { date: "2026-05", value: 7.1 },
        ],
      },
    ],
  },
  {
    id: "lipids",
    system: "Cardiovascular",
    description: "Lipid panel and inflammation markers for heart health.",
    collectedOn: "2026-05-20",
    biomarkers: [
      {
        id: "ldl",
        name: "LDL Cholesterol",
        unit: "mg/dL",
        value: 108,
        refLow: 0,
        refHigh: 130,
        optimalLow: 0,
        optimalHigh: 100,
        status: "borderline",
        history: [
          { date: "2025-09", value: 142 },
          { date: "2025-12", value: 128 },
          { date: "2026-03", value: 116 },
          { date: "2026-05", value: 108 },
        ],
      },
      {
        id: "hdl",
        name: "HDL Cholesterol",
        unit: "mg/dL",
        value: 58,
        refLow: 40,
        refHigh: 100,
        optimalLow: 50,
        optimalHigh: 90,
        status: "optimal",
        history: [
          { date: "2025-09", value: 44 },
          { date: "2025-12", value: 49 },
          { date: "2026-03", value: 54 },
          { date: "2026-05", value: 58 },
        ],
      },
      {
        id: "triglycerides",
        name: "Triglycerides",
        unit: "mg/dL",
        value: 96,
        refLow: 0,
        refHigh: 150,
        optimalLow: 0,
        optimalHigh: 90,
        status: "in-range",
        history: [
          { date: "2025-09", value: 168 },
          { date: "2025-12", value: 132 },
          { date: "2026-03", value: 110 },
          { date: "2026-05", value: 96 },
        ],
      },
      {
        id: "hscrp",
        name: "hs-CRP",
        unit: "mg/L",
        value: 0.8,
        refLow: 0,
        refHigh: 3.0,
        optimalLow: 0,
        optimalHigh: 1.0,
        status: "optimal",
        history: [
          { date: "2025-09", value: 2.4 },
          { date: "2025-12", value: 1.7 },
          { date: "2026-03", value: 1.1 },
          { date: "2026-05", value: 0.8 },
        ],
        note: "Inflammation markedly reduced since baseline.",
      },
    ],
  },
  {
    id: "vitamins",
    system: "Vitamins & Minerals",
    description: "Key micronutrients affecting energy, immunity and mood.",
    collectedOn: "2026-05-20",
    biomarkers: [
      {
        id: "vit-d",
        name: "Vitamin D, 25-OH",
        unit: "ng/mL",
        value: 38,
        refLow: 30,
        refHigh: 100,
        optimalLow: 40,
        optimalHigh: 60,
        status: "borderline",
        history: [
          { date: "2025-09", value: 22 },
          { date: "2025-12", value: 29 },
          { date: "2026-03", value: 34 },
          { date: "2026-05", value: 38 },
        ],
        note: "Improving with supplementation; aim for 40–60.",
      },
      {
        id: "ferritin",
        name: "Ferritin",
        unit: "ng/mL",
        value: 96,
        refLow: 30,
        refHigh: 400,
        optimalLow: 50,
        optimalHigh: 150,
        status: "optimal",
        history: [
          { date: "2025-09", value: 62 },
          { date: "2025-12", value: 74 },
          { date: "2026-03", value: 88 },
          { date: "2026-05", value: 96 },
        ],
      },
      {
        id: "b12",
        name: "Vitamin B12",
        unit: "pg/mL",
        value: 612,
        refLow: 232,
        refHigh: 1245,
        optimalLow: 500,
        optimalHigh: 900,
        status: "optimal",
        history: [
          { date: "2025-09", value: 388 },
          { date: "2025-12", value: 470 },
          { date: "2026-03", value: 540 },
          { date: "2026-05", value: 612 },
        ],
      },
    ],
  },
];

export const labStatusLabel: Record<LabStatus, string> = {
  optimal: "Optimal",
  "in-range": "In range",
  borderline: "Borderline",
  "out-of-range": "Out of range",
};

export function labSummary() {
  const all = labPanels.flatMap((p) => p.biomarkers);
  return {
    total: all.length,
    optimal: all.filter((b) => b.status === "optimal").length,
    inRange: all.filter((b) => b.status === "in-range").length,
    borderline: all.filter((b) => b.status === "borderline").length,
    outOfRange: all.filter((b) => b.status === "out-of-range").length,
  };
}
