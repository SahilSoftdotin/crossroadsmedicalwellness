export type LabPoint = {
  date: string; // YYYY-MM-DD
  value: number;
};

export type Biomarker = {
  id: string;
  name: string;
  unit: string;
  rangeLow: number;
  rangeHigh: number;
  optimalLow?: number;
  optimalHigh?: number;
  history: LabPoint[];
  description: string;
};

export type LabPanel = {
  id: string;
  name: string;
  system: string;
  biomarkers: Biomarker[];
};

function status(b: Biomarker): "in-range" | "low" | "high" | "watch" {
  const latest = b.history[b.history.length - 1].value;
  if (latest < b.rangeLow) return "low";
  if (latest > b.rangeHigh) return "high";
  if (b.optimalLow !== undefined && latest < b.optimalLow) return "watch";
  if (b.optimalHigh !== undefined && latest > b.optimalHigh) return "watch";
  return "in-range";
}

export const labPanels: LabPanel[] = [
  {
    id: "hormones",
    name: "Hormone Panel",
    system: "Hormonal Health",
    biomarkers: [
      {
        id: "total-testosterone",
        name: "Total Testosterone",
        unit: "ng/dL",
        rangeLow: 264,
        rangeHigh: 916,
        optimalLow: 500,
        optimalHigh: 900,
        description:
          "Reflects overall testosterone levels, important for energy, muscle mass, mood, and libido.",
        history: [
          { date: "2025-09-15", value: 312 },
          { date: "2025-12-10", value: 410 },
          { date: "2026-03-04", value: 540 },
          { date: "2026-05-20", value: 612 },
        ],
      },
      {
        id: "free-testosterone",
        name: "Free Testosterone",
        unit: "pg/mL",
        rangeLow: 8.7,
        rangeHigh: 25.1,
        optimalLow: 15,
        optimalHigh: 24,
        description:
          "The 'usable' portion of testosterone not bound to proteins — often a more accurate reflection of symptoms.",
        history: [
          { date: "2025-09-15", value: 9.8 },
          { date: "2025-12-10", value: 13.2 },
          { date: "2026-03-04", value: 17.5 },
          { date: "2026-05-20", value: 19.8 },
        ],
      },
      {
        id: "estradiol",
        name: "Estradiol (E2)",
        unit: "pg/mL",
        rangeLow: 10,
        rangeHigh: 40,
        optimalLow: 20,
        optimalHigh: 35,
        description:
          "An estrogen hormone that, in balance with testosterone, supports joint health, mood, and cardiovascular health.",
        history: [
          { date: "2025-09-15", value: 14 },
          { date: "2025-12-10", value: 19 },
          { date: "2026-03-04", value: 24 },
          { date: "2026-05-20", value: 27 },
        ],
      },
      {
        id: "tsh",
        name: "TSH (Thyroid Stimulating Hormone)",
        unit: "mIU/L",
        rangeLow: 0.4,
        rangeHigh: 4.5,
        optimalLow: 0.5,
        optimalHigh: 2.5,
        description:
          "A key marker of thyroid function, which influences metabolism, energy, and mood.",
        history: [
          { date: "2025-09-15", value: 3.1 },
          { date: "2025-12-10", value: 2.7 },
          { date: "2026-03-04", value: 2.2 },
          { date: "2026-05-20", value: 1.9 },
        ],
      },
    ],
  },
  {
    id: "metabolic",
    name: "Metabolic Panel",
    system: "Metabolic Health",
    biomarkers: [
      {
        id: "fasting-glucose",
        name: "Fasting Glucose",
        unit: "mg/dL",
        rangeLow: 70,
        rangeHigh: 99,
        optimalLow: 75,
        optimalHigh: 90,
        description:
          "Blood sugar after fasting — an important marker for metabolic health and diabetes risk.",
        history: [
          { date: "2025-09-15", value: 104 },
          { date: "2025-12-10", value: 98 },
          { date: "2026-03-04", value: 92 },
          { date: "2026-05-20", value: 87 },
        ],
      },
      {
        id: "hba1c",
        name: "Hemoglobin A1c",
        unit: "%",
        rangeLow: 4.0,
        rangeHigh: 5.6,
        optimalLow: 4.5,
        optimalHigh: 5.4,
        description:
          "Reflects average blood sugar over the past ~3 months.",
        history: [
          { date: "2025-09-15", value: 5.9 },
          { date: "2025-12-10", value: 5.7 },
          { date: "2026-03-04", value: 5.5 },
          { date: "2026-05-20", value: 5.3 },
        ],
      },
      {
        id: "ldl",
        name: "LDL Cholesterol",
        unit: "mg/dL",
        rangeLow: 0,
        rangeHigh: 99,
        optimalLow: 0,
        optimalHigh: 90,
        description:
          "Often called 'bad' cholesterol — lower levels are generally associated with lower cardiovascular risk.",
        history: [
          { date: "2025-09-15", value: 138 },
          { date: "2025-12-10", value: 122 },
          { date: "2026-03-04", value: 108 },
          { date: "2026-05-20", value: 96 },
        ],
      },
      {
        id: "hdl",
        name: "HDL Cholesterol",
        unit: "mg/dL",
        rangeLow: 40,
        rangeHigh: 100,
        optimalLow: 50,
        optimalHigh: 100,
        description:
          "Often called 'good' cholesterol — higher levels are generally protective.",
        history: [
          { date: "2025-09-15", value: 41 },
          { date: "2025-12-10", value: 44 },
          { date: "2026-03-04", value: 47 },
          { date: "2026-05-20", value: 52 },
        ],
      },
      {
        id: "triglycerides",
        name: "Triglycerides",
        unit: "mg/dL",
        rangeLow: 0,
        rangeHigh: 149,
        optimalLow: 0,
        optimalHigh: 100,
        description:
          "A type of fat in the blood — elevated levels are linked to metabolic and cardiovascular risk.",
        history: [
          { date: "2025-09-15", value: 178 },
          { date: "2025-12-10", value: 152 },
          { date: "2026-03-04", value: 121 },
          { date: "2026-05-20", value: 99 },
        ],
      },
    ],
  },
  {
    id: "vitamins",
    name: "Vitamins & Nutrients",
    system: "Nutrient Status",
    biomarkers: [
      {
        id: "vitamin-d",
        name: "Vitamin D, 25-OH",
        unit: "ng/mL",
        rangeLow: 30,
        rangeHigh: 100,
        optimalLow: 40,
        optimalHigh: 80,
        description:
          "Important for bone health, immune function, and mood regulation.",
        history: [
          { date: "2025-09-15", value: 24 },
          { date: "2025-12-10", value: 34 },
          { date: "2026-03-04", value: 46 },
          { date: "2026-05-20", value: 52 },
        ],
      },
      {
        id: "vitamin-b12",
        name: "Vitamin B12",
        unit: "pg/mL",
        rangeLow: 232,
        rangeHigh: 1245,
        optimalLow: 500,
        optimalHigh: 1000,
        description:
          "Essential for energy production and nervous system health.",
        history: [
          { date: "2025-09-15", value: 410 },
          { date: "2025-12-10", value: 520 },
          { date: "2026-03-04", value: 610 },
          { date: "2026-05-20", value: 690 },
        ],
      },
      {
        id: "ferritin",
        name: "Ferritin",
        unit: "ng/mL",
        rangeLow: 24,
        rangeHigh: 336,
        optimalLow: 50,
        optimalHigh: 150,
        description:
          "A marker of iron storage in the body — both low and very high levels can indicate issues.",
        history: [
          { date: "2025-09-15", value: 38 },
          { date: "2025-12-10", value: 52 },
          { date: "2026-03-04", value: 68 },
          { date: "2026-05-20", value: 79 },
        ],
      },
    ],
  },
  {
    id: "inflammation",
    name: "Inflammation Markers",
    system: "Inflammation",
    biomarkers: [
      {
        id: "hs-crp",
        name: "hs-CRP",
        unit: "mg/L",
        rangeLow: 0,
        rangeHigh: 3.0,
        optimalLow: 0,
        optimalHigh: 1.0,
        description:
          "High-sensitivity C-reactive protein — a marker of systemic inflammation linked to cardiovascular risk.",
        history: [
          { date: "2025-09-15", value: 3.4 },
          { date: "2025-12-10", value: 2.6 },
          { date: "2026-03-04", value: 1.7 },
          { date: "2026-05-20", value: 1.1 },
        ],
      },
    ],
  },
];

export function getBiomarkerStatus(b: Biomarker) {
  return status(b);
}

export function getAllBiomarkers(): Biomarker[] {
  return labPanels.flatMap((p) => p.biomarkers);
}

export const labsLastUpdated = "2026-05-20";
