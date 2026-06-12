import type { LucideIcon } from "lucide-react";
import { Stethoscope, Activity, HeartPulse, Crown } from "lucide-react";

export type LabGroup = { group: string; tests: string[] };

export type SentinelTier = {
  id: "baseline" | "core" | "advanced" | "executive";
  name: string;
  shortName: string;
  price: number;
  priceDisplay: string;
  /** Suggested range from the planning document (internal context). */
  priceRange: string;
  icon: LucideIcon;
  /** Short one-line positioning for cards/headers. */
  positioning: string;
  /** Verbatim "Best for / Best use" positioning from the spec. */
  idealPatient: string;
  badge?: string;
  flagship?: boolean;
  /** "Everything in Sentinel Core, plus:" style lead-in for higher tiers. */
  inheritsNote?: string;
  /** Program features / what the evaluation includes. */
  features: string[];
  /** Included laboratory testing, grouped (Core). */
  includedLabs?: LabGroup[];
  /** Additional expanded labs/testing (Advanced). */
  additionalLabs?: string[];
  /** Imaging options. */
  imaging?: string[];
  /** Guidance note for imaging (e.g. one core test included, rest clinically triggered). */
  imagingNote?: string;
  /** Possible included imaging/testing (Executive). */
  includedImaging?: string[];
  /** "Patient receives" — the reports/outputs the patient walks away with. */
  patientReceives?: string[];
  /** Optional add-ons / premium services at this tier. */
  addOns?: { label: string; items: string[] };
  /** Special note, e.g. Baseline labs billed separately. */
  note?: string;
};

export const sentinelTiers: SentinelTier[] = [
  {
    id: "baseline",
    name: "Sentinel Baseline Evaluation",
    shortName: "Sentinel Baseline",
    price: 595,
    priceDisplay: "$595",
    priceRange: "Suggested $495–$750",
    icon: Stethoscope,
    badge: "Start here",
    positioning:
      "An entry-level assessment — not a full longevity program, but the simplest way to begin.",
    idealPatient:
      "Best use: a feeder product for patients who are curious but not ready to commit.",
    features: [
      "Initial physician consultation",
      "Medical history and risk review",
      "Vitals and body composition",
      "Basic Sentinel Longevity Score estimate",
      "Review of outside labs if available",
      "Basic action plan",
    ],
    note: "Labs are either not included or limited basic labs billed separately.",
  },
  {
    id: "core",
    name: "Sentinel Core Longevity Evaluation",
    shortName: "Sentinel Core",
    price: 2250,
    priceDisplay: "$2,250",
    priceRange: "Suggested $1,950–$2,500",
    icon: Activity,
    positioning: "Our first real longevity package — a serious, physician-led optimization evaluation.",
    idealPatient:
      "Best for patients who want a serious physician-led health optimization evaluation without advanced imaging.",
    features: [
      "Comprehensive physician evaluation",
      "Full Sentinel Longevity Score",
      "InBody body composition",
      "Metabolic and cardiovascular risk review",
      "Basic fitness screen",
      "Sleep apnea risk screen",
      "Personalized 90-day plan",
      "Follow-up visit to review labs and plan",
    ],
    includedLabs: [
      { group: "Basic", tests: ["CBC", "CMP"] },
      { group: "Metabolic", tests: ["HbA1c", "Fasting insulin"] },
      { group: "Lipids / Cardiovascular", tests: ["Lipid panel", "ApoB", "Lp(a)"] },
      { group: "Inflammation / Iron", tests: ["hs-CRP", "Ferritin", "Iron", "TIBC", "TSAT"] },
      { group: "Thyroid", tests: ["TSH", "Free T4", "Free T3"] },
      { group: "Nutrients / Methylation", tests: ["Vitamin D", "B12", "Folate", "Homocysteine"] },
      { group: "Men's health", tests: ["Testosterone panel", "PSA"] },
      { group: "Kidney risk", tests: ["Urine microalbumin/creatinine"] },
    ],
    patientReceives: [
      "Sentinel Longevity Score",
      "Top 3 biological risk drivers",
      "90-day intervention plan",
      "Lab interpretation report",
    ],
    addOns: {
      label: "Optional add-ons",
      items: [
        "CGM (10–14 days)",
        "Omega-3 index",
        "DHEA-S",
        "Estradiol",
        "Cortisol",
        "Advanced inflammatory markers",
      ],
    },
  },
  {
    id: "advanced",
    name: "Sentinel Advanced Longevity Evaluation",
    shortName: "Sentinel Advanced",
    price: 5500,
    priceDisplay: "$5,500",
    priceRange: "Suggested $4,500–$6,500",
    icon: HeartPulse,
    badge: "Flagship",
    flagship: true,
    positioning:
      "Our flagship and likely best main program — a deeper look across metabolic, cardiovascular, hormonal, inflammatory, sleep, and performance risk.",
    idealPatient:
      "Best for men over 50 who want a deeper look at metabolic, cardiovascular, hormonal, inflammatory, sleep, and performance risk.",
    inheritsNote: "Everything in Sentinel Core, plus:",
    features: [
      "Expanded lab panel",
      "PNOE or VO2 / metabolic testing",
      "More detailed cardiovascular risk stratification",
      "CGM (10–14 days)",
      "Sleep study if indicated",
      "Second physician visit",
      "90-day and 6-month follow-up structure",
      "Repeat selected labs at 3–6 months",
    ],
    additionalLabs: [
      "Omega-3 index",
      "DHEA-S",
      "Estradiol",
      "Pregnenolone (optional)",
      "Uric acid",
      "GGT",
      "Fibrinogen",
      "ESR",
      "Insulin resistance markers",
      "Advanced thyroid interpretation",
      "Optional inflammatory cytokines (depending on cost)",
      "Optional specialty labs if clinically justified",
    ],
    imaging: [
      "Coronary calcium score",
      "Carotid ultrasound",
      "DEXA scan",
      "Liver ultrasound or FibroScan (if fatty-liver concern)",
      "Echocardiogram (if murmur, dyspnea, cardiac history, or abnormal exam)",
    ],
    imagingNote:
      "One core imaging test is included — usually a coronary calcium score or DEXA — with the rest clinically triggered.",
    patientReceives: [
      "Full Sentinel Longevity Score",
      "Aging Velocity baseline",
      "CGM report",
      "Body composition report",
      "Fitness / metabolic report",
      "Cardiovascular risk summary",
      "90-day plan",
      "6-month retest plan",
    ],
  },
  {
    id: "executive",
    name: "Sentinel Executive Longevity Program",
    shortName: "Sentinel Executive",
    price: 12500,
    priceDisplay: "$12,500",
    priceRange: "Suggested $9,500–$15,000",
    icon: Crown,
    badge: "Most comprehensive",
    positioning:
      "A premium, concierge-style program — a physician-led longevity roadmap with advanced diagnostics.",
    idealPatient:
      "Best for executives, physicians, business owners, and high-income men who want a physician-led longevity roadmap with advanced diagnostics.",
    inheritsNote: "Everything in Sentinel Core and Advanced, plus:",
    features: [
      "Executive physician intake",
      "Comprehensive lab and biomarker review",
      "Advanced imaging bundle",
      "Repeat major labs at 6 months",
      "Repeat InBody and fitness metrics",
      "More frequent physician touchpoints",
      "Personalized supplement and medication optimization",
      "Sleep evaluation pathway",
      "Hormonal optimization review",
      "Cardiometabolic risk reduction plan",
      "Longevity report suitable for spouse / family / executive review",
    ],
    includedImaging: [
      "Coronary calcium score",
      "Carotid ultrasound",
      "DEXA",
      "Echocardiogram (when indicated)",
      "Abdominal / liver imaging (if indicated)",
      "Home sleep study",
      "PNOE",
      "CGM",
      "InBody serial tracking",
    ],
    patientReceives: [
      "Executive Sentinel Longevity Report",
      "Full Sentinel Longevity Score",
      "Aging Velocity score",
      "Top 3–5 biological risk drivers",
      "Cardiometabolic risk roadmap",
      "Hormone / sleep / body-composition plan",
      "6-month retesting and comparison",
      "Year-long optimization strategy",
    ],
    addOns: {
      label: "Optional premium add-ons",
      items: [
        "Galleri / MCED testing",
        "Methylation biological-age testing",
        "Genomics / ApoE / IntellxxDNA-type review",
        "Advanced cancer screening coordination",
        "Specialty inflammatory panels",
        "Brain / cognitive testing",
        "Executive MRI-type screening (if partnered externally)",
      ],
    },
  },
];

