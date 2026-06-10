export const clinic = {
  name: "Crossroads Medical Wellness",
  tagline: "Physician-owned integrative care",
  positioning:
    "Physician-owned integrative care blending traditional medicine with functional, root-cause approaches.",
  provider: {
    name: "Dr. Gary Adams",
    credentials: "MD",
    experience: "30+ years",
  },
  address: {
    line1: "1207 East Forrest St, Suite E",
    city: "Athens",
    state: "AL",
    full: "1207 East Forrest St, Suite E, Athens, AL",
  },
  phone: "(256) 434-9301",
  text: "(256) 608-4111",
  email: "info@crossroadsmedicalwellness.com",
  hours: [
    { day: "Monday", value: "10:00 AM – 5:00 PM" },
    { day: "Tuesday", value: "10:00 AM – 5:00 PM" },
    { day: "Wednesday", value: "10:00 AM – 5:00 PM" },
    { day: "Thursday", value: "10:00 AM – 5:00 PM" },
    { day: "Friday", value: "9:00 AM – 3:00 PM" },
    { day: "Saturday", value: "Closed" },
    { day: "Sunday", value: "Closed" },
  ],
  social: [
    { label: "Facebook", href: "https://facebook.com", platform: "facebook" },
    { label: "Instagram", href: "https://instagram.com", platform: "instagram" },
    { label: "X (Twitter)", href: "https://x.com", platform: "x" },
    { label: "TikTok", href: "https://tiktok.com", platform: "tiktok" },
  ],
  stats: {
    rating: 4.9,
    reviewCount: 312,
    patientsServed: "6,500+",
    yearsExperience: "30+",
  },
} as const;

export const trustLogos = [
  "BioTE Certified",
  "A4M Member",
  "AAFP",
  "Institute for Functional Medicine",
  "Obesity Medicine Assoc.",
] as const;

/**
 * "Featured In" press outlets. PLACEHOLDERS — replace with outlets that have
 * actually covered Dr. Adams / Crossroads before launch (do not claim press
 * the clinic has not earned).
 */
export const pressFeatures = [
  "Athens News Courier",
  "WHNT News 19",
  "North Alabama Living",
  "The Health Journal",
  "WAFF 48",
  "Wellness Today",
] as const;

export const pressQuote = {
  text:
    "Integrative, root-cause care is changing how patients in North Alabama think about aging and energy.",
  source: "Illustrative — replace with a real attributed quote",
} as const;

export type Clinic = typeof clinic;
