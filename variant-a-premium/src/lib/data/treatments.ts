import type { LucideIcon } from "lucide-react";
import {
  Pill,
  Syringe,
  Droplets,
  FlaskConical,
  TestTube,
  HeartPulse,
  Leaf,
  Sun,
  Fish,
  Sparkles,
  Activity,
  Microscope,
  Beaker,
} from "lucide-react";

export type TreatmentCategory = "medicines" | "supplements" | "labs";

export type Treatment = {
  name: string;
  tagline: string;
  /** Display price, e.g. "$99/mo" or "$249 one-time". */
  price: string;
  icon: LucideIcon;
  /** Product/category photo (Unsplash placeholders — swap for real product photography). */
  image: string;
  badge?: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

// Verified-resolving Unsplash photo IDs, reused by product type.
const PHOTO = {
  vials: "photo-1584308666744-24d5c474f2ae",
  syringe: "photo-1626202373152-8db1760c8f61",
  capsules: "photo-1550572017-edd951b55104",
  pills: "photo-1471864190281-a93a3070b6de",
  supps: "photo-1607619056574-7b8d3ee536b2",
  lab: "photo-1579154204601-01588f351e67",
  bloodVial: "photo-1615461066159-fea0960485d5",
  microscope: "photo-1582719478250-c89cae4dc85b",
  powder: "photo-1593095948071-474c5cc2989d",
};

export const treatmentCategories: {
  id: TreatmentCategory;
  label: string;
  blurb: string;
}[] = [
  {
    id: "medicines",
    label: "Medicines",
    blurb:
      "Physician-prescribed therapies, dosed to your labs and shipped to your door or administered in-office.",
  },
  {
    id: "supplements",
    label: "Supplements",
    blurb:
      "Pharmaceutical-grade supplementation chosen to fill the gaps your bloodwork actually shows.",
  },
  {
    id: "labs",
    label: "Labs",
    blurb:
      "Comprehensive testing across hormones, metabolism and longevity so every plan starts with data.",
  },
];

export const treatments: Record<TreatmentCategory, Treatment[]> = {
  medicines: [
    {
      name: "Bioidentical Testosterone",
      tagline: "Pellet or injectable optimization for men, dosed to your labs.",
      price: "from $129/mo",
      icon: Syringe,
      image: img(PHOTO.vials),
      badge: "Popular",
    },
    {
      name: "BioTE® Hormone Pellets",
      tagline: "Steady estrogen & testosterone support for women in menopause.",
      price: "from $149/mo",
      icon: HeartPulse,
      image: img(PHOTO.capsules),
    },
    {
      name: "Semaglutide (GLP-1)",
      tagline: "Weekly GLP-1 therapy for appetite control and weight loss.",
      price: "from $249/mo",
      icon: Syringe,
      image: img(PHOTO.syringe),
      badge: "Weight loss",
    },
    {
      name: "Tirzepatide (GLP-1/GIP)",
      tagline: "Dual-pathway therapy for advanced metabolic weight management.",
      price: "from $329/mo",
      icon: Syringe,
      image: img(PHOTO.syringe),
    },
    {
      name: "Low-Dose Naltrexone",
      tagline: "Off-label LDN for inflammation, immune balance and recovery.",
      price: "from $59/mo",
      icon: Pill,
      image: img(PHOTO.pills),
    },
    {
      name: "Thyroid Optimization",
      tagline: "T3/T4 support to restore energy, metabolism and clarity.",
      price: "from $79/mo",
      icon: Activity,
      image: img(PHOTO.vials),
    },
  ],
  supplements: [
    {
      name: "Vitamin D3 + K2",
      tagline: "Foundational support for hormones, bone and immune health.",
      price: "$28/mo",
      icon: Sun,
      image: img(PHOTO.capsules),
    },
    {
      name: "Omega-3 (EPA/DHA)",
      tagline: "High-potency fish oil to lower inflammation and support the heart.",
      price: "$34/mo",
      icon: Fish,
      image: img(PHOTO.supps),
    },
    {
      name: "Magnesium Glycinate",
      tagline: "Highly absorbable magnesium for sleep, mood and recovery.",
      price: "$22/mo",
      icon: Leaf,
      image: img(PHOTO.pills),
    },
    {
      name: "Berberine Complex",
      tagline: "Metabolic support for healthy blood sugar and insulin response.",
      price: "$38/mo",
      icon: Droplets,
      image: img(PHOTO.powder),
      badge: "Metabolic",
    },
    {
      name: "NAD+ / NMN",
      tagline: "Cellular-energy and longevity support at the mitochondrial level.",
      price: "$64/mo",
      icon: Sparkles,
      image: img(PHOTO.supps),
      badge: "Longevity",
    },
    {
      name: "Creatine Monohydrate",
      tagline: "Evidence-based support for strength, muscle and cognition.",
      price: "$19/mo",
      icon: Beaker,
      image: img(PHOTO.powder),
    },
  ],
  labs: [
    {
      name: "Comprehensive Hormone Panel",
      tagline: "Testosterone, estrogen, progesterone, DHEA, cortisol and more.",
      price: "$249 one-time",
      icon: TestTube,
      image: img(PHOTO.bloodVial),
      badge: "Most ordered",
    },
    {
      name: "Metabolic & Insulin Panel",
      tagline: "Fasting glucose, insulin, HbA1c and a full lipid breakdown.",
      price: "$189 one-time",
      icon: FlaskConical,
      image: img(PHOTO.lab),
    },
    {
      name: "Complete Thyroid Panel",
      tagline: "TSH, Free T3/T4, reverse T3 and thyroid antibodies.",
      price: "$159 one-time",
      icon: Activity,
      image: img(PHOTO.lab),
    },
    {
      name: "Longevity Biomarker Panel",
      tagline: "Inflammation, metabolic and aging markers to set your baseline.",
      price: "$399 one-time",
      icon: Microscope,
      image: img(PHOTO.microscope),
      badge: "BioAge",
    },
    {
      name: "Micronutrient Panel",
      tagline: "Vitamin D, B12, ferritin, magnesium and key nutrient status.",
      price: "$149 one-time",
      icon: Beaker,
      image: img(PHOTO.bloodVial),
    },
    {
      name: "Inflammation (hs-CRP) Panel",
      tagline: "High-sensitivity markers of systemic inflammation and risk.",
      price: "$99 one-time",
      icon: Droplets,
      image: img(PHOTO.lab),
    },
  ],
};
