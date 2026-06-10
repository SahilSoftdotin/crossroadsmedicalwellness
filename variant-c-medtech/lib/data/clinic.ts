export const clinic = {
  name: "Crossroads Medical Wellness",
  tagline: "Physician-owned integrative care, built around you.",
  provider: {
    name: "Dr. Gary Adams",
    credentials: "MD",
    bio: "Dr. Gary Adams brings more than 30 years of clinical experience to Crossroads Medical Wellness, blending traditional medicine with functional, root-cause approaches to help patients feel and perform better at every stage of life.",
  },
  address: {
    line1: "1207 East Forrest St, Suite E",
    city: "Athens",
    state: "AL",
    full: "1207 East Forrest St, Suite E, Athens, AL",
  },
  phone: "(256) 434-9301",
  phoneHref: "tel:+12564349301",
  text: "(256) 608-4111",
  textHref: "sms:+12566084111",
  email: "info@crossroadsmedicalwellness.com",
  emailHref: "mailto:info@crossroadsmedicalwellness.com",
  hours: [
    { days: "Monday – Thursday", time: "10:00 AM – 5:00 PM" },
    { days: "Friday", time: "9:00 AM – 3:00 PM" },
    { days: "Saturday – Sunday", time: "Closed" },
  ],
  hoursNote: "Hours shown are illustrative — please call or text to confirm availability.",
  social: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "X", href: "https://x.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
  mapEmbedSrc:
    "https://www.google.com/maps?q=1207+East+Forrest+St,+Athens,+AL&output=embed",
  positioning:
    "Physician-owned integrative care blending traditional medicine with functional, root-cause approaches.",
  stats: [
    { value: "30+", label: "Years of clinical experience" },
    { value: "5", label: "Specialized care lines" },
    { value: "1,000s", label: "Patients guided toward measurable change" },
    { value: "4.9/5", label: "Average patient rating" },
  ],
};

export type Clinic = typeof clinic;
