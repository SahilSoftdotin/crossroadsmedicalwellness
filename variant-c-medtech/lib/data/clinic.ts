export const clinic = {
  name: "THRIVE Longevity Center",
  tagline: "Physician-led longevity medicine, measured and personalized.",
  provider: {
    name: "Dr. Gary Adams",
    credentials: "MD",
    bio: "Dr. Gary Adams brings more than 30 years of clinical experience to THRIVE Longevity Center, pairing advanced diagnostics and biological-age scoring with personalized optimization to help patients extend their healthspan and perform better at every stage of life.",
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
  email: "info@thrivelongevitycenter.com",
  emailHref: "mailto:info@thrivelongevitycenter.com",
  hours: [
    { days: "Monday – Thursday", time: "10:00 AM – 5:00 PM" },
    { days: "Friday", time: "9:00 AM – 3:00 PM" },
    { days: "Saturday – Sunday", time: "Closed" },
  ],
  hoursNote: "Hours shown are illustrative — please call or text to confirm availability.",
  social: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ],
  mapEmbedSrc:
    "https://www.google.com/maps?q=1207+East+Forrest+St,+Athens,+AL&output=embed",
  positioning:
    "A physician-led longevity center combining advanced diagnostics, biological-age scoring, and personalized optimization to extend healthspan.",
  stats: [
    { value: "30+", label: "Years of clinical experience" },
    { value: "4", label: "Sentinel longevity programs" },
    { value: "1,000s", label: "Patients guided toward measurable change" },
    { value: "4.9/5", label: "Average patient rating" },
  ],
};

export type Clinic = typeof clinic;
