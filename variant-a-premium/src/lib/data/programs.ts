import type { LucideIcon } from "lucide-react";
import { Mars, Venus, Scale, Hourglass } from "lucide-react";

export type Program = {
  slug: string;
  name: string;
  audience: string;
  icon: LucideIcon;
  /** Person-focused photo for the stacked program widgets (the kind of person this is for). */
  image: string;
  imageAlt: string;
  summary: string;
  heroDescription: string;
  overview: string;
  includes: string[];
  outcomes: string[];
  relatedServices: string[];
  priceNote: string;
  duration: string;
};

export const programs: Program[] = [
  {
    slug: "mens-hormone-health",
    name: "Men's Hormone Health",
    audience: "For men 35+",
    icon: Mars,
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Confident man in his 40s representing the Men's Hormone Health program",
    summary:
      "A complete program to restore testosterone, energy and drive — built on labs, not guesswork.",
    heroDescription:
      "Low energy, stubborn belly fat, poor sleep and fading drive aren't just 'getting older.' Our Men's Hormone Health program finds the cause and fixes it.",
    overview:
      "This program is a structured, physician-led path to optimizing male hormone health. We start with comprehensive testing of testosterone, thyroid and metabolic markers, then build a monitored protocol — which may include bioidentical hormone optimization, metabolic support and lifestyle medicine — to restore your energy, body composition and vitality.",
    includes: [
      "Comprehensive male hormone & metabolic lab panel",
      "Physician consultation and protocol design with Dr. Adams",
      "Bioidentical testosterone optimization where indicated",
      "Body composition and metabolic guidance",
      "Follow-up labs and dose titration",
      "Ongoing care-team support",
    ],
    outcomes: [
      "More energy and motivation",
      "Improved body composition",
      "Better sleep and recovery",
      "Restored libido and performance",
      "Sharper focus and mood",
    ],
    relatedServices: ["bioidentical-hormone-therapy", "regenerative-anti-aging", "medical-weight-loss"],
    priceNote: "Programs are individually quoted at consultation. HSA/FSA may apply.",
    duration: "Ongoing, with quarterly reviews",
  },
  {
    slug: "womens-health",
    name: "Women's Health",
    audience: "Perimenopause & menopause",
    icon: Venus,
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Smiling woman in her late 40s representing the Women's Health program",
    summary:
      "Relief from the symptoms of hormonal change — hot flashes, fatigue, mood, sleep and weight — with care designed for women.",
    heroDescription:
      "Perimenopause and menopause bring real, physiological changes. You don't have to white-knuckle through them. Our Women's Health program restores balance and quality of life.",
    overview:
      "Designed specifically for women navigating perimenopause and menopause, this program addresses the hormonal shifts behind hot flashes, sleep disruption, mood changes, brain fog and weight gain. Through comprehensive testing and bioidentical hormone optimization, paired with metabolic and lifestyle support, we help you feel like yourself again.",
    includes: [
      "Comprehensive female hormone & thyroid panel",
      "Physician consultation and individualized protocol",
      "Bioidentical hormone optimization (BioTE pellet therapy)",
      "Metabolic and weight support as needed",
      "Symptom tracking and dose titration",
      "Ongoing care-team support",
    ],
    outcomes: [
      "Fewer hot flashes and night sweats",
      "Better sleep and mood stability",
      "Improved energy and clarity",
      "Support for healthy weight",
      "Renewed libido and confidence",
    ],
    relatedServices: ["bioidentical-hormone-therapy", "medical-weight-loss", "aesthetics"],
    priceNote: "Programs are individually quoted at consultation. HSA/FSA may apply.",
    duration: "Ongoing, with quarterly reviews",
  },
  {
    slug: "medical-weight-loss",
    name: "Medical Weight Loss",
    audience: "Sustainable, supervised",
    icon: Scale,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Active person exercising, representing the Medical Weight Loss program",
    summary:
      "A medically supervised weight loss journey combining GLP-1 therapy, nutrition and metabolic care.",
    heroDescription:
      "Stop fighting your metabolism alone. Our Medical Weight Loss program brings the science of GLP-1 medications together with real coaching and physician oversight.",
    overview:
      "This program turns the latest in obesity medicine into a personal, sustainable plan. We evaluate the metabolic drivers behind your weight, prescribe and titrate GLP-1 medications when appropriate, and coach the nutrition and strength habits that protect muscle and lock in results — all under Dr. Adams' supervision.",
    includes: [
      "Metabolic lab panel and body composition assessment",
      "Physician evaluation and GLP-1 medication plan (semaglutide / tirzepatide)",
      "Dose titration and side-effect management",
      "Nutrition and muscle-protection coaching",
      "Regular progress check-ins",
      "Maintenance plan at goal",
    ],
    outcomes: [
      "Clinically meaningful weight loss",
      "Reduced appetite and cravings",
      "Improved metabolic markers",
      "Preserved lean muscle",
      "Habits that last beyond the program",
    ],
    relatedServices: ["medical-weight-loss", "bioidentical-hormone-therapy", "regenerative-anti-aging"],
    priceNote: "Programs are individually quoted at consultation. HSA/FSA may apply.",
    duration: "3–12 months, then maintenance",
  },
  {
    slug: "longevity-anti-aging",
    name: "Longevity & Anti-Aging",
    audience: "Proactive healthspan",
    icon: Hourglass,
    image:
      "https://images.unsplash.com/photo-1559963110-71b394e7494d?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Vital, active older adult representing the Longevity & Anti-Aging program",
    summary:
      "A data-driven longevity program to optimize how you age — energy, recovery, cognition and resilience.",
    heroDescription:
      "Add life to your years. Our Longevity & Anti-Aging program uses advanced testing and targeted therapies to help you stay strong, sharp and independent for decades.",
    overview:
      "This is proactive medicine for people who refuse to coast into decline. We map your biological baseline with a longevity lab panel, then build a personalized protocol spanning hormone and metabolic optimization, regenerative therapies, supplementation and lifestyle medicine — all tracked against real biomarkers over time.",
    includes: [
      "Advanced longevity & biomarker lab panel",
      "Physician longevity consultation with Dr. Adams",
      "Hormone and metabolic optimization",
      "Regenerative and anti-aging therapies",
      "Personalized supplementation and lifestyle plan",
      "Periodic re-testing and protocol refinement",
    ],
    outcomes: [
      "More energy and faster recovery",
      "Support for cognitive sharpness",
      "Reduced inflammation",
      "Improved metabolic health",
      "A measurable, evolving longevity plan",
    ],
    relatedServices: ["regenerative-anti-aging", "bioidentical-hormone-therapy", "medical-weight-loss"],
    priceNote: "Programs are individually quoted at consultation. HSA/FSA may apply.",
    duration: "Ongoing, with biannual reviews",
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
