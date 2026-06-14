import type { LucideIcon } from "lucide-react";
import {
  Stethoscope,
  FlaskConical,
  Activity,
  HeartPulse,
  Droplets,
  Sparkles,
  Brain,
  ShieldPlus,
} from "lucide-react";

export type StandaloneService = {
  name: string;
  /** Link to an in-depth detail page where one exists. */
  href?: string;
  /** Inline price for à-la-carte services (others are quoted at consultation). */
  price?: string;
  priceNote?: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  blurb: string;
  icon: LucideIcon;
  services: StandaloneService[];
};

/** The seven THRIVE Longevity Center service categories. */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "longevity-consults",
    name: "Longevity Consults",
    blurb: "Physician consultations focused on prevention, risk, and healthy-aging strategy.",
    icon: Stethoscope,
    services: [
      { name: "Comprehensive Longevity Consultation" },
      { name: "Cardiometabolic Risk Assessment" },
      { name: "Inflammation & Immune Health Evaluation" },
      { name: "Cognitive Health / Brain Optimization Consultation" },
      { name: "Men's Executive Health Evaluation" },
      { name: "Executive Cardiovascular Risk Review" },
      { name: "Blood Pressure & Vascular Health Consultation" },
    ],
  },
  {
    id: "advanced-testing",
    name: "Advanced Testing",
    blurb: "Diagnostics and interpretation that turn your biology into an action plan.",
    icon: FlaskConical,
    services: [
      { name: "Sentinel Longevity Score Assessment", href: "/pricing" },
      { name: "Advanced Lab Review & Optimization Plan" },
      { name: "Biological Age / Epigenetic Testing Review" },
      { name: "Galleri / Multi-Cancer Early Detection Counseling" },
      { name: "Calcium Score Interpretation" },
      { name: "Echocardiogram Review" },
      { name: "Advanced Lipid / ApoB / Lp(a) Consultation" },
      { name: "VO₂ / Fitness Optimization Planning" },
    ],
  },
  {
    id: "weight-loss-metabolism",
    name: "Weight Loss & Metabolism",
    blurb: "Medically supervised, data-driven weight loss and metabolic optimization.",
    icon: Activity,
    services: [
      { name: "Medical Weight Loss Consultation", href: "/services/medical-weight-loss" },
      { name: "GLP-1 / Tirzepatide / Semaglutide Management", href: "/services/medical-weight-loss" },
      { name: "10–14 Day CGM Metabolic Assessment" },
      { name: "Insulin Resistance / Prediabetes Evaluation" },
      { name: "Visceral Fat Risk Review" },
      { name: "Nutrition & Supplement Optimization Visit" },
    ],
  },
  {
    id: "hormones-mens-health",
    name: "Hormones & Men's Health",
    blurb: "Restore energy, drive, and vitality with monitored hormone optimization.",
    icon: HeartPulse,
    services: [
      { name: "Testosterone Evaluation" },
      { name: "Testosterone Replacement Therapy Management", href: "/services/bioidentical-hormone-therapy" },
      { name: "Bioidentical Hormone Pellet Therapy", href: "/services/bioidentical-hormone-therapy" },
      { name: "Erectile Dysfunction / Sexual Health Consultation" },
      { name: "Thyroid Optimization Consultation" },
      { name: "DHEA / Pregnenolone / Cortisol Review" },
    ],
  },
  {
    id: "iv-regenerative",
    name: "IV & Regenerative Wellness",
    blurb: "Targeted IV therapies and regenerative options to support recovery and resilience.",
    icon: Droplets,
    services: [
      { name: "Myers' Cocktail IV" },
      { name: "High-Dose Vitamin C IV" },
      { name: "NAD+ IV Therapy" },
      { name: "Glutathione IV / Injection" },
      { name: "Hydration IV" },
      { name: "Immune Support IV" },
      { name: "Peptide Consultation" },
      { name: "Rapamycin / Longevity Medication Consultation", href: "/services/regenerative-anti-aging" },
    ],
  },
  {
    id: "aesthetics-hair",
    name: "Aesthetics & Hair Restoration",
    blurb: "Physician-overseen, natural-looking aesthetic and hair-restoration treatments.",
    icon: Sparkles,
    services: [
      { name: "Botox / Xeomin", price: "$12 / unit", priceNote: "Minimum treatment $275" },
      { name: "Dermal Filler (standard)", price: "$675 / syringe" },
      { name: "Premium / Structural Filler", price: "$800 / syringe", priceNote: "Cheeks, jawline, temples" },
      { name: "Folix Hair Restoration", href: "/services/aesthetics" },
      { name: "PRP Hair Restoration", href: "/services/aesthetics" },
      { name: "Exosome Hair Restoration Consultation" },
      { name: "Skin Rejuvenation / Laser-Based Aesthetic Consultation", href: "/services/aesthetics" },
    ],
  },
  {
    id: "sleep-brain",
    name: "Sleep & Brain Health",
    blurb: "Evaluate and optimize sleep, energy, cognition, and recovery.",
    icon: Brain,
    services: [
      { name: "Home Sleep Study" },
      { name: "Sleep Apnea Risk Consultation" },
      { name: "Fatigue Evaluation" },
      { name: "Cognitive Decline Prevention Visit" },
      { name: "Amen / Bredesen-Oriented Brain Health Review" },
      { name: "Stress, HRV, and Recovery Review" },
    ],
  },
];