export function getSentinelTier(id: string): SentinelTier | undefined {
  return sentinelTiers.find((t) => t.id === id);
}

/** What's included within program fees vs. optional / separately billed. */
export const includedVsOptional = {
  included: [
    "Physician time",
    "Report generation",
    "Sentinel Longevity Score",
    "Basic labs (Sentinel Core)",
    "Expanded labs (Sentinel Advanced)",
    "Repeat selected labs (Sentinel Executive)",
    "InBody",
    "Basic fitness testing",
    "CGM (Advanced & Executive)",
    "PNOE (Advanced & Executive, if already owned/used)",
  ],
  optional: [
    "Galleri",
    "Whole-body MRI",
    "Advanced methylation clocks",
    "IntellxxDNA",
    "Specialty toxin / mold testing",
    "Exosomes / stem cells",
    "Peptides",
    "Rapamycin medication cost",
    "BioTE pellets",
    "IV therapies",
    "Chelation",
    "TPE",
    "Aesthetic services",
    "Sleep apnea CPAP equipment",
    "External specialist referrals",
  ],
} as const;

/** The business model: Sentinel packages are diagnostic & strategic; treatments are separate. */
export const sentinelModel = {
  statement:
    "The Sentinel packages are diagnostic and strategic, not treatment-inclusive. Each package buys evaluation, scoring, interpretation, a plan, and retesting.",
  separateNote: "Treatments are offered separately:",
  separateTreatments: [
    "GLP-1 / GIP program",
    "Hormone optimization",
    "IV therapy",
    "Peptides (if legal / available)",
    "Rapamycin / LDN / metformin (if appropriate)",
    "Nutrition coaching",
    "Fitness coaching",
    "Sleep apnea treatment",
    "Aesthetic services",
  ],
} as const;
