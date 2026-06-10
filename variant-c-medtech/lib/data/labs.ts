export type LabStatus = "in-range" | "low" | "high" | "borderline";

export type LabHistoryPoint = {
  date: string; // ISO date
  value: number;
};

export type Biomarker = {
  id: string;
  name: string;
  unit: string;
  description: string;
  rangeLow: number;
  rangeHigh: number;
  optimalLow?: number;
  optimalHigh?: number;
  history: LabHistoryPoint[];
};

export type LabPanel = {
  id: string;
  system: string;
  description: string;
  biomarkers: Biomarker[];
};

function status(b: Biomarker): LabStatus {
  const latest = b.history[b.history.length - 1].value;
  if (latest < b.rangeLow) return "low";
  if (latest > b.rangeHigh) return "high";
  if (b.optimalLow !== undefined && latest < b.optimalLow) return "borderline";
  if (b.optimalHigh !== undefined && latest > b.optimalHigh) return "borderline";
  return "in-range";
}

export const labPanels: LabPanel[] = [
  {
    id: "hormones",
    system: "Hormones",
    description: "Sex hormones and related markers tracked through your BioTE program.",
    biomarkers: [
      {
        id: "total-testosterone",
        name: "Total Testosterone",
        unit: "ng/dL",
        description: "Overall testosterone level — the primary marker tracked through pellet therapy.",
        rangeLow: 264,
        rangeHigh: 916,
        optimalLow: 600,
        optimalHigh: 900,
        history: [
          { date: "2025-08-14", value: 312 },
          { date: "2025-11-10", value: 458 },
          { date: "2026-02-12", value: 612 },
          { date: "2026-05-14", value: 705 },
        ],
      },
      {
        id: "free-testosterone",
        name: "Free Testosterone",
        unit: "pg/mL",
        description: "The portion of testosterone available for your body to use.",
        rangeLow: 8.7,
        rangeHigh: 25.1,
        optimalLow: 18,
        optimalHigh: 24,
        history: [
          { date: "2025-08-14", value: 9.8 },
          { date: "2025-11-10", value: 14.2 },
          { date: "2026-02-12", value: 18.6 },
          { date: "2026-05-14", value: 21.4 },
        ],
      },
      {
        id: "estradiol",
        name: "Estradiol (E2)",
        unit: "pg/mL",
        description: "Tracked alongside testosterone to keep hormone ratios balanced.",
        rangeLow: 10,
        rangeHigh: 40,
        optimalLow: 20,
        optimalHigh: 30,
        history: [
          { date: "2025-08-14", value: 18 },
          { date: "2025-11-10", value: 22 },
          { date: "2026-02-12", value: 26 },
          { date: "2026-05-14", value: 27 },
        ],
      },
      {
        id: "shbg",
        name: "SHBG",
        unit: "nmol/L",
        description: "Sex hormone-binding globulin — affects how much testosterone is 'free' vs. bound.",
        rangeLow: 10,
        rangeHigh: 57,
        history: [
          { date: "2025-08-14", value: 41 },
          { date: "2025-11-10", value: 38 },
          { date: "2026-02-12", value: 34 },
          { date: "2026-05-14", value: 31 },
        ],
      },
    ],
  },
  {
    id: "metabolic",
    system: "Metabolic Health",
    description: "Markers related to blood sugar, weight management, and metabolic function.",
    biomarkers: [
      {
        id: "fasting-glucose",
        name: "Fasting Glucose",
        unit: "mg/dL",
        description: "Blood sugar level after an overnight fast.",
        rangeLow: 70,
        rangeHigh: 99,
        history: [
          { date: "2025-08-14", value: 104 },
          { date: "2025-11-10", value: 98 },
          { date: "2026-02-12", value: 93 },
          { date: "2026-05-14", value: 89 },
        ],
      },
      {
        id: "hba1c",
        name: "Hemoglobin A1c",
        unit: "%",
        description: "Average blood sugar levels over the past ~3 months.",
        rangeLow: 4.0,
        rangeHigh: 5.6,
        history: [
          { date: "2025-08-14", value: 5.8 },
          { date: "2025-11-10", value: 5.6 },
          { date: "2026-02-12", value: 5.4 },
          { date: "2026-05-14", value: 5.2 },
        ],
      },
      {
        id: "triglycerides",
        name: "Triglycerides",
        unit: "mg/dL",
        description: "A type of fat in the blood, related to diet and metabolic health.",
        rangeLow: 0,
        rangeHigh: 149,
        history: [
          { date: "2025-08-14", value: 178 },
          { date: "2025-11-10", value: 152 },
          { date: "2026-02-12", value: 134 },
          { date: "2026-05-14", value: 118 },
        ],
      },
      {
        id: "hdl",
        name: "HDL Cholesterol",
        unit: "mg/dL",
        description: "'Good' cholesterol that helps remove other forms of cholesterol from the bloodstream.",
        rangeLow: 40,
        rangeHigh: 100,
        optimalLow: 50,
        history: [
          { date: "2025-08-14", value: 38 },
          { date: "2025-11-10", value: 42 },
          { date: "2026-02-12", value: 46 },
          { date: "2026-05-14", value: 49 },
        ],
      },
      {
        id: "ldl",
        name: "LDL Cholesterol",
        unit: "mg/dL",
        description: "'Bad' cholesterol — tracked alongside HDL and triglycerides for cardiovascular health.",
        rangeLow: 0,
        rangeHigh: 99,
        history: [
          { date: "2025-08-14", value: 142 },
          { date: "2025-11-10", value: 128 },
          { date: "2026-02-12", value: 116 },
          { date: "2026-05-14", value: 104 },
        ],
      },
    ],
  },
  {
    id: "thyroid",
    system: "Thyroid Function",
    description: "Markers that influence energy, metabolism, and mood.",
    biomarkers: [
      {
        id: "tsh",
        name: "TSH",
        unit: "mIU/L",
        description: "Thyroid-stimulating hormone — the primary screening marker for thyroid function.",
        rangeLow: 0.4,
        rangeHigh: 4.5,
        optimalLow: 0.5,
        optimalHigh: 2.5,
        history: [
          { date: "2025-08-14", value: 3.1 },
          { date: "2025-11-10", value: 2.6 },
          { date: "2026-02-12", value: 2.1 },
          { date: "2026-05-14", value: 1.9 },
        ],
      },
      {
        id: "free-t4",
        name: "Free T4",
        unit: "ng/dL",
        description: "Thyroxine — one of the main hormones produced by the thyroid gland.",
        rangeLow: 0.8,
        rangeHigh: 1.8,
        history: [
          { date: "2025-08-14", value: 1.1 },
          { date: "2025-11-10", value: 1.2 },
          { date: "2026-02-12", value: 1.2 },
          { date: "2026-05-14", value: 1.3 },
        ],
      },
    ],
  },
  {
    id: "general",
    system: "General Wellness",
    description: "Foundational markers covering inflammation, vitamins, and overall health.",
    biomarkers: [
      {
        id: "vitamin-d",
        name: "Vitamin D, 25-OH",
        unit: "ng/mL",
        description: "Supports immune function, bone health, and mood.",
        rangeLow: 30,
        rangeHigh: 100,
        optimalLow: 50,
        optimalHigh: 80,
        history: [
          { date: "2025-08-14", value: 24 },
          { date: "2025-11-10", value: 38 },
          { date: "2026-02-12", value: 52 },
          { date: "2026-05-14", value: 58 },
        ],
      },
      {
        id: "crp",
        name: "hs-CRP",
        unit: "mg/L",
        description: "High-sensitivity C-reactive protein — a marker of inflammation.",
        rangeLow: 0,
        rangeHigh: 3.0,
        optimalHigh: 1.0,
        history: [
          { date: "2025-08-14", value: 2.8 },
          { date: "2025-11-10", value: 2.1 },
          { date: "2026-02-12", value: 1.4 },
          { date: "2026-05-14", value: 0.9 },
        ],
      },
      {
        id: "ferritin",
        name: "Ferritin",
        unit: "ng/mL",
        description: "Reflects the body's iron stores.",
        rangeLow: 24,
        rangeHigh: 336,
        history: [
          { date: "2025-08-14", value: 145 },
          { date: "2025-11-10", value: 138 },
          { date: "2026-02-12", value: 130 },
          { date: "2026-05-14", value: 126 },
        ],
      },
    ],
  },
];

export function getBiomarkerStatus(b: Biomarker): LabStatus {
  return status(b);
}

export function getAllBiomarkers(): Biomarker[] {
  return labPanels.flatMap((panel) => panel.biomarkers);
}

export const labsLastUpdated = "2026-05-14";
