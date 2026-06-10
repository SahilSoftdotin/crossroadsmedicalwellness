export type Program = {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  heroImage: string;
  summary: string;
  idealFor: string[];
  includes: { title: string; description: string }[];
  relatedServiceSlugs: string[];
  outcomes: string[];
};

export const programs: Program[] = [
  {
    slug: "mens-hormone-health",
    name: "Men's Hormone Health",
    tagline: "Reclaim your energy, drive, and edge.",
    icon: "Flame",
    heroImage: "/images/programs/mens-hormone-health.svg",
    summary:
      "A focused program for men dealing with low energy, brain fog, low libido, or stalled progress at the gym — built around comprehensive labs, BioTE hormone optimization, and ongoing physician monitoring.",
    idealFor: [
      "Men in their 30s–60s noticing a drop in energy, motivation, or mental sharpness",
      "Men with low testosterone symptoms confirmed (or suspected) by labs",
      "Anyone who wants a structured, monitored plan rather than guessing with over-the-counter products",
    ],
    includes: [
      {
        title: "Comprehensive lab panel",
        description:
          "A full hormone and metabolic panel to understand your starting point — testosterone, thyroid, metabolic markers, and more.",
      },
      {
        title: "BioTE pellet therapy",
        description:
          "Steady, consistent testosterone optimization via in-office pellet insertion, dosed specifically for your labs and goals.",
      },
      {
        title: "Physician-guided follow-up",
        description:
          "Scheduled check-ins with Dr. Adams to track how you're feeling and adjust your protocol as needed.",
      },
      {
        title: "Optional regenerative add-ons",
        description:
          "For men focused on recovery and performance, regenerative therapies can be layered into your plan.",
      },
    ],
    relatedServiceSlugs: ["bioidentical-hormone-therapy", "regenerative-anti-aging"],
    outcomes: [
      "More consistent daily energy",
      "Improved focus and motivation",
      "Better sleep and recovery",
      "Support for muscle mass and metabolism",
      "Improved libido and confidence",
    ],
  },
  {
    slug: "womens-health",
    name: "Women's Health (Perimenopause & Menopause)",
    tagline: "Navigate hormonal change with a plan, not just a prescription.",
    icon: "Flower2",
    heroImage: "/images/programs/womens-health.svg",
    summary:
      "Designed for women experiencing the ups and downs of perimenopause and menopause — hot flashes, mood changes, sleep disruption, and more — this program combines hormone testing, BioTE therapy, and compassionate physician guidance.",
    idealFor: [
      "Women experiencing hot flashes, night sweats, irregular cycles, or mood swings",
      "Women who feel dismissed by 'it's just aging' responses and want answers",
      "Anyone curious whether bioidentical hormone therapy could help with their symptoms",
    ],
    includes: [
      {
        title: "Hormone & wellness labs",
        description:
          "A thorough panel to understand where your hormone levels stand and identify any other contributing factors.",
      },
      {
        title: "BioTE pellet therapy",
        description:
          "Bioidentical hormone pellets dosed for your individual needs, with a steady release that avoids the peaks and dips of pills or creams.",
      },
      {
        title: "Symptom-focused follow-up",
        description:
          "Regular check-ins to talk through how you're feeling — sleep, mood, energy, hot flashes — and adjust your plan accordingly.",
      },
      {
        title: "Whole-person guidance",
        description:
          "Discussion of nutrition, stress, and lifestyle factors that can support hormone balance alongside therapy.",
      },
    ],
    relatedServiceSlugs: ["bioidentical-hormone-therapy", "regenerative-anti-aging"],
    outcomes: [
      "Fewer or less intense hot flashes and night sweats",
      "More stable mood and energy",
      "Improved sleep quality",
      "Better focus and reduced brain fog",
      "Renewed sense of feeling like yourself",
    ],
  },
  {
    slug: "medical-weight-loss-program",
    name: "Medical Weight Loss Program",
    tagline: "A structured, supported path to sustainable weight loss.",
    icon: "TrendingDown",
    heroImage: "/images/programs/medical-weight-loss.svg",
    summary:
      "Combining GLP-1 medications (semaglutide or tirzepatide) with physician oversight, lab monitoring, and lifestyle coaching, this program is built for people who want real, sustainable results — with support every step of the way.",
    idealFor: [
      "Adults looking to lose a meaningful amount of weight with medical support",
      "People who have tried diets alone without lasting success",
      "Anyone with weight-related health concerns like prediabetes or high blood pressure",
    ],
    includes: [
      {
        title: "Initial consultation & labs",
        description:
          "A full review of your health history and baseline labs to confirm GLP-1 therapy is a safe, appropriate fit.",
      },
      {
        title: "GLP-1 medication management",
        description:
          "Semaglutide or tirzepatide, started at a low dose and titrated carefully based on your response.",
      },
      {
        title: "Regular progress check-ins",
        description:
          "Weight, measurements, and how you're feeling are tracked over time so your plan can be adjusted as needed.",
      },
      {
        title: "Nutrition & lifestyle guidance",
        description:
          "Practical, sustainable guidance on nutrition and movement to support your results long-term.",
      },
    ],
    relatedServiceSlugs: ["medical-weight-loss", "bioidentical-hormone-therapy"],
    outcomes: [
      "Steady, sustainable weight loss",
      "Reduced appetite and food noise",
      "Improved blood sugar, blood pressure, and cholesterol markers",
      "More energy for daily activity",
      "A long-term plan, not a quick fix",
    ],
  },
  {
    slug: "longevity-anti-aging",
    name: "Longevity & Anti-Aging",
    tagline: "Invest in how you'll feel 10, 20, 30 years from now.",
    icon: "Infinity",
    heroImage: "/images/programs/longevity-anti-aging.svg",
    summary:
      "Our most comprehensive program, Longevity & Anti-Aging brings together hormone optimization, regenerative therapies, and ongoing lab monitoring into one coordinated plan focused on healthspan — not just lifespan.",
    idealFor: [
      "Adults who want a proactive, long-term wellness strategy rather than reactive care",
      "Patients interested in combining hormone therapy with regenerative support",
      "Anyone who wants ongoing lab monitoring to track key health markers over time",
    ],
    includes: [
      {
        title: "Comprehensive baseline labs",
        description:
          "A detailed panel covering hormones, metabolic health, and other key longevity markers.",
      },
      {
        title: "Hormone optimization (BioTE)",
        description:
          "Bioidentical hormone pellet therapy tailored to your labs and goals, for men or women.",
      },
      {
        title: "Regenerative therapies",
        description:
          "Physician-guided regenerative options layered in to support recovery, resilience, and cellular health.",
      },
      {
        title: "Periodic lab re-checks",
        description:
          "Ongoing monitoring so your plan evolves with you — adjusted as your labs and goals change over time.",
      },
    ],
    relatedServiceSlugs: [
      "bioidentical-hormone-therapy",
      "regenerative-anti-aging",
      "medical-weight-loss",
    ],
    outcomes: [
      "A coordinated, physician-guided longevity plan",
      "Improved energy, recovery, and resilience",
      "Ongoing visibility into key health markers",
      "A proactive approach to healthy aging",
      "Care that adapts as your needs change",
    ],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