/**
 * Metabolic Intelligence Testing — InBody + PNOE, framed as premium metabolic
 * intelligence (not commodity body-composition or calorie testing).
 */
export const metabolicTesting = {
  eyebrow: "Metabolic Intelligence Testing",
  title: "Measure what drives your metabolism",
  description:
    "InBody and PNOE testing turn how your body actually burns, stores, and performs into a clear, physician-interpreted plan — not just a number on a scan.",
  tests: [
    { name: "InBody Body Composition Scan", price: "$50", note: "Quick standalone scan with a printed report." },
    {
      name: "InBody + Physician Interpretation",
      price: "$125",
      note: "Visceral fat, skeletal muscle, and metabolic-risk discussion with Dr. Adams.",
    },
    {
      name: "PNOE Resting Metabolic Rate (RMR)",
      price: "$150",
      note: "Precise calorie targets for weight loss.",
    },
    {
      name: "PNOE VO₂ / Metabolic Fitness Test",
      price: "$250",
      note: "Training zones plus longevity interpretation.",
    },
    {
      name: "PNOE Full Metabolic Assessment",
      price: "$350",
      note: "RMR + VO₂ interpretation with a written plan.",
    },
  ],
  packages: [
    { name: "InBody scan", price: "$50", best: false },
    { name: "PNOE RMR + InBody", price: "$175", best: false },
    { name: "PNOE VO₂ + InBody", price: "$275", best: false },
    { name: "Full Metabolic Profile — PNOE + InBody + physician plan", price: "$399", best: true },
  ],
} as const;

/**
 * Addiction Medicine — offered by Crossroads Medical Wellness and kept separate
 * from the THRIVE Longevity brand. Linked only from the footer.
 */
export const addictionMedicine = {
  brand: "Crossroads Medical Wellness",
  title: "Addiction Medicine",
  intro:
    "Confidential, compassionate, physician-led treatment for substance use — offered by Crossroads Medical Wellness, separate from the THRIVE Longevity Center program.",
  services: [
    "MAT (Medication-Assisted Treatment) Follow-Up Visit",
    "Buprenorphine / Suboxone Management",
    "Brixadi Consultation",
    "Vivitrol Consultation",
    "Alcohol Use Disorder Consultation",
    "Naltrexone / Low-Dose Naltrexone Discussion",
    "Benzodiazepine Taper Consultation",
  ],
  icon: ShieldPlus,
} as const;
