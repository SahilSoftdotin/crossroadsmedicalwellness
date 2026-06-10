export const clinic = {
  name: "Crossroads Medical Wellness",
  tagline: "Physician-owned integrative care for the whole you",
  provider: {
    name: "Dr. Gary Adams",
    credentials: "MD",
    bio: "30+ years of clinical experience",
  },
  positioning:
    "Physician-owned integrative care blending traditional medicine with functional, root-cause approaches.",
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
  hours: [
    { days: "Monday – Thursday", time: "10:00 AM – 5:00 PM" },
    { days: "Friday", time: "9:00 AM – 3:00 PM" },
    { days: "Saturday – Sunday", time: "Closed" },
  ],
  hoursNote:
    "Hours shown are illustrative — please call or text to confirm availability.",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://x.com/",
    tiktok: "https://tiktok.com/",
  },
  mapEmbedSrc:
    "https://www.google.com/maps?q=1207+East+Forrest+St,+Athens,+AL&output=embed",
  bookingNote:
    "We don't currently offer online scheduling — appointments are confirmed by phone, text, or our contact form. Reach out and our care team will respond promptly.",
} as const;
